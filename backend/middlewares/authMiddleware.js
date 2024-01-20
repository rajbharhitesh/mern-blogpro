import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { User } from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

// User must be an admin
const admin = (req, res, next) => {
  protect(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'not allowed, only admin' });
    }
  });
};

// Only User Himself
const onlyUser = (req, res, next) => {
  protect(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: 'not allowed, only user himself' });
    }
  });
};

// Verify Token & Authorization
const verifyTokenAndAuthorization = (req, res, next) => {
  protect(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: 'not allowed, only user himself or admin' });
    }
  });
};

export { protect, admin, onlyUser, verifyTokenAndAuthorization };
