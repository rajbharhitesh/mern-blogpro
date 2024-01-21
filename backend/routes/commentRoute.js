import express from 'express';
const router = express.Router();
import validateObjectId from '../middlewares/validateObjectId.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from '../controllers/commentController.js';

// /api/comments
router.route('/').post(protect, createComment).get(admin, getAllComments);

// /api/comments/:id
router
  .route('/:id')
  .delete(validateObjectId, protect, deleteComment)
  .put(validateObjectId, protect, updateComment);

export default router;
