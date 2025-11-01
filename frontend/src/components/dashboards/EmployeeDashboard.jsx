import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RoleSwitcher from "../RoleSwitcher";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate] = useState(new Date());

  // Employee specific stats
  const employeeStats = [
    {
      title: "Hours This Week",
      value: "38.5",
      change: "+2.5h",
      isPositive: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Leave Balance",
      value: "18 days",
      change: "25 total",
      isPositive: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Tasks Completed",
      value: "24/30",
      change: "80%",
      isPositive: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Performance Score",
      value: "4.3/5",
      change: "+0.2",
      isPositive: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
  ];

  // Personal tasks
  const personalTasks = [
    {
      id: 1,
      task: "Complete project documentation",
      dueDate: "Nov 8, 2024",
      priority: "high",
      completed: false,
      project: "E-commerce Platform"
    },
    {
      id: 2,
      task: "Review code for mobile app",
      dueDate: "Nov 10, 2024",
      priority: "medium",
      completed: true,
      project: "Mobile Development"
    },
    {
      id: 3,
      task: "Attend team standup meeting",
      dueDate: "Today",
      priority: "medium",
      completed: false,
      project: "Daily Operations"
    },
    {
      id: 4,
      task: "Update training progress",
      dueDate: "Nov 12, 2024",
      priority: "low",
      completed: false,
      project: "Professional Development"
    },
    {
      id: 5,
      task: "Submit timesheet for last week",
      dueDate: "Yesterday",
      priority: "high",
      completed: false,
      project: "Administrative"
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Completed task: API testing",
      time: "2 hours ago",
      type: "task",
      icon: "✅"
    },
    {
      id: 2,
      action: "Submitted leave request",
      time: "1 day ago",
      type: "leave",
      icon: "📅"
    },
    {
      id: 3,
      action: "Updated profile information",
      time: "3 days ago",
      type: "profile",
      icon: "👤"
    },
    {
      id: 4,
      action: "Attended training session",
      time: "1 week ago",
      type: "training",
      icon: "🎓"
    },
    {
      id: 5,
      action: "Joined project team",
      time: "2 weeks ago",
      type: "project",
      icon: "👥"
    }
  ];

  // Quick actions for employees
  const quickActions = [
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

  // Upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Team Meeting",
      date: "Today",
      time: "2:00 PM",
      type: "meeting",
      location: "Conference Room A"
    },
    {
      id: 2,
      title: "Project Deadline",
      date: "Nov 8, 2024",
      time: "5:00 PM",
      type: "deadline",
      location: "E-commerce Platform"
    },
    {
      id: 3,
      title: "Training Session",
      date: "Nov 12, 2024",
      time: "10:00 AM",
      type: "training",
      location: "Training Room B"
    },
    {
      id: 4,
      title: "Performance Review",
      date: "Nov 15, 2024",
      time: "3:00 PM",
      type: "review",
      location: "Manager's Office"
    }
  ];

  const toggleTaskCompletion = (taskId) => {
    // This would typically update the task status in your state management
    console.log(`Toggle task ${taskId} completion`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Your personal workspace and productivity overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <RoleSwitcher />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}</p>
            <p className="text-xs text-gray-500">Employee</p>
          </div>
        </div>
      </div>

      {/* Employee Stats */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h3>
            <div className="space-y-3">
              {personalTasks.map((task) => (
                <div key={task.id} className={`flex items-center space-x-4 p-4 rounded-lg border ${
                  task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.task}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.priority} priority
                      </span>
                      <span className="text-xs text-gray-500">{task.project}</span>
                      <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
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

          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border ${
                  event.type === 'deadline' ? 'bg-red-50 border-red-200' :
                  event.type === 'meeting' ? 'bg-blue-50 border-blue-200' :
                  event.type === 'training' ? 'bg-green-50 border-green-200' :
                  'bg-purple-50 border-purple-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-900">{event.date}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
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
    </div>
  );
};

export default EmployeeDashboard;