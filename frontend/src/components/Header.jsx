import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const { logout, user, employee } = useAuth();

  // Helper functions to get user display information
  const getUserName = () => {
    if (employee?.personalInfo?.firstName) {
      return employee.personalInfo.firstName;
    }
    if (user?.email) {
      return user.email.split('@')[0]; // Use email prefix as fallback
    }
    return 'User';
  };

  const getUserRole = () => {
    if (employee?.jobInfo?.position) {
      return employee.jobInfo.position;
    }
    if (user?.role) {
      // Convert role to display format
      const roleMap = {
        'super_admin': 'Super Admin',
        'hr_manager': 'HR Manager',
        'hr_coordinator': 'HR Coordinator',
        'manager': 'Manager',
        'employee': 'Employee',
        'recruiter': 'Recruiter'
      };
      return roleMap[user.role] || user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return 'Employee';
  };

  const getFullName = () => {
    if (employee?.personalInfo?.firstName && employee?.personalInfo?.lastName) {
      return `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`;
    }
    return getUserName();
  };

  // Add some debug logging to see what data we have
  React.useEffect(() => {
    console.log('Header - User data:', user);
    console.log('Header - Employee data:', employee);
  }, [user, employee]);

  const handleLogout = async () => {
    try {
      // Close dropdown first
      setShowProfileDropdown(false);
      
      // Call the logout function from AuthContext
      const result = await logout();
      
      if (result.success) {
        // Redirect to login page after successful logout
        navigate("/login");
      } else {
        console.error("Logout failed:", result.error);
        // Still redirect to login even if logout fails
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect to login even if logout fails
      navigate("/login");
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Hello {getUserName()} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">Good Morning</p>
        </div>

        <div className="flex items-center">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-200"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">{getUserName()}</p>
                <p className="text-xs text-gray-500">{getUserRole()}</p>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  showProfileDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">{getFullName()}</p>
                  <p className="text-xs text-gray-500">{getUserRole()}</p>
                </div>

                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>My Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
