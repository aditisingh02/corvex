const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  submitLeaveRequest,
  getLeaveRequests,
  getLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
  getLeaveBalance,
  getLeaveStats
} = require('../controllers/leaveController');

// Employee routes
router.post('/', protect, submitLeaveRequest);
router.get('/balance', protect, getLeaveBalance);

// General leave routes
router.get('/', protect, getLeaveRequests);
router.get('/:id', protect, getLeaveRequest);
router.put('/:id', protect, updateLeaveRequest);
router.delete('/:id', protect, deleteLeaveRequest);

// HR and Manager routes
router.get('/stats/overview',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'),
  getLeaveStats
);

module.exports = router;