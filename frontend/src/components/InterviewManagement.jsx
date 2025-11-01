import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const InterviewManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pipeline");

  // Mock interview data
  const interviews = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Senior Frontend Developer",
      stage: "Technical",
      date: "2025-11-05",
      time: "10:00 AM",
      interviewer: "John Smith",
      status: "scheduled",
      score: null,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      position: "Backend Developer",
      stage: "HR Round",
      date: "2025-11-03",
      time: "2:00 PM",
      interviewer: "Lisa Wong",
      status: "completed",
      score: 8.5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      candidateName: "Emily Davis",
      position: "UX Designer",
      stage: "Portfolio Review",
      date: "2025-11-04",
      time: "3:30 PM",
      interviewer: "Alex Kumar",
      status: "in-progress",
      score: null,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 4,
      candidateName: "David Rodriguez",
      position: "Data Scientist",
      stage: "Technical",
      date: "2025-11-06",
      time: "11:00 AM",
      interviewer: "Priya Sharma",
      status: "scheduled",
      score: null,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case "Screening":
        return "bg-purple-100 text-purple-800";
      case "Technical":
        return "bg-indigo-100 text-indigo-800";
      case "HR Round":
        return "bg-green-100 text-green-800";
      case "Portfolio Review":
        return "bg-orange-100 text-orange-800";
      case "Final":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const pipelineStats = [
    { stage: "Applications", count: 45, color: "bg-blue-500" },
    { stage: "Screening", count: 28, color: "bg-purple-500" },
    { stage: "Technical", count: 15, color: "bg-indigo-500" },
    { stage: "HR Round", count: 8, color: "bg-green-500" },
    { stage: "Final", count: 3, color: "bg-red-500" }
  ];

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
            {activeTab === "pipeline" && (
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
                        <tr key={interview.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={interview.avatar}
                                alt={interview.candidateName}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {interview.candidateName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {interview.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(interview.stage)}`}>
                              {interview.stage}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>{interview.date}</div>
                            <div className="text-gray-500">{interview.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {interview.interviewer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(interview.status)}`}>
                              {interview.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {interview.score ? `${interview.score}/10` : "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {interview.status === "completed" && (
                                <button
                                  onClick={() => navigate(`/interview-feedback/${interview.id}`)}
                                  className="text-[#5E17EB] hover:text-[#4A0E99]"
                                >
                                  View Feedback
                                </button>
                              )}
                              {interview.status === "scheduled" && (
                                <>
                                  <button className="text-blue-600 hover:text-blue-900">
                                    Edit
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
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