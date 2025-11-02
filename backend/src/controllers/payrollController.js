const Employee = require('../models/Employee');
const Payroll = require('../models/Payroll');

// @desc    Get all payrolls (for HR dashboard)
// @route   GET /api/payroll
// @access  Private (HR roles)
const getAllPayrolls = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status = 'all',
      month,
      year
    } = req.query;

    // Build filter object
    let filter = { isActive: true };

    // Add status filter
    if (status !== 'all') {
      filter.status = status;
    }

    // Add date filter
    if (month && year) {
      filter['payPeriod.month'] = parseInt(month);
      filter['payPeriod.year'] = parseInt(year);
    }

    // Get payrolls with employee details
    const query = Payroll.find(filter)
      .populate({
        path: 'employee',
        select: 'employeeId personalInfo jobInfo department',
        populate: {
          path: 'department',
          select: 'name'
        }
      })
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name email')
      .sort({ createdAt: -1 });

    // Apply search filter after population
    let payrolls = await query;

    if (search) {
      payrolls = payrolls.filter(payroll => {
        const employee = payroll.employee;
        if (!employee) return false;
        
        const fullName = `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`.toLowerCase();
        const employeeId = employee.employeeId.toLowerCase();
        const searchTerm = search.toLowerCase();
        
        return fullName.includes(searchTerm) || employeeId.includes(searchTerm);
      });
    }

    // Apply pagination
    const total = payrolls.length;
    const pages = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const paginatedPayrolls = payrolls.slice(skip, skip + parseInt(limit));

    // Format response data
    const formattedPayrolls = paginatedPayrolls.map(payroll => ({
      _id: payroll._id,
      employeeId: payroll.employee?.employeeId || 'N/A',
      employeeName: payroll.employee ? 
        `${payroll.employee.personalInfo.firstName} ${payroll.employee.personalInfo.lastName}` : 'N/A',
      employeeAvatar: payroll.employee?.personalInfo.profilePicture,
      department: payroll.employee?.department?.name || 'N/A',
      basicSalary: payroll.salary.basicSalary,
      allowances: payroll.salary.allowances.total,
      deductions: payroll.salary.deductions.total,
      grossSalary: payroll.salary.grossSalary,
      netSalary: payroll.salary.netSalary,
      status: payroll.status,
      payPeriod: payroll.payPeriodDisplay,
      payPeriodMonth: payroll.payPeriod.month,
      payPeriodYear: payroll.payPeriod.year,
      createdAt: payroll.createdAt,
      updatedAt: payroll.updatedAt
    }));

    res.status(200).json({
      success: true,
      message: 'Payroll data retrieved successfully',
      count: formattedPayrolls.length,
      total: total,
      page: parseInt(page),
      pages: pages,
      data: formattedPayrolls
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new payroll record
// @route   POST /api/payroll
// @access  Private (HR roles)
const createPayroll = async (req, res, next) => {
  try {
    const {
      employeeId,
      payPeriod,
      salary,
      attendance,
      notes
    } = req.body;

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if payroll already exists for this period
    const existingPayroll = await Payroll.findOne({
      employee: employeeId,
      'payPeriod.month': payPeriod.month,
      'payPeriod.year': payPeriod.year,
      isActive: true
    });

    if (existingPayroll) {
      return res.status(400).json({
        success: false,
        message: 'Payroll record already exists for this employee and period'
      });
    }

    // Create payroll record
    const payroll = await Payroll.create({
      employee: employeeId,
      payPeriod,
      salary,
      attendance,
      notes,
      createdBy: req.user.id,
      status: 'draft'
    });

    // Populate employee details
    await payroll.populate({
      path: 'employee',
      select: 'employeeId personalInfo department',
      populate: {
        path: 'department',
        select: 'name'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Payroll record created successfully',
      data: payroll
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single payroll record
// @route   GET /api/payroll/:id
// @access  Private (HR roles)
const getPayroll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id)
      .populate({
        path: 'employee',
        select: 'employeeId personalInfo jobInfo department',
        populate: {
          path: 'department',
          select: 'name'
        }
      })
      .populate('createdBy', 'name email')
      .populate('approvedBy', 'name email');

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payroll record retrieved successfully',
      data: payroll
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update payroll record
// @route   PUT /api/payroll/:id
// @access  Private (HR roles)
const updatePayroll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    // Don't allow updates to paid payrolls
    if (payroll.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update paid payroll records'
      });
    }

    // Update the payroll
    Object.assign(payroll, updates);
    await payroll.save();

    // Populate employee details
    await payroll.populate({
      path: 'employee',
      select: 'employeeId personalInfo department',
      populate: {
        path: 'department',
        select: 'name'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Payroll record updated successfully',
      data: payroll
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete payroll record
// @route   DELETE /api/payroll/:id
// @access  Private (HR roles)
const deletePayroll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    // Don't allow deletion of paid payrolls
    if (payroll.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete paid payroll records'
      });
    }

    // Soft delete
    payroll.isActive = false;
    await payroll.save();

    res.status(200).json({
      success: true,
      message: 'Payroll record deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve payroll record
// @route   PUT /api/payroll/:id/approve
// @access  Private (HR Manager/Super Admin)
const approvePayroll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    if (payroll.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending payroll records can be approved'
      });
    }

    payroll.status = 'approved';
    payroll.approvedBy = req.user.id;
    payroll.approvedAt = new Date();
    await payroll.save();

    res.status(200).json({
      success: true,
      message: 'Payroll record approved successfully',
      data: payroll
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark payroll as paid
// @route   PUT /api/payroll/:id/pay
// @access  Private (HR roles)
const markAsPaid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { paymentDetails } = req.body;

    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    if (payroll.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Only approved payroll records can be marked as paid'
      });
    }

    payroll.status = 'paid';
    payroll.paymentDetails = {
      ...payroll.paymentDetails,
      ...paymentDetails,
      paidDate: new Date()
    };
    await payroll.save();

    res.status(200).json({
      success: true,
      message: 'Payroll marked as paid successfully',
      data: payroll
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate payslip
// @route   GET /api/payroll/:id/payslip
// @access  Private
const generatePayslip = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findById(id)
      .populate({
        path: 'employee',
        select: 'employeeId personalInfo jobInfo department',
        populate: {
          path: 'department',
          select: 'name'
        }
      });

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: 'Payroll record not found'
      });
    }

    // Generate payslip data
    const payslip = payroll.generatePayslip();

    res.status(200).json({
      success: true,
      message: 'Payslip generated successfully',
      data: payslip
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payroll summary/statistics
// @route   GET /api/payroll/summary
// @access  Private (HR roles)
const getPayrollSummary = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    
    let filter = {};
    if (month && year) {
      filter['payPeriod.month'] = parseInt(month);
      filter['payPeriod.year'] = parseInt(year);
    }

    const summary = await Payroll.getPayrollSummary(filter);

    res.status(200).json({
      success: true,
      message: 'Payroll summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Calculate payroll for employee (helper function)
// @route   POST /api/payroll/calculate
// @access  Private (HR roles)
const calculatePayroll = async (req, res, next) => {
  try {
    const {
      employeeId,
      payPeriod,
      workingDays = 22,
      presentDays,
      overtimeHours = 0
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const baseSalary = employee.jobInfo.salary;
    
    // Calculate salary based on attendance
    const attendanceRatio = presentDays / workingDays;
    const basicSalary = baseSalary * attendanceRatio;

    // Calculate allowances (example percentages)
    const allowances = {
      hra: basicSalary * 0.4, // 40% HRA
      medical: 2000, // Fixed medical allowance
      transport: 1500, // Fixed transport allowance
      foodAllowance: 1000, // Fixed food allowance
      otherAllowances: 0,
      total: 0
    };

    // Calculate deductions (example percentages)
    const deductions = {
      tax: basicSalary * 0.1, // 10% tax
      providentFund: basicSalary * 0.12, // 12% PF
      insurance: 500, // Fixed insurance
      loan: 0,
      otherDeductions: 0,
      total: 0
    };

    // Calculate overtime
    const overtime = {
      hours: overtimeHours,
      rate: (baseSalary / (workingDays * 8)) * 1.5, // 1.5x hourly rate
      amount: 0
    };

    const calculatedPayroll = {
      employee: employeeId,
      payPeriod,
      salary: {
        basicSalary,
        allowances,
        deductions,
        overtime,
        bonus: {
          performance: 0,
          festival: 0,
          other: 0,
          total: 0
        }
      },
      attendance: {
        workingDays,
        presentDays,
        absentDays: workingDays - presentDays,
        leavesTaken: 0,
        overtimeHours
      }
    };

    res.status(200).json({
      success: true,
      message: 'Payroll calculated successfully',
      data: calculatedPayroll
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPayrolls,
  createPayroll,
  getPayroll,
  updatePayroll,
  deletePayroll,
  approvePayroll,
  markAsPaid,
  generatePayslip,
  getPayrollSummary,
  calculatePayroll
};