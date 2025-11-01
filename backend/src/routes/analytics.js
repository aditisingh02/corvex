const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboardAnalytics,
  getEmployeeAnalytics,
  getAttendanceAnalytics,
  getDepartmentAnalytics,
  exportAnalytics
} = require('../controllers/analyticsController');

// All analytics routes require HR roles or manager access
router.use(protect);
router.use(authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'));

// Analytics routes
router.get('/dashboard', getDashboardAnalytics);
router.get('/employees', getEmployeeAnalytics);
router.get('/attendance', getAttendanceAnalytics);
router.get('/departments', getDepartmentAnalytics);

// Export functionality (HR only)
router.get('/export',
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  exportAnalytics
);

module.exports = router;