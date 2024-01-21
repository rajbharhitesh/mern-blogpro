import express from 'express';
const router = express.Router();
import validateObjectId from '../middlewares/validateObjectId.js';
import photoUpload from '../middlewares/photoUpload.js';
import { protect } from '../middlewares/authMiddleware.js';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostCount,
  getSinglePost,
  updatePost,
  updatePostImage,
} from '../controllers/postController.js';

// /api/posts
router
  .route('/')
  .get(getAllPosts)
  .post(protect, photoUpload.single('image'), createPost);

// /api/posts/count
router.route('/count').get(getPostCount);

// /api/posts/:id
router
  .route('/:id')
  .get(validateObjectId, getSinglePost)
  .delete(validateObjectId, protect, deletePost)
  .put(validateObjectId, protect, updatePost);

// /api/posts/update-image/:id
router
  .route('/update-image/:id')
  .put(validateObjectId, protect, photoUpload.single('image'), updatePostImage);

export default router;
