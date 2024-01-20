import asyncHandler from '../middlewares/asyncHandler.js';
import path from 'path';
import fs from 'fs';
import { User, validateUpdateUser } from '../models/userModel.js';
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from '../utils/cloudinary.js';

/**-----------------------------------------------
 * @desc     Get All Users Profile
 * @route   /api/users/profile
 * @method  GET
 * @access  private (only ADMIN)
 ------------------------------------------------*/
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});

/**-----------------------------------------------
 * @desc     Get  User Profile
 * @route   /api/users/profile/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc     Update User Profile
 * @route   /api/users/profile/:id
 * @method  PUT
 * @access  private
 ------------------------------------------------*/
const updateUserProfile = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      bio: updatedUser.bio,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**-----------------------------------------------
 * @desc     Get All Users Count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only ADMIN)
 ------------------------------------------------*/
const usersCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

/**-----------------------------------------------
 * @desc     Upload profile photo
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
const profilePhotoUploader = asyncHandler(async (req, res) => {
  // 1. Validation
  if (!req.file) {
    return res.status(400).json({ message: 'no file provided' });
  }

  // 2. Get the path to the image
  const __dirname = path.resolve();
  const imagePath = path.join(__dirname, `/images/${req.file.filename}`);

  // 3. Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  // 4. Get the user from DB
  const user = await User.findById(req.user.id);

  // 5. Delete the old profile photo if exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 6. Change the profilePhoto field in the DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  await user.save();

  // 7. Send response to client
  res.status(200).json({
    message: 'your profile photo uploaded successfully',
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });

  // 8. Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc     Delete user profile
 * @route   /api/users/profile/:id
 * @method  DELETE
 * @access  private (only logged in user or admin)
 ------------------------------------------------*/
const deleteUserProfile = asyncHandler(async (req, res) => {
  //  Get the user from DB
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  //  Delete the profile picture from cloudinary
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  //  Delete the user himself
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'your profile has been deleted' });
});

export {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  usersCount,
  profilePhotoUploader,
  deleteUserProfile,
};
