const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Department code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  budget: {
    annual: {
      type: Number,
      default: 0
    },
    spent: {
      type: Number,
      default: 0
    }
  },
  location: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  employeeCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
departmentSchema.index({ name: 1, isActive: 1 });

// Pre-save middleware to generate department code if not provided
departmentSchema.pre('save', function(next) {
  if (!this.code && this.name) {
    this.code = this.name.substring(0, 3).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Department', departmentSchema);