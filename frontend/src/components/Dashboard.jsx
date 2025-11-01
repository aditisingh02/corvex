import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { USER_ROLES } from "../utils/roleManager";
import Sidebar from "./Sidebar";
import Header from "./Header";

// Import role-specific dashboards
import SuperAdminDashboard from "./dashboards/SuperAdminDashboard";
import HRManagerDashboard from "./dashboards/HRManagerDashboard";
import HRCoordinatorDashboard from "./dashboards/HRCoordinatorDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import EmployeeDashboard from "./dashboards/EmployeeDashboard";
import RecruiterDashboard from "./dashboards/RecruiterDashboard";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  // Loading state
  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Function to render the appropriate dashboard based on user role
  const renderRoleBasedDashboard = () => {
    switch (user.role) {
      case USER_ROLES.SUPER_ADMIN:
        return <SuperAdminDashboard />;
      case USER_ROLES.HR_MANAGER:
        return <HRManagerDashboard />;
      case USER_ROLES.HR_COORDINATOR:
        return <HRCoordinatorDashboard />;
      case USER_ROLES.MANAGER:
        return <ManagerDashboard />;
      case USER_ROLES.EMPLOYEE:
        return <EmployeeDashboard />;
      case USER_ROLES.RECRUITER:
        return <RecruiterDashboard />;
      default:
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-4">
                Your role ({user.role}) is not recognized or you don't have permission to access this dashboard.
              </p>
              <button
                onClick={() => window.location.href = '/login'}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderRoleBasedDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
