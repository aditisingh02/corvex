// API Configuration for Corvex HR System
const API_BASE_URL = 'http://localhost:5002/api';

// API Client class for making HTTP requests
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// API endpoints
export const API_ENDPOINTS = {
  // Health
  HEALTH: '/health',
  
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgotpassword',
    RESET_PASSWORD: '/auth/resetpassword',
    UPDATE_PASSWORD: '/auth/updatepassword',
    UPDATE_DETAILS: '/auth/updatedetails',
  },

  // Employees
  EMPLOYEES: {
    BASE: '/employees',
    BY_ID: (id) => `/employees/${id}`,
  },

  // Departments
  DEPARTMENTS: {
    BASE: '/departments',
    BY_ID: (id) => `/departments/${id}`,
  },

  // Attendance
  ATTENDANCE: {
    BASE: '/attendance',
    BY_ID: (id) => `/attendance/${id}`,
  },

  // Leave
  LEAVE: {
    BASE: '/leave',
    BY_ID: (id) => `/leave/${id}`,
  },

  // Payroll
  PAYROLL: {
    BASE: '/payroll',
    BY_ID: (id) => `/payroll/${id}`,
  },

  // Performance
  PERFORMANCE: {
    BASE: '/performance',
    BY_ID: (id) => `/performance/${id}`,
  },

  // Training
  TRAINING: {
    BASE: '/training',
    BY_ID: (id) => `/training/${id}`,
  },

  // Analytics
  ANALYTICS: {
    BASE: '/analytics',
  },
};

export default apiClient;