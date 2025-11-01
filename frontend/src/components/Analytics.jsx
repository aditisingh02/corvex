import React, { useState } from 'react';

const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('thisMonth');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalEmployees: 247,
      totalEmployeesGrowth: 8.5,
      activeRecruitment: 12,
      activeRecruitmentGrowth: -3.2,
      averagePerformance: 4.2,
      averagePerformanceGrowth: 2.1,
      totalProjects: 18,
      totalProjectsGrowth: 11.8
    },
    recruitment: {
      applicationsReceived: 324,
      interviewsScheduled: 87,
      offersExtended: 23,
      hireRate: 18.5,
      avgTimeToHire: 32,
      topSources: ['LinkedIn', 'Employee Referral', 'Company Website', 'Job Boards']
    },
    performance: {
      avgRating: 4.2,
      topPerformers: 15,
      improvementNeeded: 8,
      goalCompletionRate: 78,
      feedbackCompletion: 92
    },
    attendance: {
      overallAttendance: 94.2,
      lateArrivals: 12,
      earlyDepartures: 8,
      leaveRequests: 23,
      workFromHome: 45
    }
  };

  const chartData = [
    { month: 'Jan', employees: 220, performance: 4.1, projects: 15 },
    { month: 'Feb', employees: 225, performance: 4.0, projects: 16 },
    { month: 'Mar', employees: 232, performance: 4.2, projects: 17 },
    { month: 'Apr', employees: 238, performance: 4.3, projects: 18 },
    { month: 'May', employees: 243, performance: 4.1, projects: 17 },
    { month: 'Jun', employees: 247, performance: 4.2, projects: 18 }
  ];

  const MetricCard = ({ title, value, growth, icon, color = "blue" }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {growth && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growth >= 0 ? '+' : ''}{growth}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const SimpleChart = ({ data, dataKey, color = "#3B82F6" }) => (
    <div className="flex items-end space-x-2 h-32">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="bg-blue-500 rounded-t"
            style={{ 
              height: `${(item[dataKey] / Math.max(...data.map(d => d[dataKey]))) * 100}px`,
              width: '20px',
              backgroundColor: color
            }}
          />
          <span className="text-xs text-gray-600 mt-1">{item.month}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-['Space_Grotesk']">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Analytics</h1>
        <p className="text-gray-600">Comprehensive insights into your workforce and HR operations</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex space-x-4">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="thisYear">This Year</option>
          </select>

          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overview">Overview</option>
            <option value="recruitment">Recruitment</option>
            <option value="performance">Performance</option>
            <option value="attendance">Attendance</option>
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      {selectedMetric === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Employees"
            value={analyticsData.overview.totalEmployees}
            growth={analyticsData.overview.totalEmployeesGrowth}
            color="blue"
            icon={
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <MetricCard 
            title="Active Recruitment"
            value={analyticsData.overview.activeRecruitment}
            growth={analyticsData.overview.activeRecruitmentGrowth}
            color="green"
            icon={
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-4z" />
              </svg>
            }
          />
          <MetricCard 
            title="Avg Performance"
            value={`${analyticsData.overview.averagePerformance}/5.0`}
            growth={analyticsData.overview.averagePerformanceGrowth}
            color="purple"
            icon={
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
          />
          <MetricCard 
            title="Active Projects"
            value={analyticsData.overview.totalProjects}
            growth={analyticsData.overview.totalProjectsGrowth}
            color="orange"
            icon={
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
        </div>
      )}

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Growth Trend</h3>
          <SimpleChart data={chartData} dataKey="employees" color="#3B82F6" />
        </div>

        {/* Performance Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
          <SimpleChart data={chartData} dataKey="performance" color="#10B981" />
        </div>

        {/* Recruitment Metrics */}
        {selectedMetric === 'recruitment' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Funnel</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Applications</span>
                <span className="font-semibold">{analyticsData.recruitment.applicationsReceived}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Interviews</span>
                <span className="font-semibold">{analyticsData.recruitment.interviewsScheduled}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Offers</span>
                <span className="font-semibold">{analyticsData.recruitment.offersExtended}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hire Rate</span>
                <span className="font-semibold text-green-600">{analyticsData.recruitment.hireRate}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Top Sources */}
        {selectedMetric === 'recruitment' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recruitment Sources</h3>
            <div className="space-y-3">
              {analyticsData.recruitment.topSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-600">{source}</span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${85 - (index * 15)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{85 - (index * 15)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent Activities */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-600">New employee John Smith onboarded in Engineering</span>
            <span className="ml-auto text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Performance review completed for Marketing team</span>
            <span className="ml-auto text-gray-400">4 hours ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Interview scheduled with candidate Sarah Johnson</span>
            <span className="ml-auto text-gray-400">6 hours ago</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <span className="text-gray-600">Training session completed by 15 employees</span>
            <span className="ml-auto text-gray-400">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;