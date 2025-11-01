import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Onboarding = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new-hires");

  // Mock onboarding data
  const newHires = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Frontend Developer",
      department: "Engineering",
      startDate: "2025-11-15",
      status: "pending",
      completionPercentage: 0,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face",
      tasks: []
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Backend Developer",
      department: "Engineering",
      startDate: "2025-11-10",
      status: "in-progress",
      completionPercentage: 45,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      tasks: [
        { id: 1, title: "Complete IT setup", completed: true },
        { id: 2, title: "HR documentation", completed: true },
        { id: 3, title: "Department orientation", completed: false },
        { id: 4, title: "Buddy assignment", completed: false }
      ]
    },
    {
      id: 3,
      name: "Emily Davis",
      position: "UX Designer",
      department: "Design",
      startDate: "2025-11-05",
      status: "completed",
      completionPercentage: 100,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      tasks: []
    }
  ];

  const onboardingTemplates = [
    {
      id: 1,
      name: "Engineering Onboarding",
      department: "Engineering",
      duration: "14 days",
      tasksCount: 12,
      description: "Complete onboarding process for engineering roles"
    },
    {
      id: 2,
      name: "Design Team Onboarding",
      department: "Design",
      duration: "10 days",
      tasksCount: 8,
      description: "Onboarding process for design team members"
    },
    {
      id: 3,
      name: "Sales Onboarding",
      department: "Sales",
      duration: "21 days",
      tasksCount: 15,
      description: "Comprehensive sales team onboarding"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const OnboardingCard = ({ hire }) => (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={hire.avatar}
            alt={hire.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{hire.name}</h3>
            <p className="text-sm text-gray-600">{hire.position}</p>
            <p className="text-xs text-gray-500">{hire.department}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(hire.status)}`}>
          {hire.status}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{hire.completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#5E17EB] h-2 rounded-full"
            style={{ width: `${hire.completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Start Date: {hire.startDate}</span>
        <span>{hire.tasks.length} tasks</span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => navigate(`/onboarding/${hire.id}`)}
          className="flex-1 bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4A0E99] transition-colors"
        >
          View Details
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
          Message
        </button>
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
                  <h1 className="text-3xl font-bold text-gray-900">Employee Onboarding</h1>
                  <p className="text-gray-600 mt-2">Manage and track new employee onboarding process</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate("/onboarding/templates")}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Manage Templates
                  </button>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                    Add New Hire
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total New Hires</p>
                    <p className="text-2xl font-bold text-gray-900">23</p>
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
                    <p className="text-2xl font-bold text-gray-900">8</p>
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
                    <p className="text-2xl font-bold text-gray-900">15</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                    <p className="text-2xl font-bold text-gray-900">87%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("new-hires")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "new-hires"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    New Hires
                  </button>
                  <button
                    onClick={() => setActiveTab("templates")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "templates"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Templates
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            {activeTab === "new-hires" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newHires.map((hire) => (
                  <OnboardingCard key={hire.id} hire={hire} />
                ))}
              </div>
            )}

            {activeTab === "templates" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onboardingTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                      <span>Department: {template.department}</span>
                      <span>{template.duration}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                      <span>{template.tasksCount} tasks</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4A0E99] transition-colors">
                        Use Template
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Add New Template Card */}
                <div className="bg-white rounded-lg shadow p-6 border border-gray-200 border-dashed flex flex-col items-center justify-center">
                  <div className="p-4 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Template</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Build a custom onboarding template for your team
                  </p>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#4A0E99] transition-colors">
                    Create Template
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Onboarding;