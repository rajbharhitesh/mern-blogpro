import asyncHandler from '../middlewares/asyncHandler.js';
import path from 'path';
import fs from 'fs';
import { Post, validateCreatePost } from '../models/postModel.js';
import {
  cloudinaryRemoveImage,
  cloudinaryUploadImage,
} from '../utils/cloudinary.js';

/**-----------------------------------------------
 * @desc     Create new post
 * @route   /api/posts
 * @method  POST
 * @access  private  (only loggedin user)
 ------------------------------------------------*/
const createPost = asyncHandler(async (req, res) => {
  //  Validation for image
  if (!req.file) {
    return res.status(400).json({ message: 'no image provided' });
  }

  //  Validation for data
  const { error } = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Get the path to the image
  const __dirname = path.resolve();
  const imagePath = path.join(__dirname, `/images/${req.file.filename}`);

  //  Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);

  //  Create new post and save it to DB
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  //  Send response to the client
  res.status(201).json(post);

  //  Remove image from the server
  fs.unlinkSync(imagePath);
});

export { createPost };
