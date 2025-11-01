import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const InterviewAnalytics = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock analytics data
  const analyticsData = {
    totalInterviews: 87,
    completedInterviews: 72,
    pendingInterviews: 15,
    averageScore: 7.2,
    hireRate: 23.6,
    timeToHire: 18, // days
    candidateDropOffRate: 12.5,
    interviewerUtilization: 78.5
  };

  const interviewTrends = [
    { month: "Jul", interviews: 45, hires: 12 },
    { month: "Aug", interviews: 52, hires: 15 },
    { month: "Sep", interviews: 38, hires: 8 },
    { month: "Oct", interviews: 65, hires: 18 },
    { month: "Nov", interviews: 43, hires: 11 }
  ];

  const stageMetrics = [
    { stage: "Screening", conducted: 65, passed: 45, passRate: 69.2 },
    { stage: "Technical", conducted: 45, passed: 28, passRate: 62.2 },
    { stage: "HR Round", conducted: 28, passed: 22, passRate: 78.6 },
    { stage: "Final", conducted: 22, passed: 16, passRate: 72.7 }
  ];

  const topInterviewers = [
    { name: "John Smith", interviews: 24, avgScore: 8.2, hires: 8 },
    { name: "Lisa Wong", interviews: 19, avgScore: 7.8, hires: 6 },
    { name: "Alex Kumar", interviews: 16, avgScore: 7.5, hires: 4 },
    { name: "Priya Sharma", interviews: 13, avgScore: 8.0, hires: 5 }
  ];

  const candidateSources = [
    { source: "LinkedIn", count: 32, percentage: 36.8 },
    { source: "Job Boards", count: 28, percentage: 32.2 },
    { source: "Referrals", count: 15, percentage: 17.2 },
    { source: "Career Page", count: 12, percentage: 13.8 }
  ];

  const MetricCard = ({ title, value, subValue, icon, color = "blue" }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Interview Analytics</h1>
                  <p className="text-gray-600 mt-2">Track and analyze interview performance metrics</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                  </select>
                  <button
                    onClick={() => navigate("/interview-management")}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ← Back to Interviews
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Interviews"
                value={analyticsData.totalInterviews}
                subValue={`${analyticsData.completedInterviews} completed, ${analyticsData.pendingInterviews} pending`}
                icon={
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                color="blue"
              />
              <MetricCard
                title="Average Score"
                value={`${analyticsData.averageScore}/10`}
                subValue="Interview rating"
                icon={
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.837-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                }
                color="yellow"
              />
              <MetricCard
                title="Hire Rate"
                value={`${analyticsData.hireRate}%`}
                subValue="Of interviewed candidates"
                icon={
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="green"
              />
              <MetricCard
                title="Time to Hire"
                value={`${analyticsData.timeToHire} days`}
                subValue="Average hiring time"
                icon={
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                color="purple"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Interview Trends */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Trends</h3>
                <div className="space-y-4">
                  {interviewTrends.map((data, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                      <div className="flex-1 mx-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-[#5E17EB] h-2 rounded-full"
                              style={{ width: `${(data.interviews / 70) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{data.interviews}</span>
                        </div>
                      </div>
                      <div className="w-16 text-right text-sm text-green-600">
                        {data.hires} hires
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Performance */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Performance</h3>
                <div className="space-y-4">
                  {stageMetrics.map((stage, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                        <span className="text-sm font-medium text-[#5E17EB]">
                          {stage.passRate}% pass rate
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{stage.conducted} conducted</span>
                        <span>{stage.passed} passed</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#5E17EB] h-2 rounded-full"
                          style={{ width: `${stage.passRate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Interviewers */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Top Interviewers</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topInterviewers.map((interviewer, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{interviewer.name}</p>
                          <p className="text-sm text-gray-600">
                            {interviewer.interviews} interviews • Avg score: {interviewer.avgScore}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#5E17EB]">{interviewer.hires} hires</p>
                          <p className="text-xs text-gray-500">
                            {((interviewer.hires / interviewer.interviews) * 100).toFixed(1)}% rate
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Candidate Sources */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Candidate Sources</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {candidateSources.map((source, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-900">{source.source}</span>
                          <span className="text-sm text-gray-600">{source.count} candidates</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#5E17EB] h-2 rounded-full"
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-xs text-gray-500">{source.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InterviewAnalytics;