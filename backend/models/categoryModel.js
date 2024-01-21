import mongoose from 'mongoose';
import Joi from 'joi';

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Validate Create Category
function validateCreateCategory(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required().label('Title'),
  });
  return schema.validate(obj);
}

const Category = mongoose.model('Category', categorySchema);

export { Category, validateCreateCategory };
