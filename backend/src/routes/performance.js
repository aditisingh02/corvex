const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createPerformanceReview,
  getPerformanceReviews,
  updatePerformanceReview,
  setPerformanceGoals,
  updateGoalProgress,
  getPerformanceAnalytics,
  getEmployeePerformanceDashboard,
  submitSelfAssessment
} = require('../controllers/performanceController');

// Employee routes
router.post('/self-assessment', protect, submitSelfAssessment);
router.put('/goals/:goalId', protect, updateGoalProgress);
router.get('/dashboard/:employeeId', protect, getEmployeePerformanceDashboard);

// General performance routes
router.get('/reviews', protect, getPerformanceReviews);

// HR and Manager routes
router.post('/reviews',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'),
  createPerformanceReview
);

router.put('/reviews/:id',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'),
  updatePerformanceReview
);

router.post('/goals',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'),
  setPerformanceGoals
);

router.get('/analytics',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'),
  getPerformanceAnalytics
);

module.exports = router;