const Employee = require('../models/Employee');
const Department = require('../models/Department');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private (HR roles and managers)
const getDashboardAnalytics = async (req, res, next) => {
  try {
    const { period = 'month', departmentId } = req.query;
    
    // Get current date ranges
    const now = new Date();
    let startDate, endDate;
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        endDate = now;
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        endDate = new Date(now.getFullYear(), quarter * 3 + 3, 0);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      default: // month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    // Build employee filter
    let employeeFilter = {};
    if (departmentId) {
      employeeFilter.department = departmentId;
    }

    // Get basic counts
    const totalEmployees = await Employee.countDocuments(employeeFilter);
    const totalDepartments = await Department.countDocuments();

    // Get attendance stats
    const attendanceStats = await Attendance.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeData'
        }
      },
      { $unwind: '$employeeData' },
      ...(departmentId ? [{ $match: { 'employeeData.department': departmentId } }] : []),
      {
        $match: {
          date: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalDays: { $sum: 1 },
          presentDays: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absentDays: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          totalWorkingHours: { $sum: '$workingHours' },
          averageWorkingHours: { $avg: '$workingHours' }
        }
      }
    ]);

    // Get leave stats
    const leaveStats = await Leave.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeData'
        }
      },
      { $unwind: '$employeeData' },
      ...(departmentId ? [{ $match: { 'employeeData.department': departmentId } }] : []),
      {
        $match: {
          startDate: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRequests: { $sum: 1 },
          approvedRequests: { $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] } },
          pendingRequests: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          totalLeaveDays: { $sum: '$days' }
        }
      }
    ]);

    // Get employee growth
    const employeeGrowth = await Employee.aggregate([
      ...(departmentId ? [{ $match: { department: departmentId } }] : []),
      {
        $match: {
          'jobInfo.startDate': { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$jobInfo.startDate' },
            month: { $month: '$jobInfo.startDate' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const analytics = {
      overview: {
        totalEmployees,
        totalDepartments,
        attendanceRate: attendanceStats[0] ? 
          Math.round((attendanceStats[0].presentDays / attendanceStats[0].totalDays) * 100) : 0,
        averageWorkingHours: attendanceStats[0] ? 
          Math.round(attendanceStats[0].averageWorkingHours * 100) / 100 : 0,
        leaveRequests: leaveStats[0] ? leaveStats[0].totalRequests : 0,
        pendingLeaves: leaveStats[0] ? leaveStats[0].pendingRequests : 0
      },
      attendance: attendanceStats[0] || {
        totalDays: 0,
        presentDays: 0,
        absentDays: 0,
        totalWorkingHours: 0,
        averageWorkingHours: 0
      },
      leave: leaveStats[0] || {
        totalRequests: 0,
        approvedRequests: 0,
        pendingRequests: 0,
        totalLeaveDays: 0
      },
      employeeGrowth,
      period: {
        type: period,
        startDate,
        endDate
      }
    };

    res.status(200).json({
      success: true,
      message: 'Dashboard analytics retrieved successfully',
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employee analytics
// @route   GET /api/analytics/employees
// @access  Private (HR roles and managers)
const getEmployeeAnalytics = async (req, res, next) => {
  try {
    const { departmentId, position, period = 'year' } = req.query;
    
    let filter = {};
    if (departmentId) filter.department = departmentId;
    if (position) filter['jobInfo.position'] = new RegExp(position, 'i');

    // Department distribution
    const departmentDistribution = await Employee.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'dept'
        }
      },
      { $unwind: { path: '$dept', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$dept.name',
          count: { $sum: 1 },
          avgSalary: { $avg: '$jobInfo.salary' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Position distribution
    const positionDistribution = await Employee.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$jobInfo.position',
          count: { $sum: 1 },
          avgSalary: { $avg: '$jobInfo.salary' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Age distribution
    const ageDistribution = await Employee.aggregate([
      { $match: filter },
      {
        $addFields: {
          age: {
            $divide: [
              { $subtract: [new Date(), '$personalInfo.dateOfBirth'] },
              365.25 * 24 * 60 * 60 * 1000
            ]
          }
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ['$age', 25] }, then: '18-24' },
                { case: { $lt: ['$age', 35] }, then: '25-34' },
                { case: { $lt: ['$age', 45] }, then: '35-44' },
                { case: { $lt: ['$age', 55] }, then: '45-54' },
                { case: { $gte: ['$age', 55] }, then: '55+' }
              ],
              default: 'Unknown'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Gender distribution
    const genderDistribution = await Employee.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$personalInfo.gender',
          count: { $sum: 1 }
        }
      }
    ]);

    // Tenure analysis
    const tenureAnalysis = await Employee.aggregate([
      { $match: filter },
      {
        $addFields: {
          tenure: {
            $divide: [
              { $subtract: [new Date(), '$jobInfo.startDate'] },
              365.25 * 24 * 60 * 60 * 1000
            ]
          }
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ['$tenure', 1] }, then: '< 1 year' },
                { case: { $lt: ['$tenure', 3] }, then: '1-3 years' },
                { case: { $lt: ['$tenure', 5] }, then: '3-5 years' },
                { case: { $gte: ['$tenure', 5] }, then: '5+ years' }
              ],
              default: 'Unknown'
            }
          },
          count: { $sum: 1 },
          avgSalary: { $avg: '$jobInfo.salary' }
        }
      }
    ]);

    // Salary insights
    const salaryInsights = await Employee.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          averageSalary: { $avg: '$jobInfo.salary' },
          minSalary: { $min: '$jobInfo.salary' },
          maxSalary: { $max: '$jobInfo.salary' },
          totalPayroll: { $sum: '$jobInfo.salary' }
        }
      }
    ]);

    const analytics = {
      overview: {
        totalEmployees: await Employee.countDocuments(filter),
        averageSalary: salaryInsights[0]?.averageSalary || 0,
        totalPayroll: salaryInsights[0]?.totalPayroll || 0,
        salaryRange: {
          min: salaryInsights[0]?.minSalary || 0,
          max: salaryInsights[0]?.maxSalary || 0
        }
      },
      distributions: {
        department: departmentDistribution,
        position: positionDistribution,
        age: ageDistribution,
        gender: genderDistribution,
        tenure: tenureAnalysis
      }
    };

    res.status(200).json({
      success: true,
      message: 'Employee analytics retrieved successfully',
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance analytics
// @route   GET /api/analytics/attendance
// @access  Private (HR roles and managers)
const getAttendanceAnalytics = async (req, res, next) => {
  try {
    const { departmentId, startDate, endDate } = req.query;
    
    let matchFilter = {};
    if (startDate || endDate) {
      matchFilter.date = {};
      if (startDate) matchFilter.date.$gte = new Date(startDate);
      if (endDate) matchFilter.date.$lte = new Date(endDate);
    }

    // Daily attendance trends
    const dailyTrends = await Attendance.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeData'
        }
      },
      { $unwind: '$employeeData' },
      ...(departmentId ? [{ $match: { 'employeeData.department': departmentId } }] : []),
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' }
          },
          totalEmployees: { $sum: 1 },
          presentCount: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absentCount: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          lateCount: { $sum: { $cond: ['$lateArrival', 1, 0] } },
          averageWorkingHours: { $avg: '$workingHours' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Department-wise attendance
    const departmentAttendance = await Attendance.aggregate([
      { $match: matchFilter },
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employeeData'
        }
      },
      { $unwind: '$employeeData' },
      {
        $lookup: {
          from: 'departments',
          localField: 'employeeData.department',
          foreignField: '_id',
          as: 'department'
        }
      },
      { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$department.name',
          totalDays: { $sum: 1 },
          presentDays: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          averageWorkingHours: { $avg: '$workingHours' },
          totalOvertime: { $sum: '$overtime' }
        }
      },
      {
        $addFields: {
          attendanceRate: {
            $multiply: [
              { $divide: ['$presentDays', '$totalDays'] },
              100
            ]
          }
        }
      }
    ]);

    // Peak hours analysis
    const peakHours = await Attendance.aggregate([
      { $match: matchFilter },
      { $match: { 'checkIn.time': { $exists: true } } },
      {
        $group: {
          _id: { $hour: '$checkIn.time' },
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const analytics = {
      dailyTrends,
      departmentAttendance,
      peakHours,
      summary: {
        totalRecords: dailyTrends.reduce((sum, day) => sum + day.totalEmployees, 0),
        averageAttendanceRate: departmentAttendance.length > 0 ?
          departmentAttendance.reduce((sum, dept) => sum + dept.attendanceRate, 0) / departmentAttendance.length : 0,
        totalOvertimeHours: departmentAttendance.reduce((sum, dept) => sum + dept.totalOvertime, 0)
      }
    };

    res.status(200).json({
      success: true,
      message: 'Attendance analytics retrieved successfully',
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get department analytics
// @route   GET /api/analytics/departments
// @access  Private (HR roles and managers)
const getDepartmentAnalytics = async (req, res, next) => {
  try {
    // Department overview
    const departmentOverview = await Department.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: '_id',
          foreignField: 'department',
          as: 'employees'
        }
      },
      {
        $addFields: {
          employeeCount: { $size: '$employees' },
          totalSalaryExpense: { $sum: '$employees.jobInfo.salary' },
          averageSalary: { $avg: '$employees.jobInfo.salary' }
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          headOfDepartment: 1,
          budget: 1,
          employeeCount: 1,
          totalSalaryExpense: 1,
          averageSalary: 1,
          budgetUtilization: {
            $cond: [
              { $gt: ['$budget', 0] },
              { $multiply: [{ $divide: ['$totalSalaryExpense', '$budget'] }, 100] },
              0
            ]
          }
        }
      },
      { $sort: { employeeCount: -1 } }
    ]);

    // Employee distribution by department
    const employeeDistribution = await Employee.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'dept'
        }
      },
      { $unwind: { path: '$dept', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$dept.name',
          count: { $sum: 1 },
          avgSalary: { $avg: '$jobInfo.salary' },
          totalSalary: { $sum: '$jobInfo.salary' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Cost center analysis
    const costAnalysis = {
      totalBudget: await Department.aggregate([
        { $group: { _id: null, total: { $sum: '$budget' } } }
      ]).then(result => result[0]?.total || 0),
      totalSalaryExpense: await Employee.aggregate([
        { $group: { _id: null, total: { $sum: '$jobInfo.salary' } } }
      ]).then(result => result[0]?.total || 0)
    };

    const analytics = {
      overview: departmentOverview,
      distribution: employeeDistribution,
      costAnalysis: {
        ...costAnalysis,
        budgetUtilization: costAnalysis.totalBudget > 0 ?
          (costAnalysis.totalSalaryExpense / costAnalysis.totalBudget) * 100 : 0
      },
      insights: {
        largestDepartment: employeeDistribution[0]?.name || 'N/A',
        highestPaidDepartment: employeeDistribution.sort((a, b) => b.avgSalary - a.avgSalary)[0]?.name || 'N/A',
        totalDepartments: departmentOverview.length
      }
    };

    res.status(200).json({
      success: true,
      message: 'Department analytics retrieved successfully',
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Export analytics data
// @route   GET /api/analytics/export
// @access  Private (HR roles)
const exportAnalytics = async (req, res, next) => {
  try {
    const { type, format = 'json', startDate, endDate } = req.query;
    
    let exportData = {};
    
    switch (type) {
      case 'employees':
        exportData = await Employee.find({})
          .populate('department', 'name')
          .select('-__v');
        break;
      case 'attendance':
        let attendanceFilter = {};
        if (startDate || endDate) {
          attendanceFilter.date = {};
          if (startDate) attendanceFilter.date.$gte = new Date(startDate);
          if (endDate) attendanceFilter.date.$lte = new Date(endDate);
        }
        exportData = await Attendance.find(attendanceFilter)
          .populate('employee', 'personalInfo.firstName personalInfo.lastName employeeId')
          .select('-__v');
        break;
      case 'departments':
        exportData = await Department.find({})
          .select('-__v');
        break;
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type'
        });
    }

    if (format === 'csv') {
      // In a real implementation, you would convert to CSV format
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=${type}_export.csv`);
      res.status(200).send('CSV export not implemented yet');
    } else {
      res.status(200).json({
        success: true,
        message: `${type} data exported successfully`,
        exportedAt: new Date(),
        count: Array.isArray(exportData) ? exportData.length : 1,
        data: exportData
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardAnalytics,
  getEmployeeAnalytics,
  getAttendanceAnalytics,
  getDepartmentAnalytics,
  exportAnalytics
};