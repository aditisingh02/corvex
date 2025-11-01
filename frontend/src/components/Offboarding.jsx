import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Offboarding = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  // Mock offboarding data
  const offboardingCases = [
    {
      id: 1,
      employeeName: "John Smith",
      employeeId: "EMP001",
      department: "Engineering",
      position: "Senior Developer",
      lastWorkingDay: "2025-11-20",
      reason: "Resignation",
      status: "pending",
      completionPercentage: 0,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      requestDate: "2025-10-20",
      manager: "Lisa Wong"
    },
    {
      id: 2,
      employeeName: "Alice Johnson",
      employeeId: "EMP002",
      department: "Marketing",
      position: "Marketing Manager",
      lastWorkingDay: "2025-11-15",
      reason: "Better Opportunity",
      status: "in-progress",
      completionPercentage: 60,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face",
      requestDate: "2025-10-15",
      manager: "David Kumar"
    },
    {
      id: 3,
      employeeName: "Mark Wilson",
      employeeId: "EMP003",
      department: "Sales",
      position: "Sales Executive",
      lastWorkingDay: "2025-11-01",
      reason: "Personal Reasons",
      status: "completed",
      completionPercentage: 100,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      requestDate: "2025-09-30",
      manager: "Sarah Davis"
    }
  ];

  const offboardingTasks = [
    { id: 1, title: "IT Asset Return", category: "IT", mandatory: true, completed: false },
    { id: 2, title: "Access Revocation", category: "IT", mandatory: true, completed: false },
    { id: 3, title: "Exit Interview", category: "HR", mandatory: true, completed: false },
    { id: 4, title: "Final Settlement", category: "Finance", mandatory: true, completed: false },
    { id: 5, title: "Knowledge Transfer", category: "Department", mandatory: true, completed: false },
    { id: 6, title: "Project Handover", category: "Department", mandatory: false, completed: false },
    { id: 7, title: "Team Farewell", category: "HR", mandatory: false, completed: false },
    { id: 8, title: "Document Handover", category: "Department", mandatory: true, completed: false }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReasonColor = (reason) => {
    switch (reason) {
      case "Resignation":
        return "bg-blue-100 text-blue-800";
      case "Termination":
        return "bg-red-100 text-red-800";
      case "Retirement":
        return "bg-purple-100 text-purple-800";
      case "Better Opportunity":
        return "bg-green-100 text-green-800";
      case "Personal Reasons":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCases = offboardingCases.filter(case_ => {
    if (activeTab === "pending") return case_.status === "pending";
    if (activeTab === "in-progress") return case_.status === "in-progress";
    if (activeTab === "completed") return case_.status === "completed";
    return true;
  });

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
                  <h1 className="text-3xl font-bold text-gray-900">Employee Offboarding</h1>
                  <p className="text-gray-600 mt-2">Manage employee departure process and ensure smooth transitions</p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Export Report
                  </button>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                    Initiate Offboarding
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-red-100">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Offboarding</p>
                    <p className="text-2xl font-bold text-gray-900">18</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">13</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg. Process Time</p>
                    <p className="text-2xl font-bold text-gray-900">12d</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("pending")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "pending"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Pending ({offboardingCases.filter(c => c.status === "pending").length})
                  </button>
                  <button
                    onClick={() => setActiveTab("in-progress")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "in-progress"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    In Progress ({offboardingCases.filter(c => c.status === "in-progress").length})
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "completed"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Completed ({offboardingCases.filter(c => c.status === "completed").length})
                  </button>
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "all"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    All Cases
                  </button>
                </nav>
              </div>
            </div>

            {/* Offboarding Cases */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Offboarding Cases</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Working Day
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCases.map((case_) => (
                      <tr key={case_.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={case_.avatar}
                              alt={case_.employeeName}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {case_.employeeName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {case_.employeeId} • {case_.position}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {case_.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getReasonColor(case_.reason)}`}>
                            {case_.reason}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {case_.lastWorkingDay}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-[#5E17EB] h-2 rounded-full"
                                style={{ width: `${case_.completionPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{case_.completionPercentage}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(case_.status)}`}>
                            {case_.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => navigate(`/offboarding/${case_.id}`)}
                              className="text-[#5E17EB] hover:text-[#4A0E99]"
                            >
                              View Details
                            </button>
                            {case_.status !== "completed" && (
                              <button className="text-blue-600 hover:text-blue-900">
                                Update
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Offboarding Checklist Template */}
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Standard Offboarding Checklist</h2>
                <p className="text-sm text-gray-600 mt-1">Default tasks for employee offboarding process</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offboardingTasks.map((task) => (
                    <div key={task.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="h-4 w-4 text-[#5E17EB] focus:ring-[#5E17EB] border-gray-300 rounded"
                        readOnly
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{task.category}</span>
                            {task.mandatory && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Offboarding;