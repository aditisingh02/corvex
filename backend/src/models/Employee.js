const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  employeeId: {
    type: String,
    unique: true,
    required: false // Explicitly set to false
    // Auto-generated in pre-save middleware
  },
  personalInfo: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    middleName: {
      type: String,
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say'],
      required: true
    },
    maritalStatus: {
      type: String,
      enum: ['single', 'married', 'divorced', 'widowed'],
      default: 'single'
    },
    nationality: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    emergencyContact: {
      name: {
        type: String,
        required: true
      },
      relationship: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  jobInfo: {
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true
    },
    level: {
      type: String,
      enum: ['intern', 'junior', 'mid', 'senior', 'lead', 'manager', 'director', 'vp', 'executive'],
      required: true
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    hireDate: {
      type: Date,
      required: [true, 'Hire date is required']
    },
    probationEndDate: {
      type: Date
    },
    employmentType: {
      type: String,
      enum: ['full_time', 'part_time', 'contract', 'intern'],
      default: 'full_time'
    },
    workLocation: {
      type: String,
      enum: ['office', 'remote', 'hybrid'],
      default: 'office'
    },
    shift: {
      type: String,
      enum: ['day', 'night', 'rotating'],
      default: 'day'
    }
  },
  compensation: {
    salary: {
      amount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        default: 'USD'
      },
      frequency: {
        type: String,
        enum: ['hourly', 'monthly', 'yearly'],
        default: 'yearly'
      }
    },
    benefits: [{
      type: String
    }],
    bonus: {
      amount: Number,
      type: String,
      year: Number
    }
  },
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    certifications: [String]
  }],
  performance: {
    currentRating: {
      type: Number,
      min: 1,
      max: 5
    },
    lastReviewDate: Date,
    nextReviewDate: Date,
    goals: [{
      title: String,
      description: String,
      status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed', 'cancelled'],
        default: 'not_started'
      },
      dueDate: Date
    }]
  },
  attendance: {
    totalWorkingDays: {
      type: Number,
      default: 0
    },
    daysPresent: {
      type: Number,
      default: 0
    },
    daysAbsent: {
      type: Number,
      default: 0
    },
    lateArrivals: {
      type: Number,
      default: 0
    }
  },
  leave: {
    annual: {
      entitled: {
        type: Number,
        default: 25
      },
      used: {
        type: Number,
        default: 0
      },
      remaining: {
        type: Number,
        default: 25
      }
    },
    sick: {
      entitled: {
        type: Number,
        default: 10
      },
      used: {
        type: Number,
        default: 0
      },
      remaining: {
        type: Number,
        default: 10
      }
    },
    personal: {
      entitled: {
        type: Number,
        default: 5
      },
      used: {
        type: Number,
        default: 0
      },
      remaining: {
        type: Number,
        default: 5
      }
    }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'terminated', 'on_leave', 'suspended'],
    default: 'active'
  },
  terminationDate: Date,
  terminationReason: String,
  profilePicture: String,
  notes: String
}, {
  timestamps: true
});

// Indexes for efficient queries
employeeSchema.index({ 'personalInfo.firstName': 1, 'personalInfo.lastName': 1 });
employeeSchema.index({ 'jobInfo.department': 1 });
employeeSchema.index({ 'jobInfo.manager': 1 });
employeeSchema.index({ status: 1 });

// Virtual for full name
employeeSchema.virtual('fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

// Virtual for age calculation
employeeSchema.virtual('age').get(function() {
  if (!this.personalInfo.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.personalInfo.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for years of service
employeeSchema.virtual('yearsOfService').get(function() {
  if (!this.jobInfo.hireDate) return null;
  const today = new Date();
  const hireDate = new Date(this.jobInfo.hireDate);
  return Math.floor((today - hireDate) / (365.25 * 24 * 60 * 60 * 1000));
});

// Pre-save middleware to generate employee ID
employeeSchema.pre('save', async function(next) {
  try {
    console.log('Pre-save middleware running. Current employeeId:', this.employeeId);
    if (!this.employeeId) {
      const year = new Date().getFullYear();
      const count = await this.constructor.countDocuments();
      this.employeeId = `EMP${year}${String(count + 1).padStart(4, '0')}`;
      console.log('Generated new employeeId:', this.employeeId);
    } else {
      console.log('EmployeeId already exists:', this.employeeId);
    }
    next();
  } catch (error) {
    console.error('Error in pre-save middleware:', error);
    next(error);
  }
});

// Ensure virtual fields are serialized
employeeSchema.set('toJSON', { virtuals: true });
employeeSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Employee', employeeSchema);