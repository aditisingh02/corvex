import React, { useState, useEffect } from "react";
import { payrollService } from "../services/payrollService";
import { employeeService } from "../services/employeeService";

const AddPayroll = ({ onClose, onSuccess, preSelectedEmployee = null }) => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: preSelectedEmployee?._id || '',
    payPeriod: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      start: '',
      end: ''
    },
    salary: {
      basicSalary: preSelectedEmployee?.jobInfo?.salary || 0,
      allowances: {
        hra: 0,
        medical: 0,
        transport: 0,
        foodAllowance: 0,
        otherAllowances: 0
      },
      deductions: {
        tax: 0,
        providentFund: 0,
        insurance: 0,
        loan: 0,
        otherDeductions: 0
      },
      overtime: {
        hours: 0,
        rate: 0
      },
      bonus: {
        performance: 0,
        festival: 0,
        other: 0
      }
    },
    attendance: {
      workingDays: 22,
      presentDays: 22,
      absentDays: 0,
      leavesTaken: 0,
      overtimeHours: 0
    },
    notes: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employeeService.getAllEmployees();
        if (response.success) {
          setEmployees(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Update pay period dates when month/year changes
  useEffect(() => {
    const { month, year } = formData.payPeriod;
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);
      
      setFormData(prev => ({
        ...prev,
        payPeriod: {
          ...prev.payPeriod,
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0]
        }
      }));
    }
  }, [formData.payPeriod.month, formData.payPeriod.year]);

  // Auto-calculate values when basic salary or attendance changes
  useEffect(() => {
    const { basicSalary } = formData.salary;
    const { presentDays, workingDays } = formData.attendance;

    if (basicSalary > 0) {
      // Calculate allowances
      const hra = basicSalary * 0.4; // 40% HRA
      const medical = 2000; // Fixed medical allowance
      const transport = 1500; // Fixed transport allowance
      const foodAllowance = 1000; // Fixed food allowance

      // Calculate deductions
      const tax = basicSalary * 0.1; // 10% tax
      const providentFund = basicSalary * 0.12; // 12% PF
      const insurance = 500; // Fixed insurance

      // Calculate overtime rate
      const overtimeRate = workingDays > 0 ? (basicSalary / (workingDays * 8)) * 1.5 : 0;

      setFormData(prev => ({
        ...prev,
        salary: {
          ...prev.salary,
          allowances: {
            ...prev.salary.allowances,
            hra,
            medical,
            transport,
            foodAllowance
          },
          deductions: {
            ...prev.salary.deductions,
            tax,
            providentFund,
            insurance
          },
          overtime: {
            ...prev.salary.overtime,
            rate: overtimeRate
          }
        },
        attendance: {
          ...prev.attendance,
          absentDays: workingDays - presentDays
        }
      }));
    }
  }, [formData.salary.basicSalary, formData.attendance.presentDays, formData.attendance.workingDays]);

  const handleInputChange = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee is required';
    }

    if (!formData.payPeriod.month || !formData.payPeriod.year) {
      newErrors.payPeriod = 'Pay period is required';
    }

    if (formData.salary.basicSalary <= 0) {
      newErrors.basicSalary = 'Basic salary must be greater than 0';
    }

    if (formData.attendance.presentDays > formData.attendance.workingDays) {
      newErrors.presentDays = 'Present days cannot exceed working days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await payrollService.createPayroll(formData);
      
      if (response.success) {
        onSuccess && onSuccess(response.data);
        onClose && onClose();
      }
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const selectedEmployee = employees.find(emp => emp._id === formData.employeeId) || preSelectedEmployee;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Payroll Record</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee *
              </label>
              <select
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee._id} value={employee._id}>
                    {employee.employeeId} - {employee.personalInfo.firstName} {employee.personalInfo.lastName}
                  </option>
                ))}
              </select>
              {errors.employeeId && <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>}
            </div>

            {/* Pay Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Period *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.payPeriod.month}
                  onChange={(e) => handleInputChange('payPeriod.month', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2024, i).toLocaleDateString('en-US', { month: 'long' })}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={formData.payPeriod.year}
                  onChange={(e) => handleInputChange('payPeriod.year', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="2020"
                  max="2030"
                />
              </div>
              {errors.payPeriod && <p className="text-red-500 text-sm mt-1">{errors.payPeriod}</p>}
            </div>
          </div>

          {/* Employee Info Display */}
          {selectedEmployee && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Employee Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{selectedEmployee.personalInfo.firstName} {selectedEmployee.personalInfo.lastName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Employee ID:</span>
                  <p className="font-medium">{selectedEmployee.employeeId}</p>
                </div>
                <div>
                  <span className="text-gray-600">Department:</span>
                  <p className="font-medium">{selectedEmployee.department?.name || 'N/A'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Current Salary:</span>
                  <p className="font-medium">₹{selectedEmployee.jobInfo?.salary?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Salary Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Basic Salary *
                </label>
                <input
                  type="number"
                  value={formData.salary.basicSalary}
                  onChange={(e) => handleInputChange('salary.basicSalary', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
                {errors.basicSalary && <p className="text-red-500 text-sm mt-1">{errors.basicSalary}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HRA (40%)
                </label>
                <input
                  type="number"
                  value={formData.salary.allowances.hra}
                  onChange={(e) => handleInputChange('salary.allowances.hra', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Allowance
                </label>
                <input
                  type="number"
                  value={formData.salary.allowances.medical}
                  onChange={(e) => handleInputChange('salary.allowances.medical', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transport Allowance
                </label>
                <input
                  type="number"
                  value={formData.salary.allowances.transport}
                  onChange={(e) => handleInputChange('salary.allowances.transport', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax (10%)
                </label>
                <input
                  type="number"
                  value={formData.salary.deductions.tax}
                  onChange={(e) => handleInputChange('salary.deductions.tax', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provident Fund (12%)
                </label>
                <input
                  type="number"
                  value={formData.salary.deductions.providentFund}
                  onChange={(e) => handleInputChange('salary.deductions.providentFund', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Attendance Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working Days
                </label>
                <input
                  type="number"
                  value={formData.attendance.workingDays}
                  onChange={(e) => handleInputChange('attendance.workingDays', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="31"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Present Days
                </label>
                <input
                  type="number"
                  value={formData.attendance.presentDays}
                  onChange={(e) => handleInputChange('attendance.presentDays', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="31"
                />
                {errors.presentDays && <p className="text-red-500 text-sm mt-1">{errors.presentDays}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Leaves Taken
                </label>
                <input
                  type="number"
                  value={formData.attendance.leavesTaken}
                  onChange={(e) => handleInputChange('attendance.leavesTaken', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overtime Hours
                </label>
                <input
                  type="number"
                  value={formData.attendance.overtimeHours}
                  onChange={(e) => handleInputChange('attendance.overtimeHours', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any additional notes or comments..."
            />
          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Payroll'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayroll;