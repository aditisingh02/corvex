import React, { useState } from 'react';

const HRInsights = () => {
  const [selectedInsight, setSelectedInsight] = useState('workforce');
  const [selectedPeriod, setSelectedPeriod] = useState('last6months');

  const insightCategories = [
    { id: 'workforce', name: 'Workforce Analytics', icon: '👥' },
    { id: 'performance', name: 'Performance Insights', icon: '📊' },
    { id: 'recruitment', name: 'Talent Acquisition', icon: '🎯' },
    { id: 'retention', name: 'Employee Retention', icon: '💼' },
    { id: 'engagement', name: 'Engagement Metrics', icon: '❤️' },
    { id: 'predictive', name: 'Predictive Analytics', icon: '🔮' }
  ];

  const workforceInsights = {
    demographics: {
      avgAge: 32.5,
      genderDistribution: { male: 52, female: 46, other: 2 },
      educationLevels: { bachelor: 45, master: 35, phd: 12, other: 8 },
      experienceLevels: { junior: 30, mid: 45, senior: 20, executive: 5 }
    },
    diversity: {
      score: 78,
      trend: '+5.2%',
      departmentScores: [
        { dept: 'Engineering', score: 72 },
        { dept: 'Marketing', score: 85 },
        { dept: 'Sales', score: 80 },
        { dept: 'HR', score: 90 }
      ]
    },
    growth: {
      headcount: 247,
      growthRate: '+12.3%',
      projectedGrowth: '+18%',
      monthlyHires: [8, 12, 15, 9, 11, 14]
    }
  };

  const performanceInsights = {
    overall: {
      avgRating: 4.2,
      topPerformers: 15,
      improvementNeeded: 8,
      trend: '+0.3 points'
    },
    productivity: {
      score: 87,
      topDepartments: ['Engineering', 'Product', 'Marketing'],
      bottlenecks: ['Communication', 'Resource Allocation', 'Process Efficiency']
    },
    goals: {
      completionRate: 78,
      avgGoalsPerEmployee: 5.2,
      onTrackGoals: 156,
      overdueGoals: 23
    }
  };

  const retentionInsights = {
    turnover: {
      rate: 8.5,
      voluntary: 6.2,
      involuntary: 2.3,
      trend: '-2.1%'
    },
    risks: {
      highRisk: 12,
      mediumRisk: 28,
      lowRisk: 207,
      factors: ['Career Growth', 'Compensation', 'Work-Life Balance', 'Management']
    },
    tenure: {
      avgTenure: 3.2,
      newHires90Days: 23,
      veteranEmployees: 45
    }
  };

  const InsightCard = ({ title, value, subtitle, trend, color = "blue" }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {trend && (
          <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mb-1">
        <span className={`text-2xl font-bold text-${color}-600`}>{value}</span>
      </div>
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );

  const ProgressBar = ({ label, percentage, color = "blue" }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );

  const TrendChart = ({ data, color = "#3B82F6" }) => (
    <div className="flex items-end space-x-1 h-20">
      {data.map((value, index) => (
        <div 
          key={index}
          className="bg-blue-500 rounded-t flex-1"
          style={{ 
            height: `${(value / Math.max(...data)) * 100}%`,
            backgroundColor: color,
            minHeight: '4px'
          }}
        />
      ))}
    </div>
  );

  const renderWorkforceInsights = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InsightCard 
          title="Total Workforce"
          value={workforceInsights.growth.headcount}
          trend={workforceInsights.growth.growthRate}
          color="blue"
        />
        <InsightCard 
          title="Average Age"
          value={`${workforceInsights.demographics.avgAge} years`}
          color="green"
        />
        <InsightCard 
          title="Diversity Score"
          value={`${workforceInsights.diversity.score}/100`}
          trend={workforceInsights.diversity.trend}
          color="purple"
        />
        <InsightCard 
          title="Projected Growth"
          value={workforceInsights.growth.projectedGrowth}
          subtitle="Next 12 months"
          color="orange"
        />
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
          <div className="space-y-3">
            <ProgressBar label="Male" percentage={workforceInsights.demographics.genderDistribution.male} color="blue" />
            <ProgressBar label="Female" percentage={workforceInsights.demographics.genderDistribution.female} color="pink" />
            <ProgressBar label="Other" percentage={workforceInsights.demographics.genderDistribution.other} color="gray" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Education Levels</h3>
          <div className="space-y-3">
            <ProgressBar label="Bachelor's Degree" percentage={workforceInsights.demographics.educationLevels.bachelor} color="green" />
            <ProgressBar label="Master's Degree" percentage={workforceInsights.demographics.educationLevels.master} color="blue" />
            <ProgressBar label="PhD" percentage={workforceInsights.demographics.educationLevels.phd} color="purple" />
            <ProgressBar label="Other" percentage={workforceInsights.demographics.educationLevels.other} color="gray" />
          </div>
        </div>
      </div>

      {/* Growth Trend */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Hiring Trend</h3>
        <TrendChart data={workforceInsights.growth.monthlyHires} />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </div>
    </div>
  );

  const renderPerformanceInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InsightCard 
          title="Average Rating"
          value={`${performanceInsights.overall.avgRating}/5.0`}
          trend={performanceInsights.overall.trend}
          color="green"
        />
        <InsightCard 
          title="Top Performers"
          value={performanceInsights.overall.topPerformers}
          subtitle="Above 4.5 rating"
          color="blue"
        />
        <InsightCard 
          title="Productivity Score"
          value={`${performanceInsights.productivity.score}%`}
          color="purple"
        />
        <InsightCard 
          title="Goal Completion"
          value={`${performanceInsights.goals.completionRate}%`}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Departments</h3>
          <div className="space-y-3">
            {performanceInsights.productivity.topDepartments.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{dept}</span>
                <span className="text-green-600 font-semibold">{95 - (index * 3)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Bottlenecks</h3>
          <div className="space-y-3">
            {performanceInsights.productivity.bottlenecks.map((bottleneck, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-gray-900">{bottleneck}</span>
                <span className="text-red-600 font-semibold">{35 + (index * 8)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRetentionInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <InsightCard 
          title="Turnover Rate"
          value={`${retentionInsights.turnover.rate}%`}
          trend={retentionInsights.turnover.trend}
          color="red"
        />
        <InsightCard 
          title="High Risk Employees"
          value={retentionInsights.risks.highRisk}
          subtitle="Likely to leave"
          color="orange"
        />
        <InsightCard 
          title="Average Tenure"
          value={`${retentionInsights.tenure.avgTenure} years`}
          color="blue"
        />
        <InsightCard 
          title="New Hire Retention"
          value={`${Math.round((23-3)/23*100)}%`}
          subtitle="90-day retention"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Retention Risk Distribution</h3>
          <div className="space-y-3">
            <ProgressBar label="Low Risk" percentage={84} color="green" />
            <ProgressBar label="Medium Risk" percentage={11} color="yellow" />
            <ProgressBar label="High Risk" percentage={5} color="red" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Retention Risk Factors</h3>
          <div className="space-y-3">
            {retentionInsights.risks.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{factor}</span>
                <span className="text-orange-600 font-semibold">{65 - (index * 12)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedInsight) {
      case 'workforce':
        return renderWorkforceInsights();
      case 'performance':
        return renderPerformanceInsights();
      case 'retention':
        return renderRetentionInsights();
      case 'recruitment':
        return <div className="text-center py-12 text-gray-500">Recruitment insights coming soon...</div>;
      case 'engagement':
        return <div className="text-center py-12 text-gray-500">Engagement metrics coming soon...</div>;
      case 'predictive':
        return <div className="text-center py-12 text-gray-500">Predictive analytics coming soon...</div>;
      default:
        return renderWorkforceInsights();
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-['Space_Grotesk']">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Insights</h1>
        <p className="text-gray-600">Advanced analytics and insights for strategic HR decisions</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-2">
            {insightCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedInsight(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedInsight === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last30days">Last 30 Days</option>
            <option value="last3months">Last 3 Months</option>
            <option value="last6months">Last 6 Months</option>
            <option value="lastyear">Last Year</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* AI Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Recommendations</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Consider implementing a mentorship program to improve retention in the Engineering department
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Your diversity score is improving - focus on leadership diversity for better outcomes
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Performance reviews show communication gaps - consider team building initiatives
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRInsights;