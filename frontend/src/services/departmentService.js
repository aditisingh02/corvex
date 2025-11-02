import { apiClient } from './api.js';

class DepartmentService {
  // Get all departments
  async getDepartments(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/departments?${queryString}` : '/departments';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch departments');
    }
  }

  // Alias for getDepartments
  async getAllDepartments(params = {}) {
    return this.getDepartments(params);
  }

  // Get single department
  async getDepartment(id) {
    try {
      return await apiClient.get(`/departments/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department');
    }
  }

  // Create department
  async createDepartment(departmentData) {
    try {
      return await apiClient.post('/departments', departmentData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create department');
    }
  }

  // Update department
  async updateDepartment(id, updateData) {
    try {
      return await apiClient.put(`/departments/${id}`, updateData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update department');
    }
  }

  // Delete department
  async deleteDepartment(id) {
    try {
      return await apiClient.delete(`/departments/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete department');
    }
  }

  // Get department statistics
  async getDepartmentStats(id) {
    try {
      return await apiClient.get(`/departments/${id}/stats`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department statistics');
    }
  }

  // Get department employees
  async getDepartmentEmployees(id, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/departments/${id}/employees?${queryString}` : `/departments/${id}/employees`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department employees');
    }
  }

  // Search departments
  async searchDepartments(query) {
    try {
      return await this.getDepartments({ search: query });
    } catch (error) {
      throw new Error(error.message || 'Failed to search departments');
    }
  }

  // Get department budget information
  async getDepartmentBudget(id) {
    try {
      return await apiClient.get(`/departments/${id}/budget`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department budget');
    }
  }

  // Update department budget
  async updateDepartmentBudget(id, budgetData) {
    try {
      return await apiClient.put(`/departments/${id}/budget`, budgetData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update department budget');
    }
  }

  // Get departments for dropdown/select
  async getDepartmentOptions() {
    try {
      const response = await this.getDepartments();
      if (response.success && response.data) {
        return response.data.map(dept => ({
          value: dept._id,
          label: dept.name,
          budget: dept.budget,
          employeeCount: dept.employeeCount || 0
        }));
      }
      return [];
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department options');
    }
  }

  // Validate department data
  validateDepartmentData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push('Department name is required');
    }
    
    if (data.name && data.name.length < 2) {
      errors.push('Department name must be at least 2 characters');
    }
    
    if (data.budget && (isNaN(data.budget) || data.budget < 0)) {
      errors.push('Budget must be a valid positive number');
    }
    
    if (data.location && data.location.trim() === '') {
      errors.push('Location cannot be empty if provided');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Calculate budget utilization
  calculateBudgetUtilization(totalSalaryExpense, budget) {
    if (!budget || budget === 0) return 0;
    return Math.round((totalSalaryExpense / budget) * 100);
  }

  // Get budget status
  getBudgetStatus(utilization) {
    if (utilization >= 100) return { status: 'over', color: '#ef4444', label: 'Over Budget' };
    if (utilization >= 90) return { status: 'high', color: '#f59e0b', label: 'High Usage' };
    if (utilization >= 70) return { status: 'medium', color: '#3b82f6', label: 'Moderate Usage' };
    return { status: 'low', color: '#10b981', label: 'Low Usage' };
  }

  // Format budget display
  formatBudget(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Get department hierarchy
  async getDepartmentHierarchy() {
    try {
      const response = await this.getDepartments();
      if (response.success && response.data) {
        // Group departments by parent or create flat structure
        return this.buildHierarchy(response.data);
      }
      return [];
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department hierarchy');
    }
  }

  // Build hierarchy structure (helper method)
  buildHierarchy(departments) {
    // Simple flat structure for now
    // In a real implementation, you might have parent-child relationships
    return departments.map(dept => ({
      id: dept._id,
      name: dept.name,
      level: 0,
      children: []
    }));
  }

  // Get department performance metrics
  async getDepartmentPerformance(id, period = 'month') {
    try {
      const params = { period };
      const queryString = new URLSearchParams(params).toString();
      return await apiClient.get(`/departments/${id}/performance?${queryString}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department performance');
    }
  }

  // Compare departments
  async compareDepartments(departmentIds, metrics = ['employees', 'budget', 'performance']) {
    try {
      const data = { departmentIds, metrics };
      return await apiClient.post('/departments/compare', data);
    } catch (error) {
      throw new Error(error.message || 'Failed to compare departments');
    }
  }

  // Get department cost analysis
  async getDepartmentCostAnalysis(id, startDate, endDate) {
    try {
      const params = { startDate, endDate };
      const queryString = new URLSearchParams(params).toString();
      return await apiClient.get(`/departments/${id}/cost-analysis?${queryString}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch cost analysis');
    }
  }

  // Get default department data structure
  getDefaultDepartmentData() {
    return {
      name: '',
      description: '',
      headOfDepartment: '',
      location: '',
      budget: 0,
      isActive: true,
      contactInfo: {
        email: '',
        phone: '',
        extension: ''
      },
      establishedDate: new Date().toISOString().split('T')[0]
    };
  }

  // Export department data
  async exportDepartmentData(format = 'csv', departmentIds = []) {
    try {
      const params = { format };
      if (departmentIds.length > 0) {
        params.departments = departmentIds.join(',');
      }
      const queryString = new URLSearchParams(params).toString();
      return await apiClient.get(`/departments/export?${queryString}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to export department data');
    }
  }
}

export const departmentService = new DepartmentService();
export default departmentService;