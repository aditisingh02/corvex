const express = require('express');
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes (none for employees)

// Protected routes
router.use(protect); // All routes require authentication

// Statistics route (must come before /:id route)
router.get('/stats', 
  authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'), 
  getEmployeeStats
);

// CRUD routes
router.route('/')
  .get(authorize('super_admin', 'hr_manager', 'hr_coordinator', 'manager'), getEmployees)
  .post(authorize('super_admin', 'hr_manager', 'hr_coordinator'), createEmployee);

router.route('/:id')
  .get(getEmployee) // Any authenticated user can view (with restrictions in controller)
  .put(authorize('super_admin', 'hr_manager', 'hr_coordinator'), updateEmployee)
  .delete(authorize('super_admin', 'hr_manager'), deleteEmployee);

module.exports = router;