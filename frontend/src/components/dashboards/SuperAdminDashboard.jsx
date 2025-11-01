import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RoleSwitcher from "../RoleSwitcher";
import hrSystemData from "../../data/hrSystemData";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate] = useState(new Date());

  // Super Admin specific stats - comprehensive system overview
  const systemStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      isPositive: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: "System Health",
      value: "99.8%",
      change: "+0.2%",
      isPositive: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Revenue",
      value: "$2.4M",
      change: "+18.7%",
      isPositive: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: "Active Sessions",
      value: "1,247",
      change: "+5.3%",
      isPositive: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  // Recent system activities
  const systemActivities = [
    {
      id: 1,
      action: "New user registration",
      user: "sarah.johnson@company.com",
      time: "5 minutes ago",
      type: "user",
      icon: "👤"
    },
    {
      id: 2,
      action: "System backup completed",
      user: "System",
      time: "15 minutes ago",
      type: "system",
      icon: "💾"
    },
    {
      id: 3,
      action: "Security policy updated",
      user: "admin@company.com",
      time: "1 hour ago",
      type: "security",
      icon: "🔒"
    },
    {
      id: 4,
      action: "Department created: Engineering",
      user: "hr.manager@company.com",
      time: "2 hours ago",
      type: "department",
      icon: "🏢"
    },
    {
      id: 5,
      action: "Role permissions modified",
      user: "admin@company.com",
      time: "3 hours ago",
      type: "role",
      icon: "⚙️"
    }
  ];

  // Quick admin actions
  const quickActions = [
    {
      title: "User Management",
      description: "Manage system users and permissions",
      icon: "👥",
      color: "bg-blue-500",
      action: () => navigate("/all-employees")
    },
    {
      title: "System Analytics",
      description: "View comprehensive system metrics",
      icon: "📊",
      color: "bg-green-500",
      action: () => navigate("/analytics")
    },
    {
      title: "Security Center",
      description: "Monitor security and compliance",
      icon: "🔐",
      color: "bg-red-500",
      action: () => navigate("/settings")
    },
    {
      title: "Backup & Recovery",
      description: "Manage system backups",
      icon: "🔄",
      color: "bg-purple-500",
      action: () => navigate("/settings")
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Complete system overview and administrative controls</p>
        </div>
        <div className="flex items-center space-x-4">
          <RoleSwitcher />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}</p>
            <p className="text-xs text-gray-500">Super Administrator</p>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {systemStats.map((stat, index) => (
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
        {/* System Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Activities</h3>
            <div className="space-y-4">
              {systemActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'system' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'security' ? 'bg-red-100 text-red-800' :
                    activity.type === 'user' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
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

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Running</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Background Jobs</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-yellow-600">Processing</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">78% Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;