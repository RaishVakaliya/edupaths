const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  skills: [{
    type: String
  }],
  profilePicture: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String
  },
  location: {
    type: String
  },
  socialLinks: {
    linkedin: String,
    github: String,
    portfolio: String
  }
}, {
  timestamps: true
});

// Add text index for search functionality
employeeSchema.index({ 
  name: 'text', 
  jobTitle: 'text', 
  company: 'text',
  skills: 'text',
  bio: 'text'
});

module.exports = mongoose.model('Employee', employeeSchema); 