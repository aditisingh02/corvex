import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    department: "",
    title: "",
    location: "",
    amount: "",
    type: "Office",
  });
  const itemsPerPage = 9;

  // Conversion rate USD to INR (example: 1 USD = 83 INR)
  const USD_TO_INR = 83;

  // Sample jobs data
  const jobsData = [
    {
      id: 1,
      title: "UI/UX Designer",
      department: "Design",
      location: "California, USA",
      salary: `₹${3500 * USD_TO_INR}`,
      period: "/Month",
      status: "Active",
      tags: ["Design", "UI/UX", "Figma"],
      type: "Full Time",
    },
    {
      id: 2,
      title: "Hr Executive",
      department: "Human Resources",
      location: "California, USA",
      salary: `₹${3600 * USD_TO_INR}`,
      period: "/Month",
      status: "Inactive",
      tags: ["Full Time", "Remote"],
      type: "Full Time",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "California, USA",
      salary: `₹${3500 * USD_TO_INR}`,
      period: "/Month",
      status: "Completed",
      tags: ["Design", "Full Time", "Remote"],
      type: "Full Time",
    },
    {
      id: 4,
      title: "Sr. UX Researcher",
      department: "Research",
      location: "New York, USA",
      salary: `₹${1500 * USD_TO_INR}`,
      period: "/Month",
      status: "Active",
      tags: ["Research", "Full Time"],
      type: "Full Time",
    },
    {
      id: 5,
      title: "Python Developer",
      department: "Engineering",
      location: "New York, USA",
      salary: `₹${1500 * USD_TO_INR}`,
      period: "/Month",
      status: "Inactive",
      tags: ["Engineering", "Python"],
      type: "Full Time",
    },
    {
      id: 6,
      title: "Sr. UX Researcher",
      department: "Research",
      location: "New York, USA",
      salary: `₹${1500 * USD_TO_INR}`,
      period: "/Month",
      status: "Completed",
      tags: ["Research", "Full Time"],
      type: "Full Time",
    },
    {
      id: 7,
      title: "BDM",
      department: "Business Development",
      location: "New York, USA",
      salary: `₹${1000 * USD_TO_INR}`,
      period: "/Month",
      status: "Active",
      tags: ["Sales", "Full Time"],
      type: "Full Time",
    },
    {
      id: 8,
      title: "BDM",
      department: "Business Development",
      location: "New York, USA",
      salary: `₹${1000 * USD_TO_INR}`,
      period: "/Month",
      status: "Completed",
      tags: ["Sales", "Full Time"],
      type: "Full Time",
    },
    {
      id: 9,
      title: "React JS",
      department: "Engineering",
      location: "California, USA",
      salary: `₹${2000 * USD_TO_INR}`,
      period: "/Month",
      status: "Active",
      tags: ["Engineering", "Full Time"],
      type: "Full Time",
    },
  ];

  // Filter jobs based on search and status
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      job.status.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // Get status counts
  const statusCounts = {
    active: jobsData.filter((job) => job.status === "Active").length,
    inactive: jobsData.filter((job) => job.status === "Inactive").length,
    completed: jobsData.filter((job) => job.status === "Completed").length,
  };

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Form handling functions
  const handleAddJob = () => {
    setShowAddJobModal(true);
  };

  const handleCloseModal = () => {
    setShowAddJobModal(false);
    setNewJob({
      department: "",
      title: "",
      location: "",
      amount: "",
      type: "Office",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitJob = (e) => {
    e.preventDefault();
    // Convert entered amount from USD to INR
    const inrAmount = `₹${parseInt(newJob.amount.replace(/[^0-9]/g, "")) * USD_TO_INR}`;
    const jobData = {
      ...newJob,
      salary: inrAmount,
    };
    // Here you would typically send jobData to your backend
    console.log("New job data:", jobData);
    // For now, just close the modal
    handleCloseModal();
    // You could also add the job to the local state if needed
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFilterButtonClass = (filter) => {
    return activeFilter === filter
      ? "bg-[#5E17EB] text-white"
      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
                <p className="text-gray-600 mt-2">
                  Manage job openings and track applications
                </p>
              </div>
              <button
                onClick={handleAddJob}
                className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Add New Job</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Status Filters */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveFilter("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${getFilterButtonClass(
                      "all"
                    )}`}
                  >
                    All Jobs
                  </button>
                  <button
                    onClick={() => setActiveFilter("active")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${getFilterButtonClass(
                      "active"
                    )}`}
                  >
                    Active Jobs ({statusCounts.active})
                  </button>
                  <button
                    onClick={() => setActiveFilter("inactive")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${getFilterButtonClass(
                      "inactive"
                    )}`}
                  >
                    Inactive Jobs ({statusCounts.inactive})
                  </button>
                  <button
                    onClick={() => setActiveFilter("completed")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${getFilterButtonClass(
                      "completed"
                    )}`}
                  >
                    Completed Jobs ({statusCounts.completed})
                  </button>
                </div>
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a1 1 0 001 1v1M16 6H8"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {job.department}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5E17EB] text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Location and Salary */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold text-gray-900">
                          {job.salary}
                          <span className="text-sm font-normal text-gray-600">
                            {job.period}
                          </span>
                        </div>
                        <button className="text-[#5E17EB] hover:text-[#4A0EC9] font-medium text-sm transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h2a1 1 0 001 1v1M16 6H8"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No jobs found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > itemsPerPage && (
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentPage === page
                              ? "bg-[#5E17EB] text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add New Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Add New Job
            </h2>

            <form onSubmit={handleSubmitJob} className="space-y-4">
              {/* Department Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Department
                </label>
                <select
                  name="department"
                  value={newJob.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Design">Design</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Research">Research</option>
                  <option value="Business Development">
                    Business Development
                  </option>
                </select>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  placeholder="Enter job title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Location
                </label>
                <select
                  name="location"
                  value={newJob.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                >
                  <option value="">Select Location</option>
                  <option value="California, USA">California, USA</option>
                  <option value="New York, USA">New York, USA</option>
                  <option value="Texas, USA">Texas, USA</option>
                  <option value="Florida, USA">Florida, USA</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Amount (USD)
                </label>
                <input
                  type="text"
                  name="amount"
                  value={newJob.amount}
                  onChange={handleInputChange}
                  placeholder="e.g., 3500"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Will be converted to INR</p>
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Type
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="Office"
                      checked={newJob.type === "Office"}
                      onChange={handleInputChange}
                      className="mr-2 text-[#5E17EB] focus:ring-[#5E17EB]"
                    />
                    Office
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value="Work from Home"
                      checked={newJob.type === "Work from Home"}
                      onChange={handleInputChange}
                      className="mr-2 text-[#5E17EB] focus:ring-[#5E17EB]"
                    />
                    Work from Home
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0EC9] transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;