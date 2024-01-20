import express from 'express';
const router = express.Router();
import { loginUser, registerUser } from '../controllers/authController.js';

// /api/auth/register
router.route('/register').post(registerUser);

// /api/auth/login
router.route('/login').post(loginUser);

export default router;
