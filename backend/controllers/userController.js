import asyncHandler from '../middlewares/asyncHandler.js';
import { User } from '../models/userModel.js';

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
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'user not found' });
  }

  res.status(200).json(user);
});

export { getAllUsers, getUserProfile };
