import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDate] = useState(new Date());

  // Recruiter specific stats
  const recruiterStats = [
    {
      title: "Active Candidates",
      value: "127",
      change: "+23 this week",
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
      title: "Interviews Scheduled",
      value: "15",
      change: "+8 this week",
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
      title: "Open Positions",
      value: "12",
      change: "+3 new",
      isPositive: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0h-8m8 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
        </svg>
      )
    },
    {
      title: "Placement Rate",
      value: "78%",
      change: "+5%",
      isPositive: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // Recruitment pipeline stages
  const pipelineStages = [
    {
      stage: "New Applications",
      count: 45,
      color: "bg-gray-400",
      candidates: [
        { name: "Sarah Johnson", role: "Frontend Developer", applied: "2 hours ago" },
        { name: "Mike Chen", role: "Data Scientist", applied: "5 hours ago" },
        { name: "Lisa Garcia", role: "UX Designer", applied: "1 day ago" }
      ]
    },
    {
      stage: "Phone Screening",
      count: 23,
      color: "bg-blue-400",
      candidates: [
        { name: "Alex Thompson", role: "Backend Developer", applied: "3 days ago" },
        { name: "Emma Davis", role: "Product Manager", applied: "4 days ago" }
      ]
    },
    {
      stage: "Technical Interview",
      count: 12,
      color: "bg-yellow-400",
      candidates: [
        { name: "David Wilson", role: "DevOps Engineer", applied: "1 week ago" },
        { name: "Rachel Brown", role: "QA Engineer", applied: "1 week ago" }
      ]
    },
    {
      stage: "Final Interview",
      count: 8,
      color: "bg-orange-400",
      candidates: [
        { name: "John Smith", role: "Senior Developer", applied: "2 weeks ago" }
      ]
    },
    {
      stage: "Offer Sent",
      count: 5,
      color: "bg-green-400",
      candidates: [
        { name: "Amanda Lee", role: "Marketing Manager", applied: "3 weeks ago" }
      ]
    }
  ];

  // Today's interviews
  const todaysInterviews = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Frontend Developer",
      time: "10:00 AM",
      type: "Technical Interview",
      interviewer: "Alex Chen",
      status: "scheduled"
    },
    {
      id: 2,
      candidate: "Mike Davis",
      position: "Product Manager",
      time: "2:00 PM",
      type: "Final Interview",
      interviewer: "Emma Wilson",
      status: "scheduled"
    },
    {
      id: 3,
      candidate: "Lisa Garcia",
      position: "UX Designer",
      time: "4:00 PM",
      type: "Portfolio Review",
      interviewer: "David Brown",
      status: "completed"
    }
  ];

  // Quick actions for recruiters
  const quickActions = [
    {
      title: "Schedule Interview",
      description: "Book candidate interviews",
      icon: "📅",
      color: "bg-blue-500",
      action: () => navigate("/interview-scheduling")
    },
    {
      title: "Review Applications",
      description: "Check new candidate applications",
      icon: "📄",
      color: "bg-green-500",
      action: () => navigate("/candidates")
    },
    {
      title: "Post New Job",
      description: "Create job posting",
      icon: "📢",
      color: "bg-purple-500",
      action: () => navigate("/jobs")
    },
    {
      title: "Interview Feedback",
      description: "Review and submit feedback",
      icon: "💬",
      color: "bg-orange-500",
      action: () => navigate("/interview-feedback/1")
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      action: "Scheduled interview with Sarah Johnson",
      time: "30 minutes ago",
      type: "schedule",
      icon: "📅"
    },
    {
      id: 2,
      action: "Posted new job: Senior React Developer",
      time: "2 hours ago",
      type: "job-post",
      icon: "📢"
    },
    {
      id: 3,
      action: "Reviewed application from Mike Chen",
      time: "4 hours ago",
      type: "review",
      icon: "👁️"
    },
    {
      id: 4,
      action: "Sent offer to Amanda Lee",
      time: "1 day ago",
      type: "offer",
      icon: "🎉"
    },
    {
      id: 5,
      action: "Completed interview with Lisa Garcia",
      time: "2 days ago",
      type: "interview",
      icon: "✅"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-gray-600 mt-2">Candidate pipeline and recruitment management</p>
        </div>
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Welcome back, {user?.name}</p>
            <p className="text-xs text-gray-500">Recruiter</p>
          </div>
        </div>
      </div>

      {/* Recruiter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {recruiterStats.map((stat, index) => (
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
          {/* Recruitment Pipeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {pipelineStages.map((stage, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">{stage.stage}</h4>
                    <span className={`w-3 h-3 rounded-full ${stage.color}`}></span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-3">{stage.count}</div>
                  <div className="space-y-2">
                    {stage.candidates.slice(0, 2).map((candidate, cidx) => (
                      <div key={cidx} className="text-xs bg-white p-2 rounded border">
                        <p className="font-medium text-gray-900">{candidate.name}</p>
                        <p className="text-gray-500">{candidate.role}</p>
                      </div>
                    ))}
                    {stage.candidates.length > 2 && (
                      <div className="text-xs text-gray-500 text-center py-1">
                        +{stage.candidates.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Interviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Interviews</h3>
            <div className="space-y-4">
              {todaysInterviews.map((interview) => (
                <div key={interview.id} className={`p-4 rounded-lg border ${
                  interview.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">{interview.candidate}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          interview.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {interview.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                      <p className="text-xs text-gray-500">
                        {interview.type} • Interviewer: {interview.interviewer}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{interview.time}</p>
                      <button className="text-xs text-purple-600 hover:text-purple-800">
                        View Details
                      </button>
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
                    activity.type === 'schedule' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'job-post' ? 'bg-purple-100 text-purple-800' :
                    activity.type === 'review' ? 'bg-green-100 text-green-800' :
                    activity.type === 'offer' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.type.replace('-', ' ')}
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

          {/* Recruitment Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Applications Received</span>
                <span className="text-sm font-medium text-blue-600">127</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Interviews Conducted</span>
                <span className="text-sm font-medium text-green-600">45</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Offers Made</span>
                <span className="text-sm font-medium text-purple-600">12</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Successful Hires</span>
                <span className="text-sm font-medium text-orange-600">8</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="text-sm font-medium text-green-600">6.3%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-900">Follow up with candidates</p>
                  <p className="text-xs text-red-600">5 pending responses</p>
                </div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">Interview feedback due</p>
                  <p className="text-xs text-yellow-600">3 reviews pending</p>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">Job posting renewals</p>
                  <p className="text-xs text-blue-600">2 positions expiring</p>
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

export default RecruiterDashboard;