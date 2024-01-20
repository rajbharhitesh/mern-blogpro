import express from 'express';
const router = express.Router();
import { getAllUsers, getUserProfile } from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

// /api/users/profile
router.route('/profile').get(protect, admin, getAllUsers);

// /api/users/profile/:id
router.route('/profile/:id').get(getUserProfile);

export default router;
