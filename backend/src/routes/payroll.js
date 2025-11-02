const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllPayrolls,
  createPayroll,
  getPayroll,
  updatePayroll,
  deletePayroll,
  approvePayroll,
  markAsPaid,
  generatePayslip,
  getPayrollSummary,
  calculatePayroll
} = require('../controllers/payrollController');

// HR-only routes
router.get('/',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  getAllPayrolls
);

router.post('/',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  createPayroll
);

router.post('/calculate',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  calculatePayroll
);

router.get('/summary',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  getPayrollSummary
);

router.get('/:id',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  getPayroll
);

router.put('/:id',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  updatePayroll
);

router.delete('/:id',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  deletePayroll
);

router.put('/:id/approve',
  protect,
  authorize('super_admin', 'hr_manager'),
  approvePayroll
);

router.put('/:id/pay',
  protect,
  authorize('super_admin', 'hr_manager', 'hr_coordinator'),
  markAsPaid
);

// Employee and HR routes
router.get('/:id/payslip', protect, generatePayslip);

module.exports = router;