const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  checkIn: {
    time: Date,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    method: {
      type: String,
      enum: ['manual', 'biometric', 'mobile', 'web'],
      default: 'manual'
    }
  },
  checkOut: {
    time: Date,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },
    method: {
      type: String,
      enum: ['manual', 'biometric', 'mobile', 'web'],
      default: 'manual'
    }
  },
  breaks: [{
    startTime: Date,
    endTime: Date,
    type: {
      type: String,
      enum: ['lunch', 'tea', 'other'],
      default: 'other'
    },
    duration: Number // in minutes
  }],
  workingHours: {
    type: Number,
    default: 0
  },
  overtime: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'half_day', 'work_from_home'],
    required: true
  },
  lateArrival: {
    type: Boolean,
    default: false
  },
  earlyDeparture: {
    type: Boolean,
    default: false
  },
  remarks: String,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  isManualEntry: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ status: 1 });

// GeoJSON index for location-based queries
attendanceSchema.index({ 'checkIn.location': '2dsphere' });
attendanceSchema.index({ 'checkOut.location': '2dsphere' });

// Pre-save middleware to calculate working hours
attendanceSchema.pre('save', function(next) {
  if (this.checkIn.time && this.checkOut.time) {
    const checkInTime = new Date(this.checkIn.time);
    const checkOutTime = new Date(this.checkOut.time);
    
    // Calculate total break time
    const totalBreakTime = this.breaks.reduce((total, breakItem) => {
      if (breakItem.startTime && breakItem.endTime) {
        return total + (new Date(breakItem.endTime) - new Date(breakItem.startTime));
      }
      return total;
    }, 0);

    // Calculate working hours (in hours)
    const totalTime = checkOutTime - checkInTime - totalBreakTime;
    this.workingHours = Math.max(0, totalTime / (1000 * 60 * 60)); // Convert to hours

    // Calculate overtime (assuming 8 hours is standard working time)
    const standardHours = 8;
    this.overtime = Math.max(0, this.workingHours - standardHours);
  }
  next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);