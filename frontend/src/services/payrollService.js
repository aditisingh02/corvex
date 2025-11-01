import { apiClient } from './api.js';

class PayrollService {
  // Calculate payroll for employee
  async calculatePayroll(payrollData) {
    try {
      return await apiClient.post('/payroll/calculate', payrollData);
    } catch (error) {
      throw new Error(error.message || 'Failed to calculate payroll');
    }
  }

  // Get payroll history
  async getPayrollHistory(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/payroll/history?${queryString}` : '/payroll/history';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch payroll history');
    }
  }

  // Generate payslip
  async generatePayslip(employeeId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/payroll/payslip/${employeeId}?${queryString}` : `/payroll/payslip/${employeeId}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to generate payslip');
    }
  }

  // Get payroll summary
  async getPayrollSummary(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/payroll/summary?${queryString}` : '/payroll/summary';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch payroll summary');
    }
  }

  // Get salary structure
  async getSalaryStructure(employeeId) {
    try {
      return await apiClient.get(`/payroll/salary-structure/${employeeId}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch salary structure');
    }
  }

  // Get my payslip
  async getMyPayslip(period = null) {
    try {
      // This would typically require getting current user's employee ID first
      // For now, we'll assume the backend handles this
      const params = period ? { payPeriodStart: period.start, payPeriodEnd: period.end } : {};
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/payroll/payslip/me?${queryString}` : '/payroll/payslip/me';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch your payslip');
    }
  }

  // Get my salary structure
  async getMySalaryStructure() {
    try {
      return await apiClient.get('/payroll/salary-structure/me');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch your salary structure');
    }
  }

  // Calculate net salary
  calculateNetSalary(grossSalary, deductions = {}) {
    const totalDeductions = Object.values(deductions).reduce((sum, deduction) => sum + (deduction || 0), 0);
    return Math.max(0, grossSalary - totalDeductions);
  }

  // Calculate tax (simplified)
  calculateTax(grossSalary, taxRate = 0.12) {
    return grossSalary * taxRate;
  }

  // Format currency
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  // Get pay periods for current year
  getPayPeriods(year = new Date().getFullYear()) {
    const periods = [];
    for (let month = 0; month < 12; month++) {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      periods.push({
        id: `${year}-${String(month + 1).padStart(2, '0')}`,
        label: start.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0]
      });
    }
    return periods;
  }

  // Get current pay period
  getCurrentPayPeriod() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    
    return {
      id: `${year}-${String(month + 1).padStart(2, '0')}`,
      label: start.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  }

  // Validate payroll calculation data
  validatePayrollData(data) {
    const errors = [];
    
    if (!data.employeeId) {
      errors.push('Employee ID is required');
    }
    
    if (!data.payPeriodStart || !data.payPeriodEnd) {
      errors.push('Pay period dates are required');
    }
    
    if (data.payPeriodStart && data.payPeriodEnd) {
      const start = new Date(data.payPeriodStart);
      const end = new Date(data.payPeriodEnd);
      if (start >= end) {
        errors.push('Pay period start date must be before end date');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const payrollService = new PayrollService();
export default payrollService;