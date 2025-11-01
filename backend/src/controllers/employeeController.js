const Employee = require('../models/Employee');
const User = require('../models/User');
const Department = require('../models/Department');

// @desc    Get all employees with filtering and pagination
// @route   GET /api/employees
// @access  Private (HR roles and managers)
const getEmployees = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      department,
      status = 'active',
      search,
      role,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { status };
    
    if (department) {
      filter['jobInfo.department'] = department;
    }
    
    if (role) {
      // Get users with specific role first
      const usersWithRole = await User.find({ role }).select('_id');
      filter.user = { $in: usersWithRole.map(u => u._id) };
    }

    // Build search query
    let query = Employee.find(filter);

    if (search) {
      query = query.or([
        { 'personalInfo.firstName': { $regex: search, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: search, $options: 'i' } },
        { employeeId: { $regex: search, $options: 'i' } },
        { 'jobInfo.position': { $regex: search, $options: 'i' } }
      ]);
    }

    // Apply sorting
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'desc' ? -1 : 1;
    query = query.sort(sortObj);

    // Apply pagination
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(parseInt(limit));

    // Populate related data
    query = query
      .populate('user', 'email role isActive lastLogin')
      .populate('jobInfo.department', 'name code')
      .populate('jobInfo.manager', 'personalInfo.firstName personalInfo.lastName employeeId');

    const employees = await query;
    const total = await Employee.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: employees.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Private
const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('user', 'email role isActive lastLogin createdAt')
      .populate('jobInfo.department', 'name code description')
      .populate('jobInfo.manager', 'personalInfo.firstName personalInfo.lastName employeeId jobInfo.position');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if user can access this employee data
    const canAccess = req.user.role === 'super_admin' ||
      req.user.role === 'hr_manager' ||
      req.user.role === 'hr_coordinator' ||
      employee.user._id.toString() === req.user.id ||
      (req.user.role === 'manager' && employee.jobInfo.manager?.toString() === req.user.id);

    if (!canAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this employee data'
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private (HR roles only)
const createEmployee = async (req, res, next) => {
  try {
    const { userInfo, ...employeeData } = req.body;

    // Create user account first
    const user = await User.create({
      email: userInfo.email,
      password: userInfo.password || 'TempPassword123!',
      role: userInfo.role || 'employee'
    });

    // Create employee profile
    const employee = await Employee.create({
      user: user._id,
      ...employeeData
    });

    // Populate the response
    const populatedEmployee = await Employee.findById(employee._id)
      .populate('user', 'email role')
      .populate('jobInfo.department', 'name code')
      .populate('jobInfo.manager', 'personalInfo.firstName personalInfo.lastName');

    res.status(201).json({
      success: true,
      data: populatedEmployee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private (HR roles only)
const updateEmployee = async (req, res, next) => {
  try {
    const { userInfo, ...employeeData } = req.body;

    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Update user info if provided
    if (userInfo) {
      await User.findByIdAndUpdate(employee.user, userInfo, {
        new: true,
        runValidators: true
      });
    }

    // Update employee data
    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      employeeData,
      {
        new: true,
        runValidators: true
      }
    ).populate('user', 'email role')
     .populate('jobInfo.department', 'name code')
     .populate('jobInfo.manager', 'personalInfo.firstName personalInfo.lastName');

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete/Deactivate employee
// @route   DELETE /api/employees/:id
// @access  Private (HR Manager and Super Admin only)
const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Soft delete - update status and deactivate user
    await Employee.findByIdAndUpdate(req.params.id, {
      status: 'terminated',
      terminationDate: new Date(),
      terminationReason: req.body.reason || 'Administrative termination'
    });

    await User.findByIdAndUpdate(employee.user, { isActive: false });

    res.status(200).json({
      success: true,
      message: 'Employee deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employee statistics
// @route   GET /api/employees/stats
// @access  Private (HR roles and managers)
const getEmployeeStats = async (req, res, next) => {
  try {
    const stats = await Employee.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const departmentStats = await Employee.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'jobInfo.department',
          foreignField: '_id',
          as: 'department'
        }
      },
      {
        $unwind: '$department'
      },
      {
        $group: {
          _id: '$department.name',
          count: { $sum: 1 }
        }
      }
    ]);

    const roleStats = await Employee.aggregate([
      {
        $match: { status: 'active' }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $group: {
          _id: '$user.role',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        status: stats,
        departments: departmentStats,
        roles: roleStats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
};