const express = require('express');
const router = express.Router();
const {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate
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

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Private
router.delete('/:id', deleteCandidate);

module.exports = router;