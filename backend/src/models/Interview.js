const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },

  interviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },

  scheduledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  interviewDetails: {
    type: {
      type: String,
      enum: ['in_person', 'video_call', 'phone_call'],
      required: true
    },
    stage: {
      type: String,
      enum: ['screening', 'technical', 'hr_round', 'portfolio_review', 'final'],
      required: true
    },
    position: {
      type: String,
      required: true
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true
    }
  },

  scheduling: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    },
    duration: {
      type: Number,
      required: true,
      default: 60,
      min: 15,
      max: 240
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    location: String, // Physical location or meeting link
    meetingId: String, // For video calls
    dialIn: String // For phone calls
  },

  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled', 'rescheduled', 'no_show'],
    default: 'scheduled'
  },

  feedback: {
    technicalSkills: {
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      comments: String
    },
    communicationSkills: {
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      comments: String
    },
    problemSolving: {
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      comments: String
    },
    culturalFit: {
      rating: {
        type: Number,
        min: 1,
        max: 10
      },
      comments: String
    },
    overallRating: {
      type: Number,
      min: 1,
      max: 10
    },
    overallComments: String,
    recommendation: {
      type: String,
      enum: ['strongly_recommend', 'recommend', 'neutral', 'not_recommend', 'strongly_not_recommend']
    },
    nextSteps: String,
    submittedAt: Date,
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },

  attachments: [{
    filename: String,
    path: String,
    type: {
      type: String,
      enum: ['question_sheet', 'answer_sheet', 'code_sample', 'presentation', 'other']
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  notes: [{
    content: String,
    isPrivate: {
      type: Boolean,
      default: false
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],

  rescheduleHistory: [{
    previousDate: Date,
    previousTime: String,
    newDate: Date,
    newTime: String,
    reason: String,
    rescheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rescheduledAt: {
      type: Date,
      default: Date.now
    }
  }],

  emailNotifications: {
    candidateNotified: {
      type: Boolean,
      default: false
    },
    interviewerNotified: {
      type: Boolean,
      default: false
    },
    reminderSent: {
      type: Boolean,
      default: false
    },
    feedbackRequestSent: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
interviewSchema.index({ candidate: 1 });
interviewSchema.index({ interviewer: 1 });
interviewSchema.index({ 'scheduling.date': 1 });
interviewSchema.index({ status: 1 });
interviewSchema.index({ 'interviewDetails.stage': 1 });
interviewSchema.index({ 'interviewDetails.department': 1 });

// Compound index for finding interviews by date range
interviewSchema.index({ 
  'scheduling.date': 1, 
  status: 1,
  'interviewDetails.stage': 1 
});

// Virtual for interview date-time combination
interviewSchema.virtual('scheduledDateTime').get(function() {
  if (!this.scheduling.date || !this.scheduling.time) return null;
  
  const [hours, minutes] = this.scheduling.time.split(':');
  const dateTime = new Date(this.scheduling.date);
  dateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  return dateTime;
});

// Virtual for calculated end time
interviewSchema.virtual('endDateTime').get(function() {
  const startTime = this.scheduledDateTime;
  if (!startTime) return null;
  
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + this.scheduling.duration);
  
  return endTime;
});

// Virtual for average rating calculation
interviewSchema.virtual('averageRating').get(function() {
  if (!this.feedback || !this.feedback.overallRating) return null;
  
  const ratings = [
    this.feedback.technicalSkills?.rating,
    this.feedback.communicationSkills?.rating,
    this.feedback.problemSolving?.rating,
    this.feedback.culturalFit?.rating
  ].filter(rating => rating != null);
  
  if (ratings.length === 0) return this.feedback.overallRating;
  
  const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  return Math.round(average * 10) / 10; // Round to 1 decimal place
});

// Method to reschedule interview
interviewSchema.methods.reschedule = function(newDate, newTime, reason, rescheduledBy) {
  // Add to reschedule history
  this.rescheduleHistory.push({
    previousDate: this.scheduling.date,
    previousTime: this.scheduling.time,
    newDate: newDate,
    newTime: newTime,
    reason: reason,
    rescheduledBy: rescheduledBy
  });
  
  // Update scheduling
  this.scheduling.date = newDate;
  this.scheduling.time = newTime;
  this.status = 'rescheduled';
  
  // Reset notifications
  this.emailNotifications.candidateNotified = false;
  this.emailNotifications.interviewerNotified = false;
  this.emailNotifications.reminderSent = false;
  
  return this.save();
};

// Method to complete interview
interviewSchema.methods.complete = function() {
  this.status = 'completed';
  return this.save();
};

// Method to cancel interview
interviewSchema.methods.cancel = function(reason, cancelledBy) {
  this.status = 'cancelled';
  this.notes.push({
    content: `Interview cancelled: ${reason}`,
    addedBy: cancelledBy,
    isPrivate: false
  });
  return this.save();
};

// Method to add feedback
interviewSchema.methods.addFeedback = function(feedbackData, submittedBy) {
  this.feedback = {
    ...feedbackData,
    submittedAt: new Date(),
    submittedBy: submittedBy
  };
  
  if (this.status === 'in_progress' || this.status === 'scheduled') {
    this.status = 'completed';
  }
  
  return this.save();
};

// Static method to find upcoming interviews
interviewSchema.statics.findUpcoming = function(days = 7) {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  
  return this.find({
    'scheduling.date': {
      $gte: startDate,
      $lte: endDate
    },
    status: { $in: ['scheduled', 'rescheduled'] }
  })
  .populate('candidate')
  .populate('interviewer')
  .populate('interviewDetails.department')
  .sort({ 'scheduling.date': 1, 'scheduling.time': 1 });
};

// Static method to find interviews by interviewer
interviewSchema.statics.findByInterviewer = function(interviewerId, startDate, endDate) {
  const query = { interviewer: interviewerId };
  
  if (startDate && endDate) {
    query['scheduling.date'] = {
      $gte: startDate,
      $lte: endDate
    };
  }
  
  return this.find(query)
    .populate('candidate')
    .populate('interviewDetails.department')
    .sort({ 'scheduling.date': 1, 'scheduling.time': 1 });
};

// Static method to get interview statistics
interviewSchema.statics.getStatistics = function(startDate, endDate) {
  const matchStage = {};
  
  if (startDate && endDate) {
    matchStage['scheduling.date'] = {
      $gte: startDate,
      $lte: endDate
    };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        averageRating: { $avg: '$feedback.overallRating' }
      }
    }
  ]);
};

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;