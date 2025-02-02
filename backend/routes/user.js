const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const upload = require('../utils/fileUpload');
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile'
    });
  }
});

// Update user profile
router.put('/profile', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Handle profile picture upload
    if (req.file) {
      // Delete old profile picture if it exists
      const user = await User.findById(req.user._id);
      if (user.profilePicture) {
        const oldPicturePath = path.join(__dirname, '..', user.profilePicture);
        if (fs.existsSync(oldPicturePath)) {
          fs.unlinkSync(oldPicturePath);
        }
      }

      // Set new profile picture path
      updateData.profilePicture = '/uploads/' + req.file.filename;
    }

    // Handle skills array
    if (typeof updateData.skills === 'string') {
      updateData.skills = updateData.skills.split(',').map(skill => skill.trim());
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// Get user cart
router.get('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('cart');
    res.json({
      success: true,
      cart: user.cart || []
    });
  } catch (error) {
    console.error('Error fetching user cart:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user cart'
    });
  }
});

// Get user profile by ID
router.get('/profile/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .lean();
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add any additional profile data processing here
    const profileData = {
      ...user,
      // Add any computed fields if needed
    };

    res.json({
      success: true,
      data: profileData
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile'
    });
  }
});

// Serve uploaded files
router.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.sendFile(filePath);
});

module.exports = router; 