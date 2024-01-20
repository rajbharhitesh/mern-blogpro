import express from 'express';
const router = express.Router();
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';

// /api/auth/register
router.route('/register').post(registerUser);

// /api/auth/login
router.route('/login').post(loginUser);

// /api/auth/logout
router.route('/logout').post(logoutUser);

export default router;
