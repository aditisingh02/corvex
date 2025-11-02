const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Employee is required']
  },
  payPeriod: {
    start: {
      type: Date,
      required: [true, 'Pay period start date is required']
    },
    end: {
      type: Date,
      required: [true, 'Pay period end date is required']
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true
    }
  },
  salary: {
    basicSalary: {
      type: Number,
      required: [true, 'Basic salary is required'],
      min: 0
    },
    allowances: {
      hra: { type: Number, default: 0 },
      medical: { type: Number, default: 0 },
      transport: { type: Number, default: 0 },
      foodAllowance: { type: Number, default: 0 },
      otherAllowances: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    deductions: {
      tax: { type: Number, default: 0 },
      providentFund: { type: Number, default: 0 },
      insurance: { type: Number, default: 0 },
      loan: { type: Number, default: 0 },
      otherDeductions: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    overtime: {
      hours: { type: Number, default: 0 },
      rate: { type: Number, default: 0 },
      amount: { type: Number, default: 0 }
    },
    bonus: {
      performance: { type: Number, default: 0 },
      festival: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    grossSalary: {
      type: Number,
      required: true,
      default: 0
    },
    netSalary: {
      type: Number,
      required: true,
      default: 0
    }
  },
  attendance: {
    workingDays: { type: Number, default: 0 },
    presentDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    leavesTaken: { type: Number, default: 0 },
    overtimeHours: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'paid', 'cancelled'],
    default: 'draft'
  },
  paymentDetails: {
    method: {
      type: String,
      enum: ['bank_transfer', 'cash', 'cheque'],
      default: 'bank_transfer'
    },
    transactionId: String,
    paidDate: Date,
    remarks: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  notes: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
PayrollSchema.index({ employee: 1, 'payPeriod.month': 1, 'payPeriod.year': 1 }, { unique: true });
PayrollSchema.index({ status: 1 });
PayrollSchema.index({ 'payPeriod.start': 1, 'payPeriod.end': 1 });
PayrollSchema.index({ createdAt: -1 });

// Pre-save middleware to calculate totals
PayrollSchema.pre('save', function(next) {
  // Calculate allowances total
  this.salary.allowances.total = 
    this.salary.allowances.hra +
    this.salary.allowances.medical +
    this.salary.allowances.transport +
    this.salary.allowances.foodAllowance +
    this.salary.allowances.otherAllowances;

  // Calculate deductions total
  this.salary.deductions.total = 
    this.salary.deductions.tax +
    this.salary.deductions.providentFund +
    this.salary.deductions.insurance +
    this.salary.deductions.loan +
    this.salary.deductions.otherDeductions;

  // Calculate bonus total
  this.salary.bonus.total = 
    this.salary.bonus.performance +
    this.salary.bonus.festival +
    this.salary.bonus.other;

  // Calculate overtime amount
  this.salary.overtime.amount = this.salary.overtime.hours * this.salary.overtime.rate;

  // Calculate gross salary
  this.salary.grossSalary = 
    this.salary.basicSalary +
    this.salary.allowances.total +
    this.salary.bonus.total +
    this.salary.overtime.amount;

  // Calculate net salary
  this.salary.netSalary = this.salary.grossSalary - this.salary.deductions.total;

  next();
});

// Virtual for pay period display
PayrollSchema.virtual('payPeriodDisplay').get(function() {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[this.payPeriod.month - 1]} ${this.payPeriod.year}`;
});

// Instance method to generate payslip
PayrollSchema.methods.generatePayslip = function() {
  return {
    payrollId: this._id,
    employee: this.employee,
    payPeriod: this.payPeriodDisplay,
    salary: this.salary,
    attendance: this.attendance,
    status: this.status,
    generatedAt: new Date()
  };
};

// Static method to get payroll summary
PayrollSchema.statics.getPayrollSummary = async function(filters = {}) {
  const pipeline = [
    { $match: { isActive: true, ...filters } },
    {
      $group: {
        _id: null,
        totalEmployees: { $sum: 1 },
        totalGrossSalary: { $sum: '$salary.grossSalary' },
        totalNetSalary: { $sum: '$salary.netSalary' },
        totalDeductions: { $sum: '$salary.deductions.total' },
        paidCount: {
          $sum: { $cond: [{ $eq: ['$status', 'paid'] }, 1, 0] }
        },
        pendingCount: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        }
      }
    }
  ];

  const result = await this.aggregate(pipeline);
  return result[0] || {
    totalEmployees: 0,
    totalGrossSalary: 0,
    totalNetSalary: 0,
    totalDeductions: 0,
    paidCount: 0,
    pendingCount: 0
  };
};

module.exports = mongoose.model('Payroll', PayrollSchema);