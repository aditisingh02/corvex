const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  // Interview operations
  scheduleInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  rescheduleInterview,
  cancelInterview,
  addInterviewFeedback,
  getInterviewStatistics,
  getAvailableInterviewers
} = require('../controllers/interviewController');

// Interview routes
router.get('/statistics', protect, getInterviewStatistics);
router.get('/available-interviewers', protect, getAvailableInterviewers);
router.post('/', protect, scheduleInterview);
router.get('/', protect, getAllInterviews);
router.get('/:id', protect, getInterviewById);
router.put('/:id', protect, updateInterview);
router.put('/:id/reschedule', protect, rescheduleInterview);
router.put('/:id/cancel', protect, cancelInterview);
router.post('/:id/feedback', protect, addInterviewFeedback);

module.exports = router;