const express = require('express');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator'); 
const User = require('../models/User');
const validate = require('../middleware/validation');
const router = express.Router();

// Register user
router.post('/register', [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('emailId')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], validate, async (req, res) => {
  try {
    const { username, emailId, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ emailId }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
        message: existingUser.emailId === emailId 
          ? 'A user with this email already exists'
          : 'A user with this username already exists'
      });
    }

    // Create new user
    const user = new User({
      username,
      emailId,
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, // payload 
      process.env.JWT_SECRET, // secret key
      { expiresIn: '7d' } // expiration time
    );

    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      userId: user._id,
      jwt_token: token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to register user'
    });
  }
});

// Login user
router.post('/login', [
  body('emailId')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], validate, async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find user by email
    const user = await User.findOne({ emailId }).select('+password');

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      userId: user._id,
      jwt_token: token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to login'
    });
  }
});

module.exports = router; 