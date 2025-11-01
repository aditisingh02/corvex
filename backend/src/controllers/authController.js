const User = require('../models/User');
const Employee = require('../models/Employee');
const { sendTokenResponse, generateRandomToken, hashToken } = require('../utils/auth');
const { validationResult } = require('express-validator');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password, role, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Validate role permissions for registration
    const allowedRoles = ['employee', 'recruiter']; // Public registration only for these roles
    const selectedRole = role && allowedRoles.includes(role) ? role : 'employee';

    // Create user
    const user = await User.create({
      email,
      password,
      role: selectedRole,
      isActive: true,
      isEmailVerified: false
    });

    // Create basic employee profile if firstName and lastName provided
    if (firstName && lastName) {
      await Employee.create({
        user: user._id,
        employeeId: `EMP${Date.now()}`,
        personalInfo: {
          firstName,
          lastName,
          email
        },
        jobInfo: {
          position: selectedRole === 'recruiter' ? 'Recruiter' : 'Employee',
          level: 'entry',
          employmentType: 'full_time',
          startDate: new Date()
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please contact HR to complete your profile.',
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified
      },
      token: user.getSignedJwtToken()
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(423).json({
        success: false,
        message: 'Account is locked due to multiple failed login attempts. Please try again later.'
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      await user.incLoginAttempts();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await User.findByIdAndUpdate(user._id, {
        $unset: { loginAttempts: 1, lockUntil: 1 }
      });
    }

    // Update last login
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    // If user has employee profile, get it too
    let employee = null;
    if (user.role !== 'super_admin') {
      employee = await Employee.findOne({ user: user._id })
        .populate('jobInfo.department')
        .populate('jobInfo.manager', 'personalInfo.firstName personalInfo.lastName');
    }

    res.status(200).json({
      success: true,
      user,
      employee
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
const updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There is no user with that email'
      });
    }

    // Get reset token
    const resetToken = generateRandomToken();

    // Hash token and set to resetPasswordToken field
    user.passwordResetToken = hashToken(resetToken);
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

    // TODO: Send email with reset link
    // For now, just return the token in development
    if (process.env.NODE_ENV === 'development') {
      return res.status(200).json({
        success: true,
        message: 'Reset token generated',
        resetToken,
        resetUrl
      });
    }

    res.status(200).json({
      success: true,
      message: 'Email sent'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = hashToken(req.params.resettoken);

    const user = await User.findOne({
      passwordResetToken: resetPasswordToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Set new password
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

module.exports = {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout
};