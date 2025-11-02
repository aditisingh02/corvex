const express = require('express');
const router = express.Router();
const {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  advanceCandidateStage,
  rejectCandidate,
  hireCandidate
} = require('../controllers/interviewController');
const { protect } = require('../middleware/auth');

// All routes are protected - require authentication
router.use(protect);

// @desc    Get all candidates with filtering and pagination
// @route   GET /api/candidates
// @access  Private
router.get('/', getAllCandidates);

// @desc    Get single candidate by ID
// @route   GET /api/candidates/:id
// @access  Private
router.get('/:id', getCandidateById);

// @desc    Create new candidate
// @route   POST /api/candidates
// @access  Private
router.post('/', createCandidate);

// @desc    Update candidate
// @route   PUT /api/candidates/:id
// @access  Private
router.put('/:id', updateCandidate);

// @desc    Advance candidate stage
// @route   PUT /api/candidates/:id/advance
// @access  Private
router.put('/:id/advance', advanceCandidateStage);

// @desc    Reject candidate
// @route   PUT /api/candidates/:id/reject
// @access  Private
router.put('/:id/reject', rejectCandidate);

// @desc    Hire candidate
// @route   PUT /api/candidates/:id/hire
// @access  Private
router.put('/:id/hire', hireCandidate);

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Private
router.delete('/:id', deleteCandidate);

module.exports = router;