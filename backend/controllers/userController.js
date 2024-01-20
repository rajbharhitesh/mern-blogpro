import asyncHandler from '../middlewares/asyncHandler.js';
import { User, validateUpdateUser } from '../models/userModel.js';

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
 * @desc     Get All Users Profile
 * @route   /api/users/profile
 * @method  GET
 * @access  private (only ADMIN)
 ------------------------------------------------*/
const usersCount = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});

export { getAllUsers, getUserProfile, updateUserProfile };
