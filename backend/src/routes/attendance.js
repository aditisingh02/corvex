const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  clockIn,
  clockOut,
  addBreak,
  getAttendance,
  getTodayAttendance,
  getAttendanceSummary
} = require('../controllers/attendanceController');

// Employee routes
router.post('/clock-in', protect, clockIn);
router.post('/clock-out', protect, clockOut);
router.post('/break', protect, addBreak);
router.get('/today', protect, getTodayAttendance);

// General attendance routes
router.get('/', protect, getAttendance);

// HR and Manager routes
router.get('/summary', 
  protect, 
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'),
  getAttendanceSummary
);

module.exports = router;