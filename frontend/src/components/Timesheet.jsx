import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Timesheet = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("weekly");
  const [selectedWeek, setSelectedWeek] = useState("2025-11-04");

  // Mock timesheet data
  const weeklyTimesheet = [
    {
      date: "2025-11-04",
      day: "Monday",
      project: "E-commerce Platform",
      task: "Frontend Development",
      hours: 8,
      status: "submitted",
      description: "Implemented user authentication flow"
    },
    {
      date: "2025-11-05",
      day: "Tuesday", 
      project: "Mobile App",
      task: "API Integration",
      hours: 7.5,
      status: "submitted",
      description: "Connected payment gateway APIs"
    },
    {
      date: "2025-11-06",
      day: "Wednesday",
      project: "E-commerce Platform",
      task: "Bug Fixes",
      hours: 6,
      status: "draft",
      description: "Fixed cart calculation issues"
    },
    {
      date: "2025-11-07",
      day: "Thursday",
      project: "Internal Tools",
      task: "Dashboard Development",
      hours: 8,
      status: "draft",
      description: "Built analytics dashboard"
    },
    {
      date: "2025-11-08",
      day: "Friday",
      project: "Mobile App",
      task: "Testing",
      hours: 5,
      status: "draft",
      description: "Conducted user acceptance testing"
    }
  ];

  const projects = [
    { id: 1, name: "E-commerce Platform", client: "TechCorp", budget: 50000, spent: 35000 },
    { id: 2, name: "Mobile App", client: "StartupXYZ", budget: 30000, spent: 18000 },
    { id: 3, name: "Internal Tools", client: "Internal", budget: 20000, spent: 12000 }
  ];

  const weeklyStats = {
    totalHours: 34.5,
    targetHours: 40,
    overtimeHours: 0,
    billableHours: 29.5,
    nonBillableHours: 5
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
                  <h1 className="text-3xl font-bold text-gray-900">Timesheet</h1>
                  <p className="text-gray-600 mt-2">Track your work hours and project time</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate("/projects")}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Projects
                  </button>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                    Add Time Entry
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900">{weeklyStats.totalHours}h</p>
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
                    <p className="text-sm font-medium text-gray-600">Target Hours</p>
                    <p className="text-2xl font-bold text-gray-900">{weeklyStats.targetHours}h</p>
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
                    <p className="text-sm font-medium text-gray-600">Billable Hours</p>
                    <p className="text-2xl font-bold text-gray-900">{weeklyStats.billableHours}h</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Non-Billable</p>
                    <p className="text-2xl font-bold text-gray-900">{weeklyStats.nonBillableHours}h</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-red-100">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Overtime</p>
                    <p className="text-2xl font-bold text-gray-900">{weeklyStats.overtimeHours}h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Timesheet Entries */}
              <div className="lg:col-span-2">
                {/* Date Selection */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">Week of:</label>
                    <input
                      type="week"
                      value={selectedWeek}
                      onChange={(e) => setSelectedWeek(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Previous Week
                    </button>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Next Week
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Weekly Timesheet</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Project
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hours
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
                        {weeklyTimesheet.map((entry, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{entry.day}</div>
                                <div className="text-sm text-gray-500">{entry.date}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {entry.project}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{entry.task}</div>
                                <div className="text-sm text-gray-500">{entry.description}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {entry.hours}h
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(entry.status)}`}>
                                {entry.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                {entry.status === "draft" && (
                                  <>
                                    <button className="text-[#5E17EB] hover:text-[#4A0E99]">
                                      Edit
                                    </button>
                                    <button className="text-green-600 hover:text-green-900">
                                      Submit
                                    </button>
                                  </>
                                )}
                                {entry.status === "submitted" && (
                                  <button className="text-gray-600 hover:text-gray-900">
                                    View
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        Total Hours: {weeklyStats.totalHours}h
                      </span>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Save Draft
                        </button>
                        <button className="px-4 py-2 text-sm bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors">
                          Submit Week
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Summary */}
              <div>
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Project Summary</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {projects.map((project) => (
                        <div key={project.id}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-900">{project.name}</h4>
                            <span className="text-sm text-gray-600">{project.client}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                              className="bg-[#5E17EB] h-2 rounded-full"
                              style={{ width: `${(project.spent / project.budget) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Spent: ${project.spent.toLocaleString()}</span>
                            <span>Budget: ${project.budget.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Quick Actions</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    <button className="w-full bg-[#5E17EB] text-white px-4 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                      Add Time Entry
                    </button>
                    <button
                      onClick={() => navigate("/projects")}
                      className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View All Projects
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Export Timesheet
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Time Reports
                    </button>
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

export default Timesheet;