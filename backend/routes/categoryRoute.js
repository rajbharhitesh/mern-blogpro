import express from 'express';
const router = express.Router();
import validateObjectId from '../middlewares/validateObjectId.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from '../controllers/categoryController.js';

// /api/categories
router.route('/').post(admin, createCategory).get(getAllCategories);

// /api/categories/:id
router.route('/:id').delete(validateObjectId, admin, deleteCategory);

export default router;
