import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/roleManager';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Check for stored user session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        
        // Check if token exists
        if (authService.isAuthenticated()) {
          // Verify token with backend
          const response = await authService.getCurrentUser();
          if (response.success) {
            setUser(response.user);
            setEmployee(response.employee);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear it
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid auth data
        authService.logout();
        setError('Session expired. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login({ email, password });
      
      if (response.success) {
        // After successful login, fetch complete user profile
        const profileResponse = await authService.getCurrentUser();
        if (profileResponse.success) {
          setUser(profileResponse.user);
          setEmployee(profileResponse.employee);
          setIsAuthenticated(true);
          return { success: true, user: profileResponse.user, employee: profileResponse.employee };
        } else {
          // Fallback to basic user info if profile fetch fails
          setUser(response.user);
          setIsAuthenticated(true);
          return { success: true, user: response.user };
        }
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Call backend logout
      await authService.logout();
      
      // Reset state
      setUser(null);
      setEmployee(null);
      setIsAuthenticated(false);
      setError(null);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Even if backend logout fails, clear local state
      setUser(null);
      setEmployee(null);
      setIsAuthenticated(false);
      setError(null);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.register(userData);
      
      if (response.success) {
        // After successful registration, fetch complete user profile
        const profileResponse = await authService.getCurrentUser();
        if (profileResponse.success) {
          setUser(profileResponse.user);
          setEmployee(profileResponse.employee);
          setIsAuthenticated(true);
          return { success: true, user: profileResponse.user, employee: profileResponse.employee };
        } else {
          // Fallback to basic user info if profile fetch fails
          setUser(response.user);
          setIsAuthenticated(true);
          return { success: true, user: response.user };
        }
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      setLoading(true);
      const response = await authService.updateDetails(updatedData);
      
      if (response.success) {
        setUser(response.user);
        return { success: true, user: response.user };
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      const response = await authService.updatePassword(currentPassword, newPassword);
      
      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.message || 'Password update failed');
      }
    } catch (error) {
      console.error('Password update error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    employee,
    loading,
    isAuthenticated,
    error,
    login,
    logout,
    register,
    updateUserProfile,
    updatePassword,
    
    // Helper functions
    isAdmin: () => user?.role === USER_ROLES.SUPER_ADMIN,
    isHRManager: () => user?.role === USER_ROLES.HR_MANAGER,
    isHRCoordinator: () => user?.role === USER_ROLES.HR_COORDINATOR,
    isManager: () => user?.role === USER_ROLES.MANAGER,
    isEmployee: () => user?.role === USER_ROLES.EMPLOYEE,
    isRecruiter: () => user?.role === USER_ROLES.RECRUITER,
    
    // Check if user has management capabilities
    canManageTeam: () => [USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_MANAGER, USER_ROLES.MANAGER].includes(user?.role),
    canManageHR: () => [USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_MANAGER, USER_ROLES.HR_COORDINATOR].includes(user?.role),
    canRecruit: () => [USER_ROLES.SUPER_ADMIN, USER_ROLES.HR_MANAGER, USER_ROLES.RECRUITER].includes(user?.role)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;