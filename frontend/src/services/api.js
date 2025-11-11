// API Configuration for Corvex HR System
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://corvex-u89k.onrender.com/api' 
    : 'http://localhost:5002/api');

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
      
      console.log('Raw response status:', response.status);
      console.log('Raw response ok:', response.ok);
      console.log('Raw response headers:', [...response.headers.entries()]);
      
      // Try to parse JSON response
      let data;
      try {
        data = await response.json();
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError);
        // If JSON parsing fails, create a generic error object
        data = { 
          success: false, 
          message: `Server responded with ${response.status}: ${response.statusText}` 
        };
      }

      if (!response.ok) {
        console.log('Response not OK. Status:', response.status);
        console.log('Response data:', data);
        
        // Log detailed validation errors if available
        if (data.errors) {
          console.log('Validation errors:', data.errors);
        }
        if (data.details) {
          console.log('Error details:', data.details);
        }
        
        const errorMessage = data.message || `HTTP error! status: ${response.status} - ${response.statusText}`;
        console.error(`API Error [${response.status}]:`, errorMessage);
        console.error('Request URL:', url);
        console.error('Request config:', config);
        
        // Create a more detailed error object
        const error = new Error(errorMessage);
        error.status = response.status;
        error.errors = data.errors;
        error.details = data.details;
        throw error;
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      console.error('Request URL:', url);
      console.error('Request config:', config);
      
      // If it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Could not connect to the server. Please check if the backend is running.');
      }
      
      // Re-throw the original error to preserve the message
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