import { apiClient, API_ENDPOINTS } from './api.js';

// Employee Service
export const employeeService = {
  // Get all employees
  async getAllEmployees() {
    try {
      return await apiClient.get(API_ENDPOINTS.EMPLOYEES.BASE);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch employees');
    }
  },

  // Get employee by ID
  async getEmployeeById(id) {
    try {
      return await apiClient.get(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch employee');
    }
  },

  // Create new employee
  async createEmployee(employeeData) {
    try {
      return await apiClient.post(API_ENDPOINTS.EMPLOYEES.BASE, employeeData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create employee');
    }
  },

  // Update employee
  async updateEmployee(id, employeeData) {
    try {
      return await apiClient.put(API_ENDPOINTS.EMPLOYEES.BY_ID(id), employeeData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update employee');
    }
  },

  // Delete employee
  async deleteEmployee(id) {
    try {
      return await apiClient.delete(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
    } catch (error) {
      throw new Error(error.message || 'Failed to delete employee');
    }
  },
};

// Department Service
export const departmentService = {
  // Get all departments
  async getAllDepartments() {
    try {
      return await apiClient.get(API_ENDPOINTS.DEPARTMENTS.BASE);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch departments');
    }
  },

  // Get department by ID
  async getDepartmentById(id) {
    try {
      return await apiClient.get(API_ENDPOINTS.DEPARTMENTS.BY_ID(id));
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department');
    }
  },

  // Create new department
  async createDepartment(departmentData) {
    try {
      return await apiClient.post(API_ENDPOINTS.DEPARTMENTS.BASE, departmentData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create department');
    }
  },

  // Update department
  async updateDepartment(id, departmentData) {
    try {
      return await apiClient.put(API_ENDPOINTS.DEPARTMENTS.BY_ID(id), departmentData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update department');
    }
  },
};

export { employeeService as default };