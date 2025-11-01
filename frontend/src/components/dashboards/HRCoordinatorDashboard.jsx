import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RoleSwitcher from "../RoleSwitcher";

const HRCoordinatorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate] = useState(new Date());

  // HR Coordinator specific stats
  const coordinatorStats = [
    {
      title: "Today's Tasks",
      value: "12",
      change: "+3 new",
      isPositive: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: "Documents Processed",
      value: "47",
      change: "+15 today",
      isPositive: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Employee Records",
      value: "328",
      change: "+8 updated",
      isPositive: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "+1.5%",
      isPositive: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  // Today's tasks
  const todaysTasks = [
    {
      id: 1,
      task: "Process new employee documents",
      priority: "high",
      dueTime: "10:00 AM",
      completed: false,
      category: "onboarding"
    },
    {
      id: 2,
      task: "Update employee contact information",
      priority: "medium",
      dueTime: "2:00 PM",
      completed: true,
      category: "records"
    },
    {
      id: 3,
      task: "Prepare attendance reports",
      priority: "high",
      dueTime: "4:00 PM",
      completed: false,
      category: "reporting"
    },
    {
      id: 4,
      task: "Schedule exit interview",
      priority: "medium",
      dueTime: "5:00 PM",
      completed: false,
      category: "offboarding"
    },
    {
      id: 5,
      task: "File performance review documents",
      priority: "low",
      dueTime: "End of day",
      completed: false,
      category: "filing"
    }
  ];

  // Quick actions for coordinator
  const quickActions = [
    {
      title: "Employee Records",
      description: "View and update employee files",
      icon: "📁",
      color: "bg-blue-500",
      action: () => navigate("/all-employees")
    },
    {
      title: "Attendance Tracking",
      description: "Monitor daily attendance",
      icon: "📊",
      color: "bg-green-500",
      action: () => navigate("/attendance")
    },
    {
      title: "Document Management",
      description: "Organize HR documents",
      icon: "📄",
      color: "bg-purple-500",
      action: () => navigate("/settings")
    },
    {
      title: "Schedule Meetings",
      description: "Book HR meetings and sessions",
      icon: "📅",
      color: "bg-orange-500",
      action: () => navigate("/interview-scheduling")
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Updated employee contact info",
      employee: "Jennifer Wilson",
      time: "30 minutes ago",
      type: "update",
      icon: "✏️"
    },
    {
      id: 2,
      action: "Processed leave request",
      employee: "David Brown",
      time: "1 hour ago",
      type: "process",
      icon: "✅"
    },
    {
      id: 3,
      action: "Filed performance review",
      employee: "Lisa Garcia",
      time: "2 hours ago",
      type: "filing",
      icon: "📂"
    },
    {
      id: 4,
      action: "Scheduled onboarding session",
      employee: "Mark Johnson",
      time: "3 hours ago",
      type: "schedule",
      icon: "📅"
    },
    {
      id: 5,
      action: "Generated attendance report",
      employee: "Engineering Team",
      time: "4 hours ago",
      type: "report",
      icon: "📊"
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
          <h1 className="text-3xl font-bold text-gray-900">HR Coordinator Dashboard</h1>
          <p className="text-gray-600 mt-2">Daily HR operations and employee coordination</p>
        </div>
        <div className="flex items-center space-x-4">
          <RoleSwitcher />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}</p>
            <p className="text-xs text-gray-500">HR Coordinator</p>
          </div>
        </div>
      </div>

      {/* Coordinator Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {coordinatorStats.map((stat, index) => (
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
          {/* Today's Tasks */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h3>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
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
                      <span className="text-xs text-gray-500">{task.dueTime}</span>
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
                    <p className="text-xs text-gray-500">{activity.employee} • {activity.time}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'update' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'process' ? 'bg-green-100 text-green-800' :
                    activity.type === 'filing' ? 'bg-purple-100 text-purple-800' :
                    activity.type === 'schedule' ? 'bg-orange-100 text-orange-800' :
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

          {/* Daily Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tasks Completed</span>
                <span className="text-sm font-medium text-green-600">1/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">Documents Processed</span>
                <span className="text-sm font-medium text-blue-600">47</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Records Updated</span>
                <span className="text-sm font-medium text-purple-600">8</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Meetings Scheduled</span>
                <span className="text-sm font-medium text-orange-600">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRCoordinatorDashboard;