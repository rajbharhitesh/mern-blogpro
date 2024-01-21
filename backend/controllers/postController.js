import asyncHandler from '../middlewares/asyncHandler.js';
import path from 'path';
import fs from 'fs';
import {
  Post,
  validateCreatePost,
  validateUpdatePost,
} from '../models/postModel.js';
import { Comment } from '../models/commentModel.js';
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
  const post = await Post.findById(req.params.id)
    .populate('user', ['-password'])
    .populate('comments');

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

/**-----------------------------------------------
 * @desc    Delete Post
 * @route   /api/posts/:id
 * @method  DELETE
 * @access  private (only admin or owner of the post)
 ------------------------------------------------*/
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }

  if (req.user.isAdmin || req.user.id === post.user.toString()) {
    await Post.findByIdAndDelete(req.params.id);
    await cloudinaryRemoveImage(post.image.publicId);

    // Delete all comments that belong to this post
    await Comment.deleteMany({ postId: post._id });

    res.status(200).json({
      message: 'post has been deleted successfully',
      postId: post._id,
    });
  } else {
    res.status(403).json({ message: 'access denied, forbidden' });
  }
});

/**-----------------------------------------------
 * @desc     update post
 * @route   /api/posts/:id
 * @method  PUT
 * @access  private  (only owner of the user)
 ------------------------------------------------*/
const updatePost = asyncHandler(async (req, res) => {
  //  Validation
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //  Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }

  //  check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: 'access denied, you are not allowed' });
  }

  //  Update post
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
      },
    },
    { new: true }
  ).populate('user', ['-password']);

  //  Send response to the client
  res.status(200).json(updatedPost);
});

/**-----------------------------------------------
 * @desc     update post image
 * @route   /api/posts/upload-image/:id
 * @method  PUT
 * @access  private  (only owner of the user)
 ------------------------------------------------*/
const updatePostImage = asyncHandler(async (req, res) => {
  //  Validation
  if (!req.file) {
    return res.status(400).json({ message: 'no image provided' });
  }

  //  Get the post from DB and check if post exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }

  //  check if this post belong to logged in user
  if (req.user.id !== post.user.toString()) {
    return res
      .status(403)
      .json({ message: 'access denied, you are not allowed' });
  }

  //  Delete the old image
  await cloudinaryRemoveImage(post.image.publicId);

  //  Upload new photo
  const __dirname = path.resolve();
  const imagePath = path.join(__dirname, `/images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  //  Update the image field in the db
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  //  Send response to the client
  res.status(200).json(updatedPost);

  // Remove image from the server
  fs.unlinkSync(imagePath);
});

/**-----------------------------------------------
 * @desc    Toggle Like
 * @route   /api/posts/like/:id
 * @method  PUT
 * @access  private (only logged in user)
 ------------------------------------------------*/
const toggleLike = asyncHandler(async (req, res) => {
  const loggedInUser = req.user.id;
  const { id: postId } = req.params;

  let post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'post not found' });
  }

  const isPostAlreadyLiked = post.likes.find(
    (user) => user.toString() === loggedInUser
  );

  if (isPostAlreadyLiked) {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: loggedInUser },
      },
      { new: true }
    );
  } else {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: loggedInUser },
      },
      { new: true }
    );
  }

  res.status(200).json(post);
});

export {
  createPost,
  getAllPosts,
  getSinglePost,
  getPostCount,
  deletePost,
  updatePost,
  updatePostImage,
  toggleLike,
};
