const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'employee'],
    required: true,
  },
  // Student specific fields
  studentId: {
    type: String,
    required: function() { return this.role === 'student'; }
  },
  university: {
    type: String,
    required: function() { return this.role === 'student'; }
  },
  // Employee specific fields
  jobTitle: {
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  company: {
    type: String,
    required: function() { return this.role === 'employee'; }
  },
  experience: {
    type: Number,
    required: function() { return this.role === 'employee'; }
  },
  skills: [{
    type: String
  }],
  profilePicture: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  bio: String,
  location: String,
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String
  },
  jobPostings: [{
    title: String,
    description: String,
    requirements: String,
    applicationProcess: String,
    skillsRequired: [String],
    experienceRequired: String,
    salary: String,
    location: String,
    type: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      default: 'Full-time'
    }
  }],
  careerAdvice: {
    industryInsights: String,
    careerTips: String,
    recommendedSkills: [String],
    mentorshipAvailability: {
      type: Boolean,
      default: false
    },
    preferredContactMethod: {
      type: String,
      enum: ['email', 'linkedin', 'platform'],
      default: 'email'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

// Add text index for search functionality
userSchema.index({ 
  name: 'text', 
  jobTitle: 'text', 
  company: 'text',
  skills: 'text',
  bio: 'text'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 