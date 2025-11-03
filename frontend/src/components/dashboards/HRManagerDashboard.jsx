import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData.jsx";

const HRManagerDashboard = () => {
  const navigate = useNavigate();
  const { user, employee } = useAuth();
  const { loading, error, getHRStats, getRecentActivities } = useDashboardData();
  const [currentDate] = useState(new Date());

  // Get real HR stats from the hook
  const hrStats = getHRStats();

  // Get real recent activities
  const hrActivities = getRecentActivities();

  // HR Quick Actions
  const hrQuickActions = [
    {
      title: "Add Employee",
      description: "Onboard new team member",
      icon: "👤",
      color: "bg-blue-500",
      action: () => navigate("/add-employee")
    },
    {
      title: "Review Applications",
      description: "Check pending job applications",
      icon: "📄",
      color: "bg-green-500",
      action: () => navigate("/candidates")
    },
    {
      title: "Approve Leaves",
      description: "Process leave requests",
      icon: "📅",
      color: "bg-orange-500",
      action: () => navigate("/leave-requests")
    },
    {
      title: "Schedule Interview",
      description: "Book candidate interviews",
      icon: "🎯",
      color: "bg-purple-500",
      action: () => navigate("/interview-scheduling")
    }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
          <p className="ml-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">
                Error loading dashboard data: {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HR Manager Dashboard</h1>
          <p className="text-gray-600 mt-2">Employee management and HR operations overview</p>
        </div>
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              Welcome back, {employee?.personalInfo?.firstName || user?.email?.split('@')[0] || 'HR Manager'}
            </p>
            <p className="text-xs text-gray-500">
              {employee?.jobInfo?.position || 'HR Manager'}
            </p>
          </div>
        </div>
      </div>

      {/* HR Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {hrStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <div className={stat.color}>{stat.icon}</div>
              </div>
              <div className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* HR Activities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent HR Activities</h3>
            <div className="space-y-4">
              {hrActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.employee} • {activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'hiring' ? 'bg-green-100 text-green-800' :
                    activity.type === 'performance' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'leave' ? 'bg-orange-100 text-orange-800' :
                    activity.type === 'interview' ? 'bg-purple-100 text-purple-800' :
                    activity.type === 'employee' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {hrQuickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.color} text-white text-xl`}>
                      {action.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 group-hover:text-purple-700">{action.title}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-900">Review Leave Requests</p>
                  <p className="text-xs text-red-600">Check pending approvals</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">Complete Reviews</p>
                  <p className="text-xs text-yellow-600">Performance evaluations</p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Schedule Interviews</p>
                  <p className="text-xs text-blue-600">Upcoming candidate meetings</p>
                </div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRManagerDashboard;