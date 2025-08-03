const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required:[true, 'ID is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true,
    maxlength: [100, 'Doctor name cannot exceed 100 characters']
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true,
    maxlength: [100, 'Specialization cannot exceed 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Doctor image is required'],
    trim: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  about: {
    type: String,
    required: [true, 'About is required'],
    default: 'No information available',
    trim: true,
    maxlength: [1000, 'About cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema, 'Doctors'); 