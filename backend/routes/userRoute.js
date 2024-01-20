import express from 'express';
const router = express.Router();
import { getAllUsers } from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

// /api/users/profile
router.route('/profile').get(protect, admin, getAllUsers);

export default router;
