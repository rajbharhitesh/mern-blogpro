import express from 'express';
const router = express.Router();
import validateObjectId from '../middlewares/validateObjectId.js';
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  usersCount,
} from '../controllers/userController.js';
import { admin, onlyUser, protect } from '../middlewares/authMiddleware.js';

// /api/users/profile
router.route('/profile').get(admin, getAllUsers);

// /api/users/count
router.route('/count').get(admin, usersCount);

// /api/users/profile/:id
router
  .route('/profile/:id')
  .get(validateObjectId, getUserProfile)
  .put(validateObjectId, onlyUser, updateUserProfile);

export default router;
