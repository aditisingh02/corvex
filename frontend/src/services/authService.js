import { apiClient, API_ENDPOINTS } from './api.js';

// Authentication Service
export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      if (response.success && response.token) {
        apiClient.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Register user
  async register(userData) {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      if (response.success && response.token) {
        apiClient.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  },

  // Logout user
  async logout() {
    try {
      await apiClient.get(API_ENDPOINTS.AUTH.LOGOUT);
      apiClient.setToken(null);
      return { success: true };
    } catch (error) {
      // Even if logout fails on server, clear local token
      apiClient.setToken(null);
      throw new Error(error.message || 'Logout failed');
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await apiClient.get(API_ENDPOINTS.AUTH.ME);
    } catch (error) {
      throw new Error(error.message || 'Failed to get user data');
    }
  },

  // Forgot password
  async forgotPassword(email) {
    try {
      return await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  },

  // Reset password
  async resetPassword(token, password) {
    try {
      return await apiClient.put(`${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`, { password });
    } catch (error) {
      throw new Error(error.message || 'Failed to reset password');
    }
  },

  // Update password
  async updatePassword(currentPassword, newPassword) {
    try {
      return await apiClient.put(API_ENDPOINTS.AUTH.UPDATE_PASSWORD, {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to update password');
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!apiClient.token;
  },

  // Get stored token
  getToken() {
    return apiClient.token;
  },
};

export default authService;