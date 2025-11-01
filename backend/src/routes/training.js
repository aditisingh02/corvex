const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  createTrainingProgram,
  getTrainingPrograms,
  enrollInProgram,
  updateTrainingProgress,
  getTrainingHistory,
  createTrainingAssessment,
  submitAssessment,
  getTrainingAnalytics,
  issueCertificate
} = require('../controllers/trainingController');

// Employee routes
router.get('/programs', protect, getTrainingPrograms);
router.post('/enroll/:programId', protect, enrollInProgram);
router.put('/progress/:enrollmentId', protect, updateTrainingProgress);
router.get('/history/:employeeId', protect, getTrainingHistory);
router.post('/assessments/:assessmentId/submit', protect, submitAssessment);

// HR and Manager routes
router.post('/programs',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  createTrainingProgram
);

router.post('/assessments',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  createTrainingAssessment
);

router.post('/certificates',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  issueCertificate
);

router.get('/analytics',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'),
  getTrainingAnalytics
);

module.exports = router;