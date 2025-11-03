import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboardData } from "../../hooks/useDashboardData.jsx";
import AttendanceWidget from "../AttendanceWidget";
import AttendanceHistory from "../AttendanceHistory";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user, employee } = useAuth();
  const { loading, error, getEmployeeStats, getRecentActivities } = useDashboardData();
  const [currentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview'); // New state for tab management

  // Get real employee stats from the hook
  const employeeStats = getEmployeeStats();

  // No personal tasks - removed hardcoded data

  // Get real recent activities
  const recentActivities = getRecentActivities();

  // Quick actions for employees
  const quickActions = [
    {
      title: "Mark Attendance",
      description: "Clock in/out for today",
      icon: "🕒",
      color: "bg-green-500",
      action: () => setActiveTab('attendance')
    },
    {
      title: "Request Leave",
      description: "Submit time-off request",
      icon: "📅",
      color: "bg-blue-500",
      action: () => navigate("/leave-requests")
    },
    {
      title: "View Timesheet",
      description: "Track your working hours",
      icon: "⏰",
      color: "bg-green-500",
      action: () => navigate("/timesheet")
    },
    {
      title: "Performance Review",
      description: "Check your performance metrics",
      icon: "📊",
      color: "bg-purple-500",
      action: () => navigate("/performance-management")
    },
    {
      title: "Learning Resources",
      description: "Access training materials",
      icon: "📚",
      color: "bg-orange-500",
      action: () => navigate("/learning-management")
    }
  ];

  // No upcoming events - removed hardcoded data

  const toggleTaskCompletion = (taskId) => {
    // This would typically update the task status in your state management
    console.log(`Toggle task ${taskId} completion`);
  };

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
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Your personal workspace and productivity overview</p>
        </div>
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              Welcome back, {employee?.personalInfo?.firstName || user?.email?.split('@')[0] || 'Employee'}
            </p>
            <p className="text-xs text-gray-500">
              {employee?.jobInfo?.position || 'Employee'}
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'overview'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            activeTab === 'attendance'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Attendance
        </button>
      </div>

      {/* Employee Stats */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {employeeStats.map((stat, index) => (
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
      )}

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Management Coming Soon */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Management</h3>
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Task management feature coming soon</p>
                <p className="text-gray-400 text-xs mt-1">Track your daily tasks and productivity</p>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'task' ? 'bg-green-100 text-green-800' :
                      activity.type === 'leave' ? 'bg-blue-100 text-blue-800' :
                      activity.type === 'profile' ? 'bg-purple-100 text-purple-800' :
                      activity.type === 'training' ? 'bg-orange-100 text-orange-800' :
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
                {quickActions.map((action, index) => (
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

            {/* Compact Attendance Widget */}
            <AttendanceWidget compact={true} />

            {/* Calendar Coming Soon */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Calendar & Events</h3>
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">Calendar integration coming soon</p>
                <p className="text-gray-400 text-xs mt-1">Track meetings, deadlines, and events</p>
              </div>
            </div>

            {/* Personal Goals */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Goals</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Goals</span>
                  <span className="text-sm font-medium text-green-600">8/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600">Learning Hours</span>
                  <span className="text-sm font-medium text-blue-600">15/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-600">Project Contributions</span>
                  <span className="text-sm font-medium text-purple-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Tab Content */}
      {activeTab === 'attendance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AttendanceWidget />
          </div>
          <div className="lg:col-span-2">
            <AttendanceHistory />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;