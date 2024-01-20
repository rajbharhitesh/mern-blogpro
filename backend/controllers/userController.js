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

export { getAllUsers };
