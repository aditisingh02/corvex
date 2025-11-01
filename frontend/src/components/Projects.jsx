import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Projects = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  // Mock projects data
  const projects = [
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      client: "TechCorp Inc.",
      manager: "John Smith",
      status: "active",
      priority: "high",
      progress: 75,
      startDate: "2025-09-01",
      endDate: "2025-12-15",
      budget: 150000,
      spent: 112500,
      teamSize: 8,
      description: "Complete redesign of the e-commerce platform with modern UI/UX and improved performance",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      team: [
        { name: "Sarah Johnson", role: "Frontend Developer", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face" },
        { name: "Michael Chen", role: "Backend Developer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" },
        { name: "Emily Davis", role: "UX Designer", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" }
      ]
    },
    {
      id: 2,
      name: "Mobile Banking App",
      client: "FinanceBank",
      manager: "Lisa Wong",
      status: "active",
      priority: "medium",
      progress: 45,
      startDate: "2025-10-01",
      endDate: "2026-03-30",
      budget: 200000,
      spent: 90000,
      teamSize: 6,
      description: "Development of a secure mobile banking application with biometric authentication",
      technologies: ["React Native", "Express.js", "MongoDB", "Firebase"],
      team: [
        { name: "David Rodriguez", role: "Mobile Developer", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" },
        { name: "Anna Kim", role: "Security Specialist", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" }
      ]
    },
    {
      id: 3,
      name: "HR Management System",
      client: "Internal",
      manager: "Alex Kumar",
      status: "completed",
      priority: "low",
      progress: 100,
      startDate: "2025-06-01",
      endDate: "2025-09-30",
      budget: 80000,
      spent: 75000,
      teamSize: 4,
      description: "Internal HR management system for employee data and workflow management",
      technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
      team: [
        { name: "Tom Wilson", role: "Full Stack Developer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" }
      ]
    },
    {
      id: 4,
      name: "Data Analytics Dashboard",
      client: "DataCorp",
      manager: "Priya Sharma",
      status: "on-hold",
      priority: "medium",
      progress: 30,
      startDate: "2025-08-15",
      endDate: "2025-11-30",
      budget: 120000,
      spent: 36000,
      teamSize: 5,
      description: "Real-time data analytics dashboard with machine learning insights",
      technologies: ["Python", "Django", "React", "TensorFlow"],
      team: [
        { name: "James Brown", role: "Data Scientist", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProjects = projects.filter(project => {
    if (activeTab === "active") return project.status === "active";
    if (activeTab === "completed") return project.status === "completed";
    if (activeTab === "on-hold") return project.status === "on-hold";
    return true;
  });

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === "active").length,
    completed: projects.filter(p => p.status === "completed").length,
    onHold: projects.filter(p => p.status === "on-hold").length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0)
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
                  <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                  <p className="text-gray-600 mt-2">Manage and track all company projects</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate("/timesheet")}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Timesheet
                  </button>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                    Create Project
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{projectStats.total}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{projectStats.active}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{projectStats.completed}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Budget</p>
                    <p className="text-2xl font-bold text-gray-900">${(projectStats.totalBudget / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "all"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    All Projects
                  </button>
                  <button
                    onClick={() => setActiveTab("active")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "active"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Active ({projectStats.active})
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "completed"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Completed ({projectStats.completed})
                  </button>
                  <button
                    onClick={() => setActiveTab("on-hold")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "on-hold"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    On Hold ({projectStats.onHold})
                  </button>
                </nav>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                          {project.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span>Client: {project.client}</span>
                        <span>Manager: {project.manager}</span>
                        <span>Team: {project.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#5E17EB] h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Budget Info */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Budget Usage</span>
                      <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(project.spent / project.budget) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Start: {project.startDate}</span>
                    <span>End: {project.endDate}</span>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Team Members</p>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((member, index) => (
                        <img
                          key={index}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                          src={member.avatar}
                          alt={member.name}
                          title={`${member.name} - ${member.role}`}
                        />
                      ))}
                      {project.team.length > 4 && (
                        <div className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-500 text-xs font-medium text-white">
                          +{project.team.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-200">
                    <button className="flex-1 bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4A0E99] transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                    <button
                      onClick={() => navigate("/timesheet")}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Log Time
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Project Card */}
            <div className="mt-6">
              <div className="bg-white rounded-lg shadow p-8 border-2 border-dashed border-gray-300 text-center">
                <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Project</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Start a new project and organize your team's work efficiently
                </p>
                <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;