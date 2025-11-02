const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  personalInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: { type: String, default: 'USA' }
    },
    dateOfBirth: Date,
    linkedin: String,
    portfolio: String
  },
  
  applicationInfo: {
    position: {
      type: String,
      required: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    },
    expectedSalary: {
      amount: Number,
      currency: { type: String, default: 'USD' }
    },
    availableStartDate: Date,
    appliedDate: {
      type: Date,
      default: Date.now
    },
    source: {
      type: String,
      enum: ['website', 'linkedin', 'referral', 'job_board', 'other'],
      default: 'website'
    },
    referredBy: String
  },

  documents: {
    resume: {
      filename: String,
      path: String,
      uploadDate: { type: Date, default: Date.now }
    },
    coverLetter: {
      filename: String,
      path: String,
      uploadDate: { type: Date, default: Date.now }
    },
    portfolio: {
      filename: String,
      path: String,
      uploadDate: { type: Date, default: Date.now }
    }
  },

  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    yearsOfExperience: Number
  }],

  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    technologies: [String]
  }],

  education: [{
    institution: String,
    degree: String,
    field: String,
    graduationYear: Number,
    gpa: Number
  }],

  interviewStage: {
    type: String,
    enum: ['applied', 'screening', 'technical', 'hr_round', 'portfolio_review', 'final', 'selected', 'rejected'],
    default: 'applied'
  },

  status: {
    type: String,
    enum: ['active', 'withdrawn', 'hired', 'rejected', 'on_hold'],
    default: 'active'
  },

  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],

  overallRating: {
    type: Number,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

// Indexes for better query performance
candidateSchema.index({ 'applicationInfo.position': 1 });
candidateSchema.index({ 'applicationInfo.department': 1 });
candidateSchema.index({ interviewStage: 1 });
candidateSchema.index({ status: 1 });

// Virtual for full name
candidateSchema.virtual('fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

// Virtual for years of experience calculation
candidateSchema.virtual('totalExperience').get(function() {
  if (!this.experience || this.experience.length === 0) return 0;
  
  const totalMonths = this.experience.reduce((total, exp) => {
    if (!exp.startDate) return total;
    const endDate = exp.endDate || new Date();
    const months = (endDate.getFullYear() - exp.startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - exp.startDate.getMonth());
    return total + months;
  }, 0);
  
  return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal place
});

// Method to advance interview stage
candidateSchema.methods.advanceStage = function() {
  const stages = ['applied', 'screening', 'technical', 'hr_round', 'portfolio_review', 'final'];
  const currentIndex = stages.indexOf(this.interviewStage);
  
  if (currentIndex >= 0 && currentIndex < stages.length - 1) {
    this.interviewStage = stages[currentIndex + 1];
  }
  
  return this.save();
};

// Method to reject candidate
candidateSchema.methods.reject = function(reason) {
  this.status = 'rejected';
  this.interviewStage = 'rejected';
  if (reason) {
    this.notes.push({
      content: `Rejected: ${reason}`,
      addedAt: new Date()
    });
  }
  return this.save();
};

// Method to hire candidate
candidateSchema.methods.hire = function() {
  this.status = 'hired';
  this.interviewStage = 'selected';
  return this.save();
};

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;