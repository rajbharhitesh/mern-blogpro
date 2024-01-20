import express from 'express';
const router = express.Router();
import validateObjectId from '../middlewares/validateObjectId.js';
import photoUpload from '../middlewares/photoUpload.js';
import {
  deleteUserProfile,
  getAllUsers,
  getUserProfile,
  profilePhotoUploader,
  updateUserProfile,
  usersCount,
} from '../controllers/userController.js';
import {
  admin,
  onlyUser,
  protect,
  verifyTokenAndAuthorization,
} from '../middlewares/authMiddleware.js';

// /api/users/profile
router.route('/profile').get(admin, getAllUsers);

// /api/users/profile/profile-photo-upload
router
  .route('/profile/profile-photo-upload')
  .post(protect, photoUpload.single('image'), profilePhotoUploader);

// /api/users/count
router.route('/count').get(admin, usersCount);

// /api/users/profile/:id
router
  .route('/profile/:id')
  .get(validateObjectId, getUserProfile)
  .put(validateObjectId, onlyUser, updateUserProfile)
  .delete(validateObjectId, verifyTokenAndAuthorization, deleteUserProfile);

export default router;
