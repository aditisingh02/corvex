import React, { createContext, useContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/roleManager';

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
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock users for demo purposes
  const mockUsers = {
    'admin@corvex.com': {
      id: 1,
      email: 'admin@corvex.com',
      name: 'System Administrator',
      role: USER_ROLES.SUPER_ADMIN,
      department: 'IT',
      avatar: '/api/placeholder/40/40',
      employeeId: 'EMP001'
    },
    'hr.manager@corvex.com': {
      id: 2,
      email: 'hr.manager@corvex.com',
      name: 'Sarah Johnson',
      role: USER_ROLES.HR_MANAGER,
      department: 'Human Resources',
      avatar: '/api/placeholder/40/40',
      employeeId: 'EMP002'
    },
    'hr.coordinator@corvex.com': {
      id: 3,
      email: 'hr.coordinator@corvex.com',
      name: 'Mike Chen',
      role: USER_ROLES.HR_COORDINATOR,
      department: 'Human Resources',
      avatar: '/api/placeholder/40/40',
      employeeId: 'EMP003'
    },
    'manager@corvex.com': {
      id: 4,
      email: 'manager@corvex.com',
      name: 'Emily Davis',
      role: USER_ROLES.MANAGER,
      department: 'Engineering',
      avatar: '/api/placeholder/40/40',
      employeeId: 'EMP004',
      teamMembers: ['EMP005', 'EMP006', 'EMP007']
    },
    'employee@corvex.com': {
      id: 5,
      email: 'employee@corvex.com',
      name: 'John Smith',
      role: USER_ROLES.EMPLOYEE,
      department: 'Engineering',
      avatar: '/api/placeholder/40/40',
      employeeId: 'EMP005',
      managerId: 'EMP004'
    },
    'recruiter@corvex.com': {
      id: 6,
      email: 'recruiter@corvex.com',
      name: 'Lisa Wilson',
      role: USER_ROLES.RECRUITER,
      department: 'Human Resources',
      avatar: '/api/placeholder/40/40',
      employeeId: 'EMP006'
    }
  };

  // Check for stored user session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('corvex_user');
        const storedToken = localStorage.getItem('corvex_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('corvex_user');
        localStorage.removeItem('corvex_token');
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in mock data
      const userData = mockUsers[email.toLowerCase()];
      
      if (!userData) {
        throw new Error('Invalid email or password');
      }
      
      // For demo purposes, accept any password for valid emails
      // In real app, you'd validate against backend
      
      // Generate mock JWT token
      const mockToken = `mock_jwt_${userData.id}_${Date.now()}`;
      
      // Store user data and token
      localStorage.setItem('corvex_user', JSON.stringify(userData));
      localStorage.setItem('corvex_token', mockToken);
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear stored data
      localStorage.removeItem('corvex_user');
      localStorage.removeItem('corvex_token');
      
      // Reset state
      setUser(null);
      setIsAuthenticated(false);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateUserProfile = (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('corvex_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  const switchRole = (newRole) => {
    // For demo purposes - allow switching roles
    try {
      const updatedUser = { ...user, role: newRole };
      localStorage.setItem('corvex_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Role switch error:', error);
      return { success: false, error: error.message };
    }
  };

  const getDemoUsers = () => {
    return Object.values(mockUsers).map(user => ({
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department
    }));
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUserProfile,
    switchRole,
    getDemoUsers,
    
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