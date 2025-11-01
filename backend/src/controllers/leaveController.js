const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

// @desc    Submit leave request
// @route   POST /api/leave
// @access  Private
const submitLeaveRequest = async (req, res, next) => {
  try {
    const {
      type,
      startDate,
      endDate,
      reason,
      isHalfDay = false,
      halfDayPeriod = 'morning'
    } = req.body;

    // Get employee from user
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    // Calculate days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const days = isHalfDay ? 0.5 : Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    const leaveData = {
      employee: employee._id,
      type,
      startDate: start,
      endDate: end,
      days,
      reason,
      isHalfDay,
      halfDayPeriod: isHalfDay ? halfDayPeriod : undefined,
      status: 'pending',
      submittedAt: new Date()
    };

    const leave = await Leave.create(leaveData);
    
    // Populate employee info for response
    await leave.populate('employee', 'personalInfo.firstName personalInfo.lastName employeeId');

    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      data: leave
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get leave requests
// @route   GET /api/leave
// @access  Private
const getLeaveRequests = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      type,
      employeeId,
      startDate,
      endDate
    } = req.query;

    let filter = {};

    // If not admin/hr/manager, only show own leaves
    if (!['super_admin', 'hr_manager', 'hr_coordinator', 'manager'].includes(req.user.role)) {
      const employee = await Employee.findOne({ user: req.user.id });
      if (employee) {
        filter.employee = employee._id;
      }
    } else if (employeeId) {
      filter.employee = employeeId;
    }

    if (status) {
      filter.status = status;
    }

    if (type) {
      filter.type = type;
    }

    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const leaves = await Leave.find(filter)
      .populate('employee', 'personalInfo.firstName personalInfo.lastName employeeId department')
      .populate('approvedBy', 'personalInfo.firstName personalInfo.lastName')
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Leave.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: leaves.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: leaves
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single leave request
// @route   GET /api/leave/:id
// @access  Private
const getLeaveRequest = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id)
      .populate('employee', 'personalInfo.firstName personalInfo.lastName employeeId department')
      .populate('approvedBy', 'personalInfo.firstName personalInfo.lastName');

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // Check if user can view this leave
    const employee = await Employee.findOne({ user: req.user.id });
    const canView = ['super_admin', 'hr_manager', 'hr_coordinator', 'manager'].includes(req.user.role) ||
                   (employee && leave.employee.toString() === employee._id.toString());

    if (!canView) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this leave request'
      });
    }

    res.status(200).json({
      success: true,
      data: leave
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update leave request
// @route   PUT /api/leave/:id
// @access  Private
const updateLeaveRequest = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // Check if user can update
    const employee = await Employee.findOne({ user: req.user.id });
    const canUpdate = ['super_admin', 'hr_manager', 'hr_coordinator', 'manager'].includes(req.user.role) ||
                     (employee && leave.employee.toString() === employee._id.toString() && leave.status === 'pending');

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this leave request'
      });
    }

    // If updating as employee, only allow certain fields
    if (employee && leave.employee.toString() === employee._id.toString()) {
      const { type, startDate, endDate, reason, isHalfDay, halfDayPeriod } = req.body;
      
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const days = isHalfDay ? 0.5 : Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        leave.days = days;
      }

      leave.type = type || leave.type;
      leave.startDate = startDate || leave.startDate;
      leave.endDate = endDate || leave.endDate;
      leave.reason = reason || leave.reason;
      leave.isHalfDay = isHalfDay !== undefined ? isHalfDay : leave.isHalfDay;
      leave.halfDayPeriod = halfDayPeriod || leave.halfDayPeriod;
    } else {
      // HR/Manager can update status
      const { status, approvalComments } = req.body;
      
      if (status) {
        leave.status = status;
        if (status === 'approved' || status === 'rejected') {
          leave.approvedBy = employee._id;
          leave.approvedAt = new Date();
        }
      }
      
      if (approvalComments) {
        leave.approvalComments = approvalComments;
      }
    }

    await leave.save();
    
    await leave.populate('employee', 'personalInfo.firstName personalInfo.lastName employeeId');
    await leave.populate('approvedBy', 'personalInfo.firstName personalInfo.lastName');

    res.status(200).json({
      success: true,
      message: 'Leave request updated successfully',
      data: leave
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete leave request
// @route   DELETE /api/leave/:id
// @access  Private
const deleteLeaveRequest = async (req, res, next) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    // Check if user can delete
    const employee = await Employee.findOne({ user: req.user.id });
    const canDelete = ['super_admin', 'hr_manager'].includes(req.user.role) ||
                     (employee && leave.employee.toString() === employee._id.toString() && leave.status === 'pending');

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this leave request'
      });
    }

    await leave.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Leave request deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get leave balance
// @route   GET /api/leave/balance
// @access  Private
const getLeaveBalance = async (req, res, next) => {
  try {
    const { employeeId } = req.query;
    
    let targetEmployeeId;
    
    if (employeeId && ['super_admin', 'hr_manager', 'hr_coordinator', 'manager'].includes(req.user.role)) {
      targetEmployeeId = employeeId;
    } else {
      const employee = await Employee.findOne({ user: req.user.id });
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee profile not found'
        });
      }
      targetEmployeeId = employee._id;
    }

    // Calculate current year leaves
    const currentYear = new Date().getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31);

    const leaveStats = await Leave.aggregate([
      {
        $match: {
          employee: targetEmployeeId,
          startDate: { $gte: yearStart, $lte: yearEnd },
          status: { $in: ['approved', 'pending'] }
        }
      },
      {
        $group: {
          _id: '$type',
          totalDays: { $sum: '$days' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Default leave balances (you can configure these per company policy)
    const defaultBalances = {
      annual: 20,
      sick: 10,
      personal: 5,
      maternity: 90,
      paternity: 15,
      emergency: 3
    };

    const balance = {};
    Object.keys(defaultBalances).forEach(type => {
      const usedLeave = leaveStats.find(stat => stat._id === type);
      balance[type] = {
        allocated: defaultBalances[type],
        used: usedLeave ? usedLeave.totalDays : 0,
        remaining: defaultBalances[type] - (usedLeave ? usedLeave.totalDays : 0)
      };
    });

    res.status(200).json({
      success: true,
      data: {
        year: currentYear,
        balance
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get leave statistics
// @route   GET /api/leave/stats
// @access  Private (HR roles and managers)
const getLeaveStats = async (req, res, next) => {
  try {
    const { startDate, endDate, departmentId } = req.query;
    
    let matchFilter = {};
    
    if (startDate || endDate) {
      matchFilter.startDate = {};
      if (startDate) matchFilter.startDate.$gte = new Date(startDate);
      if (endDate) matchFilter.startDate.$lte = new Date(endDate);
    }

    const stats = await Leave.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employee'
        }
      },
      { $unwind: '$employee' },
      ...(departmentId ? [{ $match: { 'employee.department': departmentId } }] : []),
      {
        $group: {
          _id: null,
          totalRequests: { $sum: 1 },
          pendingRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          approvedRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          },
          rejectedRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
          },
          totalDays: { $sum: '$days' },
          avgDaysPerRequest: { $avg: '$days' }
        }
      }
    ]);

    const leaveByType = await Leave.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalDays: { $sum: '$days' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalRequests: 0,
          pendingRequests: 0,
          approvedRequests: 0,
          rejectedRequests: 0,
          totalDays: 0,
          avgDaysPerRequest: 0
        },
        byType: leaveByType
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitLeaveRequest,
  getLeaveRequests,
  getLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
  getLeaveBalance,
  getLeaveStats
};