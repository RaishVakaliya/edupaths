const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all employees with search and pagination
router.get('/', auth, async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = { role: 'employee' };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { jobTitle: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }

    const employees = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await User.countDocuments(query);

    res.json({
      success: true,
      data: employees,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employees'
    });
  }
});

// Get single employee
router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await User.findOne({
      _id: req.params.id,
      role: 'employee'
    }).select('-password');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employee'
    });
  }
});

// Update employee profile
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if the user is updating their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    const {
      jobTitle,
      company,
      location,
      experience,
      skills,
      bio,
      profilePicture,
      socialLinks,
      jobPostings,
      careerAdvice
    } = req.body;

    const updatedEmployee = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          jobTitle,
          company,
          location,
          experience,
          skills,
          bio,
          profilePicture,
          socialLinks,
          jobPostings,
          careerAdvice
        }
      },
      { new: true }
    ).select('-password');

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: updatedEmployee,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

module.exports = router; 