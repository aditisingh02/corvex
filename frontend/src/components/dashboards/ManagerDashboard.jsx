import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate] = useState(new Date());

  // Manager specific stats
  const managerStats = [
    {
      title: "Team Members",
      value: "15",
      change: "+2 new",
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
      title: "Active Projects",
      value: "8",
      change: "+1 this week",
      isPositive: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Team Performance",
      value: "92%",
      change: "+5%",
      isPositive: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Tasks Due Today",
      value: "7",
      change: "3 completed",
      isPositive: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  // Team members
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      status: "online",
      currentTask: "Working on API integration",
      performance: 95
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c2d5?w=40&h=40&fit=crop&crop=face",
      status: "online",
      currentTask: "Designing dashboard mockups",
      performance: 92
    },
    {
      id: 3,
      name: "Mike Davis",
      role: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "away",
      currentTask: "Code review and testing",
      performance: 88
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "QA Engineer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      status: "online",
      currentTask: "Testing new features",
      performance: 94
    },
    {
      id: 5,
      name: "David Wilson",
      role: "Backend Developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      status: "offline",
      currentTask: "Database optimization",
      performance: 90
    }
  ];

  // Active projects
  const activeProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      progress: 75,
      deadline: "Nov 15, 2024",
      team: 5,
      status: "on-track",
      priority: "high"
    },
    {
      id: 2,
      name: "Mobile App Development",
      progress: 60,
      deadline: "Dec 1, 2024",
      team: 4,
      status: "on-track",
      priority: "medium"
    },
    {
      id: 3,
      name: "API Integration",
      progress: 90,
      deadline: "Nov 8, 2024",
      team: 3,
      status: "ahead",
      priority: "high"
    },
    {
      id: 4,
      name: "Dashboard Redesign",
      progress: 40,
      deadline: "Nov 30, 2024",
      team: 2,
      status: "behind",
      priority: "low"
    }
  ];

  // Quick actions for managers
  const quickActions = [
    {
      title: "Team Performance",
      description: "View individual and team metrics",
      icon: "📊",
      color: "bg-blue-500",
      action: () => navigate("/performance-management")
    },
    {
      title: "Project Status",
      description: "Monitor project progress",
      icon: "📈",
      color: "bg-green-500",
      action: () => navigate("/projects")
    },
    {
      title: "Team Schedule",
      description: "Manage team calendar and meetings",
      icon: "📅",
      color: "bg-purple-500",
      action: () => navigate("/timesheet")
    },
    {
      title: "Approve Requests",
      description: "Review leave and time-off requests",
      icon: "✅",
      color: "bg-orange-500",
      action: () => navigate("/leave-requests")
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-2">Team oversight and project management</p>
        </div>
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}</p>
            <p className="text-xs text-gray-500">Team Manager</p>
          </div>
        </div>
      </div>

      {/* Manager Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {managerStats.map((stat, index) => (
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
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Team Members */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50">
                  <div className="relative">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-500' :
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{member.performance}%</p>
                        <p className="text-xs text-gray-500">Performance</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{member.currentTask}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'on-track' ? 'bg-green-100 text-green-800' :
                        project.status === 'ahead' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {project.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.priority === 'high' ? 'bg-red-100 text-red-800' :
                        project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress: {project.progress}%</span>
                    <span>Due: {project.deadline}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        project.progress >= 80 ? 'bg-green-500' :
                        project.progress >= 60 ? 'bg-blue-500' :
                        project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{project.team} team members assigned</p>
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

          {/* Team Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Analytics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overall Productivity</span>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">Projects On Track</span>
                <span className="text-sm font-medium text-blue-600">6/8</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Team Satisfaction</span>
                <span className="text-sm font-medium text-purple-600">4.2/5</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg. Response Time</span>
                <span className="text-sm font-medium text-orange-600">2.5h</span>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-900">API Integration</p>
                  <p className="text-xs text-red-600">Due: Nov 8, 2024</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">E-commerce Platform</p>
                  <p className="text-xs text-yellow-600">Due: Nov 15, 2024</p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Dashboard Redesign</p>
                  <p className="text-xs text-blue-600">Due: Nov 30, 2024</p>
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

export default ManagerDashboard;