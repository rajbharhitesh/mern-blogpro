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

/**-----------------------------------------------
 * @desc     Get all posts
 * @route   /api/posts
 * @method  GET
 * @access  public  
 ------------------------------------------------*/
const getAllPosts = asyncHandler(async (req, res) => {
  const POST_PER_PAGE = 3;

  const { pageNumber, category } = req.query;

  let posts;

  if (pageNumber) {
    posts = await Post.find({})
      .skip((pageNumber - 1) * POST_PER_PAGE)
      .limit(POST_PER_PAGE)
      .sort({ createdAt: -1 })
      .populate('user', ['-password']);
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate('user', ['-password']);
  } else {
    posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('user', ['-password']);
  }

  res.status(200).json(posts);
});

/**-----------------------------------------------
 * @desc    Get Single Post
 * @route   /api/posts/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', [
    '-password',
  ]);

  if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }

  res.status(200).json(post);
});

/**-----------------------------------------------
 * @desc    Get Posts Count
 * @route   /api/posts/count
 * @method  GET
 * @access  public
 ------------------------------------------------*/
const getPostCount = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json(count);
});

export { createPost, getAllPosts, getSinglePost, getPostCount };
