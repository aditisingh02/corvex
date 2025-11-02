import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import hrSystemData from "../../data/hrSystemData";

const HRManagerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate] = useState(new Date());

  // HR Manager specific stats
  const hrStats = [
    {
      title: "Total Employees",
      value: hrSystemData.hrMetrics.workforce.totalEmployees,
      change: "+8.1%",
      isPositive: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Open Positions",
      value: "23",
      change: "+12.5%",
      isPositive: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0h-8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
        </svg>
      )
    },
    {
      title: "Pending Leaves",
      value: "15",
      change: "-3.2%",
      isPositive: false,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Avg. Performance",
      value: `${hrSystemData.hrMetrics.performance.averageRating}/5.0`,
      change: "+0.3",
      isPositive: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
  ];

  // Recent HR activities
  const hrActivities = [
    {
      id: 1,
      action: "New employee started",
      employee: "Sarah Johnson - Marketing",
      time: "2 hours ago",
      type: "hiring",
      icon: "🎉"
    },
    {
      id: 2,
      action: "Performance review completed",
      employee: "Michael Chen - Engineering",
      time: "4 hours ago",
      type: "performance",
      icon: "📊"
    },
    {
      id: 3,
      action: "Leave request approved",
      employee: "Emma Davis - Sales",
      time: "6 hours ago",
      type: "leave",
      icon: "✅"
    },
    {
      id: 4,
      action: "Interview scheduled",
      employee: "Candidate: Alex Thompson",
      time: "1 day ago",
      type: "interview",
      icon: "📅"
    },
    {
      id: 5,
      action: "Training session completed",
      employee: "Team: Frontend Development",
      time: "2 days ago",
      type: "training",
      icon: "🎓"
    }
  ];

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

  // Recruitment pipeline
  const recruitmentPipeline = [
    { stage: "Applied", count: 45, color: "bg-gray-400" },
    { stage: "Screening", count: 23, color: "bg-blue-400" },
    { stage: "Interview", count: 12, color: "bg-yellow-400" },
    { stage: "Offer", count: 5, color: "bg-green-400" },
    { stage: "Hired", count: 3, color: "bg-purple-400" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">HR Manager Dashboard</h1>
          <p className="text-gray-600 mt-2">Employee management and HR operations overview</p>
        </div>
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}</p>
            <p className="text-xs text-gray-500">HR Manager</p>
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
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruitment Pipeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Pipeline</h3>
            <div className="space-y-4">
              {recruitmentPipeline.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{stage.count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stage.color}`}
                        style={{ width: `${(stage.count / 45) * 100}%` }}
                      ></div>
                    </div>
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
                  <p className="text-xs text-red-600">15 pending approvals</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">Complete Reviews</p>
                  <p className="text-xs text-yellow-600">8 performance reviews</p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Schedule Interviews</p>
                  <p className="text-xs text-blue-600">5 candidates waiting</p>
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