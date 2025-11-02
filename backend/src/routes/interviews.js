const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  // Candidate operations
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  
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

// Candidate routes
router.post('/candidates', protect, createCandidate);
router.get('/candidates', protect, getAllCandidates);
router.get('/candidates/:id', protect, getCandidateById);
router.put('/candidates/:id', protect, updateCandidate);
router.delete('/candidates/:id', protect, deleteCandidate);

// Interview routes
router.get('/interviews/statistics', protect, getInterviewStatistics);
router.get('/interviews/available-interviewers', protect, getAvailableInterviewers);
router.post('/interviews', protect, scheduleInterview);
router.get('/interviews', protect, getAllInterviews);
router.get('/interviews/:id', protect, getInterviewById);
router.put('/interviews/:id', protect, updateInterview);
router.put('/interviews/:id/reschedule', protect, rescheduleInterview);
router.put('/interviews/:id/cancel', protect, cancelInterview);
router.post('/interviews/:id/feedback', protect, addInterviewFeedback);

module.exports = router;