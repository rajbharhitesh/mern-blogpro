import express from 'express';
const router = express.Router();
import validateObjectId from '../middlewares/validateObjectId.js';
import photoUpload from '../middlewares/photoUpload.js';
import { protect } from '../middlewares/authMiddleware.js';
import { createPost } from '../controllers/postController.js';

// /api/posts
router.route('/').post(protect, photoUpload.single('image'), createPost);

export default router;
