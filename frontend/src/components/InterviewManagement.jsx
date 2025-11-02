import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { interviewService, interviewUtils } from "../services/interviewService";

const InterviewManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pipeline");
  const [interviews, setInterviews] = useState([]);
  const [statistics, setStatistics] = useState({
    overview: [],
    stages: [],
    upcomingInterviews: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [interviewsResponse, statisticsResponse] = await Promise.all([
        fetchInterviewsByTab(),
        interviewService.getStatistics()
      ]);

      setInterviews(interviewsResponse.data || []);
      setStatistics(statisticsResponse.data || {
        overview: [],
        stages: [],
        upcomingInterviews: 0
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load interview data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInterviewsByTab = async () => {
    const params = { limit: 50 };
    
    switch (activeTab) {
      case "upcoming":
        return await interviewService.getInterviewsByStatus("scheduled", params);
      case "completed":
        return await interviewService.getInterviewsByStatus("completed", params);
      case "pipeline":
      default:
        return await interviewService.getAllInterviews(params);
    }
  };

  const handleCancelInterview = async (interviewId) => {
    const reason = prompt("Please provide a reason for cancellation:");
    if (!reason) return;

    try {
      await interviewService.cancelInterview(interviewId, reason);
      fetchData(); // Refresh data
      alert("Interview cancelled successfully");
    } catch (error) {
      console.error('Error cancelling interview:', error);
      alert("Failed to cancel interview. Please try again.");
    }
  };

  const handleRescheduleInterview = (interviewId) => {
    // In a real app, you might open a modal or navigate to a reschedule page
    navigate(`/interview-scheduling?reschedule=${interviewId}`);
  };

  const getStatusColor = (status) => {
    return interviewUtils.getStatusColor(status);
  };

  const getStageColor = (stage) => {
    return interviewUtils.getStageColor(stage);
  };

  // Generate pipeline stats from statistics data
  const pipelineStats = statistics.stages.map(stage => ({
    stage: interviewUtils.formatStageName(stage._id),
    count: stage.count,
    color: getStageColorForStats(stage._id)
  }));

  const getStageColorForStats = (stage) => {
    const colors = {
      screening: "bg-purple-500",
      technical: "bg-indigo-500", 
      hr_round: "bg-green-500",
      portfolio_review: "bg-orange-500",
      final: "bg-red-500"
    };
    return colors[stage] || "bg-gray-500";
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading interviews...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                  <h1 className="text-3xl font-bold text-gray-900">Interview Management</h1>
                  <p className="text-gray-600 mt-2">Manage interviews and track candidate progress</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate("/interview-scheduling")}
                    className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors"
                  >
                    Schedule Interview
                  </button>
                  <button
                    onClick={() => navigate("/interview-analytics")}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Analytics
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                  <button 
                    onClick={fetchData}
                    className="mt-2 text-red-600 hover:text-red-800 underline"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("pipeline")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "pipeline"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Interview Pipeline
                  </button>
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "upcoming"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Upcoming Interviews
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "completed"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Completed Interviews
                  </button>
                </nav>
              </div>
            </div>

            {/* Pipeline Overview */}
            {activeTab === "pipeline" && pipelineStats.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Interview Pipeline</h2>
                <div className="grid grid-cols-5 gap-4">
                  {pipelineStats.map((stage, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${stage.color} mr-3`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stage.stage}</p>
                          <p className="text-2xl font-bold text-gray-900">{stage.count}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interview List */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">
                  {activeTab === "pipeline" && "All Interviews"}
                  {activeTab === "upcoming" && "Upcoming Interviews"}
                  {activeTab === "completed" && "Completed Interviews"}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interviewer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {interviews
                      .filter(interview => {
                        if (activeTab === "upcoming") return interview.status === "scheduled";
                        if (activeTab === "completed") return interview.status === "completed";
                        return true;
                      })
                      .map((interview) => (
                        <tr key={interview._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {interview.candidate?.personalInfo?.firstName?.[0]}
                                  {interview.candidate?.personalInfo?.lastName?.[0]}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {interview.candidate?.personalInfo?.firstName} {interview.candidate?.personalInfo?.lastName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {interview.candidate?.personalInfo?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {interview.interviewDetails?.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(interview.interviewDetails?.stage)}`}>
                              {interviewUtils.formatStageName(interview.interviewDetails?.stage)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>{new Date(interview.scheduling?.date).toLocaleDateString()}</div>
                            <div className="text-gray-500">{interview.scheduling?.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {interview.interviewer?.personalInfo?.firstName} {interview.interviewer?.personalInfo?.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                              {interview.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {interview.feedback?.overallRating ? `${interview.feedback.overallRating}/10` : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {interview.status === "completed" && (
                                <button
                                  onClick={() => navigate(`/interview-feedback/${interview._id}`)}
                                  className="text-[#5E17EB] hover:text-[#4A0E99]"
                                >
                                  View Feedback
                                </button>
                              )}
                              {interview.status === "scheduled" && (
                                <>
                                  <button 
                                    onClick={() => handleRescheduleInterview(interview._id)}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    Reschedule
                                  </button>
                                  <button 
                                    onClick={() => handleCancelInterview(interview._id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    {interviews.length === 0 && (
                      <tr>
                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                          <div>
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No interviews</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {activeTab === "upcoming" && "No upcoming interviews scheduled."}
                              {activeTab === "completed" && "No completed interviews found."}
                              {activeTab === "pipeline" && "No interviews found. Schedule your first interview to get started."}
                            </p>
                            {activeTab === "pipeline" && (
                              <div className="mt-6">
                                <button
                                  onClick={() => navigate("/interview-scheduling")}
                                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5E17EB] hover:bg-[#4A0E99]"
                                >
                                  Schedule Interview
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InterviewManagement;