const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  calculatePayroll,
  getPayrollHistory,
  generatePayslip,
  getPayrollSummary,
  getSalaryStructure
} = require('../controllers/payrollController');

// HR-only routes
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

// Employee and HR routes
router.get('/history', protect, getPayrollHistory);
router.get('/payslip/:employeeId', protect, generatePayslip);
router.get('/salary-structure/:employeeId', protect, getSalaryStructure);

module.exports = router;