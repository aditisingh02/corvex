const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  leaveType: {
    type: String,
    enum: ['annual', 'sick', 'personal', 'maternity', 'paternity', 'bereavement', 'emergency', 'unpaid'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  approvedDate: Date,
  rejectionReason: String,
  documents: [{
    name: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  handoverTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  handoverNotes: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  isHalfDay: {
    type: Boolean,
    default: false
  },
  halfDayPeriod: {
    type: String,
    enum: ['morning', 'afternoon'],
    required: function() {
      return this.isHalfDay;
    }
  },
  remarks: String
}, {
  timestamps: true
});

// Indexes
leaveSchema.index({ employee: 1, startDate: 1, endDate: 1 });
leaveSchema.index({ status: 1 });
leaveSchema.index({ leaveType: 1 });
leaveSchema.index({ appliedDate: 1 });

// Pre-save middleware to calculate total days
leaveSchema.pre('save', function(next) {
  if (this.startDate && this.endDate) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    
    // Calculate number of days
    const timeDiff = end.getTime() - start.getTime();
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // +1 to include both start and end dates
    
    // If it's a half day, count as 0.5
    if (this.isHalfDay) {
      daysDiff = 0.5;
    }
    
    this.totalDays = daysDiff;
  }
  next();
});

// Static method to get leave balance for an employee
leaveSchema.statics.getLeaveBalance = async function(employeeId, leaveType, year = new Date().getFullYear()) {
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);
  
  const usedLeave = await this.aggregate([
    {
      $match: {
        employee: mongoose.Types.ObjectId(employeeId),
        leaveType: leaveType,
        status: 'approved',
        startDate: { $gte: startOfYear },
        endDate: { $lte: endOfYear }
      }
    },
    {
      $group: {
        _id: null,
        totalDays: { $sum: '$totalDays' }
      }
    }
  ]);
  
  return usedLeave.length > 0 ? usedLeave[0].totalDays : 0;
};

module.exports = mongoose.model('Leave', leaveSchema);