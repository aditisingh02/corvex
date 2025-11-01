const express = require('express');
const Department = require('../models/Department');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const departments = await Department.find({ isActive: true })
      .populate('manager', 'personalInfo.firstName personalInfo.lastName');

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('manager', 'personalInfo.firstName personalInfo.lastName');

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new department
// @route   POST /api/departments
// @access  Private (HR roles only)
router.post('/', protect, authorize('super_admin', 'hr_manager'), async (req, res, next) => {
  try {
    const department = await Department.create(req.body);

    res.status(201).json({
      success: true,
      data: department
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;