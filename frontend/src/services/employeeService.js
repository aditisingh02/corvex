import { apiClient, API_ENDPOINTS } from './api.js';

// Employee Service
export const employeeService = {
  // Get all employees with enhanced filtering and pagination
  async getAllEmployees(params = {}) {
    try {
      // Clean up params to avoid undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([key, value]) => value !== undefined && value !== '' && value !== null)
      );
      
      const queryString = new URLSearchParams(cleanParams).toString();
      const endpoint = queryString ? `${API_ENDPOINTS.EMPLOYEES.BASE}?${queryString}` : API_ENDPOINTS.EMPLOYEES.BASE;
      
      const response = await apiClient.get(endpoint);
      
      // Ensure we return a consistent structure
      return {
        success: response.success || true,
        data: response.data || [],
        count: response.count || 0,
        total: response.total || 0,
        page: response.page || 1,
        pages: response.pages || 1,
        message: response.message
      };
    } catch (error) {
      console.error('Employee service - getAllEmployees error:', error);
      throw new Error(error.message || 'Failed to fetch employees');
    }
  },

  // Get employee by ID with full population
  async getEmployeeById(id) {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
      
      return {
        success: response.success || true,
        data: response.data,
        message: response.message
      };
    } catch (error) {
      console.error('Employee service - getEmployeeById error:', error);
      throw new Error(error.message || 'Failed to fetch employee');
    }
  },

  // Create new employee with proper error handling
  async createEmployee(employeeData) {
    try {
      // Log the data being sent for debugging
      console.log('Creating employee with data:', employeeData);
      
      const response = await apiClient.post(API_ENDPOINTS.EMPLOYEES.BASE, employeeData);
      
      return {
        success: response.success || true,
        data: response.data,
        message: response.message || 'Employee created successfully'
      };
    } catch (error) {
      console.error('Employee service - createEmployee error:', error);
      
      // Extract more specific error messages from the backend
      let errorMessage = 'Failed to create employee';
      
      if (error.message) {
        // Handle specific duplicate field errors
        if (error.message.includes('Duplicate field value entered') || error.message.includes('duplicate key error')) {
          if (error.message.includes('email')) {
            errorMessage = 'An employee with this email address already exists. Please use a different email.';
          } else {
            errorMessage = 'A record with these details already exists. Please check the email address.';
          }
        } else {
          errorMessage = error.message;
        }
      } else if (error.response?.data?.message) {
        const backendMessage = error.response.data.message;
        if (backendMessage.includes('duplicate') || backendMessage.includes('E11000')) {
          if (backendMessage.includes('email')) {
            errorMessage = 'An employee with this email address already exists. Please use a different email.';
          } else {
            errorMessage = 'A record with these details already exists. Please check your input.';
          }
        } else {
          errorMessage = backendMessage;
        }
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      throw new Error(errorMessage);
    }
  },

  // Update employee with enhanced data handling
  async updateEmployee(id, employeeData) {
    try {
      console.log('Updating employee:', id, 'with data:', employeeData);
      
      const response = await apiClient.put(API_ENDPOINTS.EMPLOYEES.BY_ID(id), employeeData);
      
      return {
        success: response.success || true,
        data: response.data,
        message: response.message || 'Employee updated successfully'
      };
    } catch (error) {
      console.error('Employee service - updateEmployee error:', error);
      throw new Error(error.message || 'Failed to update employee');
    }
  },

  // Delete/deactivate employee
  async deleteEmployee(id) {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.EMPLOYEES.BY_ID(id));
      
      return {
        success: response.success || true,
        data: response.data,
        message: response.message || 'Employee deleted successfully'
      };
    } catch (error) {
      console.error('Employee service - deleteEmployee error:', error);
      throw new Error(error.message || 'Failed to delete employee');
    }
  },

  // Get employee statistics
  async getEmployeeStats() {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.EMPLOYEES.BASE}/stats`);
      
      return {
        success: response.success || true,
        data: response.data,
        message: response.message
      };
    } catch (error) {
      console.error('Employee service - getEmployeeStats error:', error);
      throw new Error(error.message || 'Failed to fetch employee statistics');
    }
  },

  // Search employees
  async searchEmployees(query, filters = {}) {
    try {
      const searchParams = {
        search: query,
        ...filters
      };
      
      return await this.getAllEmployees(searchParams);
    } catch (error) {
      console.error('Employee service - searchEmployees error:', error);
      throw new Error(error.message || 'Failed to search employees');
    }
  },

  // Get employees by department
  async getEmployeesByDepartment(departmentId, params = {}) {
    try {
      const departmentParams = {
        department: departmentId,
        ...params
      };
      
      return await this.getAllEmployees(departmentParams);
    } catch (error) {
      console.error('Employee service - getEmployeesByDepartment error:', error);
      throw new Error(error.message || 'Failed to fetch employees by department');
    }
  },

  // Get employees by status
  async getEmployeesByStatus(status, params = {}) {
    try {
      const statusParams = {
        status: status,
        ...params
      };
      
      return await this.getAllEmployees(statusParams);
    } catch (error) {
      console.error('Employee service - getEmployeesByStatus error:', error);
      throw new Error(error.message || 'Failed to fetch employees by status');
    }
  },

  // Helper method to format employee data for display
  formatEmployeeForDisplay(employee) {
    if (!employee) return null;
    
    return {
      ...employee,
      fullName: `${employee.personalInfo?.firstName || ''} ${employee.personalInfo?.lastName || ''}`.trim(),
      displayEmail: employee.user?.email || employee.personalInfo?.email || 'N/A',
      displayPhone: employee.personalInfo?.phone || 'N/A',
      displayDepartment: employee.jobInfo?.department?.name || 'N/A',
      displayPosition: employee.jobInfo?.position || 'N/A',
      displaySalary: employee.compensation?.salary?.amount || 0,
      displayJoinDate: employee.jobInfo?.hireDate ? new Date(employee.jobInfo.hireDate).toLocaleDateString() : 'N/A',
      displayStatus: employee.status || 'active'
    };
  },

  // Validate employee data before sending to backend
  validateEmployeeData(employeeData) {
    const errors = [];
    
    // Check required personal info
    if (!employeeData.personalInfo?.firstName) {
      errors.push('First name is required');
    }
    if (!employeeData.personalInfo?.lastName) {
      errors.push('Last name is required');
    }
    if (!employeeData.personalInfo?.phone) {
      errors.push('Phone number is required');
    }
    if (!employeeData.personalInfo?.dateOfBirth) {
      errors.push('Date of birth is required');
    }
    if (!employeeData.personalInfo?.gender) {
      errors.push('Gender is required');
    }
    if (!employeeData.personalInfo?.nationality) {
      errors.push('Nationality is required');
    }
    
    // Check required job info
    if (!employeeData.jobInfo?.department) {
      errors.push('Department is required');
    }
    if (!employeeData.jobInfo?.position) {
      errors.push('Position is required');
    }
    if (!employeeData.jobInfo?.level) {
      errors.push('Job level is required');
    }
    if (!employeeData.jobInfo?.hireDate) {
      errors.push('Hire date is required');
    }
    
    // Check compensation
    if (!employeeData.compensation?.salary?.amount) {
      errors.push('Salary amount is required');
    }
    
    // Check user info
    if (!employeeData.userInfo?.email) {
      errors.push('Email is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

export { employeeService as default };