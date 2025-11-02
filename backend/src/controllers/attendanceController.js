const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// @desc    Clock in
// @route   POST /api/attendance/clock-in
// @access  Private
const clockIn = async (req, res, next) => {
  try {
    const { location, method = 'manual' } = req.body;
    
    // Get employee from user
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already clocked in today
    const existingAttendance = await Attendance.findOne({
      employee: employee._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingAttendance && existingAttendance.checkIn.time) {
      return res.status(400).json({
        success: false,
        message: 'Already clocked in today'
      });
    }

    const attendanceData = {
      employee: employee._id,
      date: new Date(),
      checkIn: {
        time: new Date(),
        location: location || { type: 'Point', coordinates: [0, 0] },
        method
      },
      status: 'present'
    };

    const attendance = await Attendance.create(attendanceData);

    res.status(201).json({
      success: true,
      message: 'Clocked in successfully',
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clock out
// @route   POST /api/attendance/clock-out
// @access  Private
const clockOut = async (req, res, next) => {
  try {
    const { location, method = 'manual' } = req.body;
    
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance record
    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!attendance || !attendance.checkIn.time) {
      return res.status(400).json({
        success: false,
        message: 'No clock-in record found for today'
      });
    }

    if (attendance.checkOut.time) {
      return res.status(400).json({
        success: false,
        message: 'Already clocked out today'
      });
    }

    // Update with clock out information
    attendance.checkOut = {
      time: new Date(),
      location: location || { type: 'Point', coordinates: [0, 0] },
      method
    };

    await attendance.save();

    res.status(200).json({
      success: true,
      message: 'Clocked out successfully',
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add break
// @route   POST /api/attendance/break
// @access  Private
const addBreak = async (req, res, next) => {
  try {
    const { type = 'other', startTime, endTime } = req.body;
    
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!attendance) {
      return res.status(400).json({
        success: false,
        message: 'No attendance record found for today'
      });
    }

    const breakData = {
      startTime: startTime || new Date(),
      endTime: endTime || null,
      type,
      duration: endTime ? Math.round((new Date(endTime) - new Date(startTime)) / 60000) : 0
    };

    attendance.breaks.push(breakData);
    await attendance.save();

    res.status(200).json({
      success: true,
      message: 'Break added successfully',
      data: attendance
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance records
// @route   GET /api/attendance
// @access  Private
const getAttendance = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      employeeId,
      startDate,
      endDate,
      status
    } = req.query;

    // Build filter
    let filter = {};
    
    // If not admin/hr, only show own attendance
    if (!['super_admin', 'hr_manager', 'hr_coordinator'].includes(req.user.role)) {
      const employee = await Employee.findOne({ user: req.user.id });
      if (employee) {
        filter.employee = employee._id;
      }
    } else if (employeeId) {
      filter.employee = employeeId;
    }

    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;
    
    const attendance = await Attendance.find(filter)
      .populate({
        path: 'employee',
        select: 'personalInfo employeeId jobInfo status user',
        populate: [
          {
            path: 'jobInfo.department',
            select: 'name'
          },
          {
            path: 'user',
            select: 'email'
          }
        ]
      })
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Transform the data to match frontend expectations
    const transformedAttendance = attendance.map(record => ({
      _id: record._id,
      employee: {
        _id: record.employee._id,
        firstName: record.employee.personalInfo.firstName,
        lastName: record.employee.personalInfo.lastName,
        email: record.employee.user?.email || 'N/A',
        employeeId: record.employee.employeeId,
        jobTitle: record.employee.jobInfo.position,
        department: record.employee.jobInfo.department?.name || 'N/A'
      },
      date: record.date,
      checkIn: record.checkIn.time,
      checkOut: record.checkOut.time,
      status: record.status,
      workingHours: record.workingHours,
      totalHours: record.workingHours ? `${Math.floor(record.workingHours)}h ${Math.round((record.workingHours % 1) * 60)}m` : '--',
      breaks: record.breaks,
      lateArrival: record.lateArrival,
      earlyDeparture: record.earlyDeparture,
      remarks: record.remarks
    }));

    const total = await Attendance.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: transformedAttendance.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: transformedAttendance
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's attendance status
// @route   GET /api/attendance/today
// @access  Private
const getTodayAttendance = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    console.log('Fetching today\'s attendance for employee:', employee.employeeId);
    console.log('Date range:', today, 'to', tomorrow);

    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: {
        $gte: today,
        $lt: tomorrow
      }
    }).sort({ updatedAt: -1 }); // Get the most recently updated record

    console.log('Found attendance record:', attendance);

    let transformedData = null;
    if (attendance) {
      transformedData = {
        _id: attendance._id,
        checkIn: attendance.checkIn.time,
        checkOut: attendance.checkOut.time,
        status: attendance.status,
        workingHours: attendance.workingHours,
        breaks: attendance.breaks,
        date: attendance.date,
        isManualEntry: attendance.isManualEntry
      };
    }

    res.status(200).json({
      success: true,
      data: transformedData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get attendance summary
// @route   GET /api/attendance/summary
// @access  Private (HR roles and managers)
const getAttendanceSummary = async (req, res, next) => {
  try {
    const { startDate, endDate, employeeId } = req.query;
    
    let matchFilter = {};
    
    if (employeeId) {
      matchFilter.employee = employeeId;
    }
    
    if (startDate || endDate) {
      matchFilter.date = {};
      if (startDate) matchFilter.date.$gte = new Date(startDate);
      if (endDate) matchFilter.date.$lte = new Date(endDate);
    }

    const summary = await Attendance.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$employee',
          totalDays: { $sum: 1 },
          presentDays: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
          },
          absentDays: {
            $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] }
          },
          lateDays: {
            $sum: { $cond: ['$lateArrival', 1, 0] }
          },
          totalWorkingHours: { $sum: '$workingHours' },
          totalOvertime: { $sum: '$overtime' }
        }
      },
      {
        $lookup: {
          from: 'employees',
          localField: '_id',
          foreignField: '_id',
          as: 'employee'
        }
      },
      {
        $unwind: '$employee'
      },
      {
        $project: {
          employee: '$employee',
          totalDays: 1,
          presentDays: 1,
          absentDays: 1,
          lateDays: 1,
          totalWorkingHours: 1,
          totalOvertime: 1,
          attendanceRate: {
            $multiply: [
              { $divide: ['$presentDays', '$totalDays'] },
              100
            ]
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Manual attendance entry
// @route   POST /api/attendance/manual
// @access  Private
const manualAttendance = async (req, res, next) => {
  try {
    const { date, action, timestamp, reason, remarks } = req.body;
    
    console.log('Manual attendance request received:', {
      date, action, timestamp, reason, remarks
    });
    
    // Get employee from user
    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    console.log('Employee found:', employee.employeeId);

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    // Find or create attendance record for the date
    let attendance = await Attendance.findOne({
      employee: employee._id,
      date: {
        $gte: attendanceDate,
        $lt: new Date(attendanceDate.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    console.log('Existing attendance record:', attendance);

    const timestampDate = new Date(timestamp);

    if (!attendance) {
      // Create new attendance record
      const attendanceData = {
        employee: employee._id,
        date: attendanceDate,
        status: 'present',
        isManualEntry: true,
        remarks: `Manual entry: ${reason}. ${remarks || ''}`.trim()
      };

      if (action === 'checkIn') {
        attendanceData.checkIn = {
          time: timestampDate,
          location: { type: 'Point', coordinates: [0, 0] },
          method: 'manual'
        };
      } else if (action === 'checkOut') {
        attendanceData.checkOut = {
          time: timestampDate,
          location: { type: 'Point', coordinates: [0, 0] },
          method: 'manual'
        };
      }

      attendance = await Attendance.create(attendanceData);
      console.log('Created new attendance record:', attendance);
    } else {
      // Update existing attendance record
      if (action === 'checkIn') {
        attendance.checkIn = {
          time: timestampDate,
          location: { type: 'Point', coordinates: [0, 0] },
          method: 'manual'
        };
      } else if (action === 'checkOut') {
        attendance.checkOut = {
          time: timestampDate,
          location: { type: 'Point', coordinates: [0, 0] },
          method: 'manual'
        };
      }

      attendance.isManualEntry = true;
      attendance.remarks = `Manual entry: ${reason}. ${remarks || ''}`.trim();
      await attendance.save();
      console.log('Updated existing attendance record:', attendance);
    }

    res.status(200).json({
      success: true,
      message: `Manual ${action} recorded successfully`,
      data: attendance
    });
  } catch (error) {
    console.error('Manual attendance error:', error);
    next(error);
  }
};

module.exports = {
  clockIn,
  clockOut,
  addBreak,
  getAttendance,
  getTodayAttendance,
  getAttendanceSummary,
  manualAttendance
};