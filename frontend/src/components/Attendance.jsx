import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample attendance data
  const attendanceData = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Leslie Watson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612c2d5?w=40&h=40&fit=crop&crop=face",
      designation: "Team Lead - Design",
      type: "Office",
      checkIn: "09:27 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Dianne Robertson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      designation: "Web Designer",
      type: "Office",
      checkIn: "10:15 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Jacob Jones",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      designation: "Financial Assistant",
      type: "Remote",
      checkIn: "10:24 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Kathryn Murphy",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face",
      designation: "Marketing Coordinator",
      type: "Office",
      checkIn: "09:43 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Leslie Alexander",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      designation: "Data Analyst",
      type: "Office",
      checkIn: "09:35 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 6,
      employeeId: "EMP006",
      name: "Ronald Richards",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      designation: "Product Developer",
      type: "Remote",
      checkIn: "09:28 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 7,
      employeeId: "EMP007",
      name: "Guy Hawkins",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      designation: "UI/UX Designer",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 8,
      employeeId: "EMP008",
      name: "Albert Flores",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      designation: "React JS",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 9,
      employeeId: "EMP009",
      name: "Savannah Nguyen",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      designation: "iOS Developer",
      type: "Remote",
      checkIn: "10:60 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 10,
      employeeId: "EMP010",
      name: "Marvin McKinney",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face",
      designation: "HR",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 11,
      employeeId: "EMP011",
      name: "Jerome Bell",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&crop=face",
      designation: "Sales Manager",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 12,
      employeeId: "EMP012",
      name: "Jenny Wilson",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      designation: "React JS Developer",
      type: "Remote",
      checkIn: "11:30 AM",
      status: "Late",
      statusColor: "bg-red-100 text-red-800",
    },
  ];

  // Filter attendance data based on search and filters
  const filteredAttendance = attendanceData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      employee.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAttendance = filteredAttendance.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
              <p className="text-gray-600 mt-2">
                Track and manage employee attendance records
              </p>
            </div>

            {/* Filters and Search */}
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
                      placeholder="Search by name, designation, or employee ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="on time">On Time</option>
                    <option value="late">Late</option>
                    <option value="absent">Absent</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 items-center">
                  <div className="col-span-1">Employee ID</div>
                  <div className="col-span-3 flex items-center">
                    Employee Name
                  </div>
                  <div className="col-span-3">Designation</div>
                  <div className="col-span-1">Type</div>
                  <div className="col-span-2">Check-in Time</div>
                  <div className="col-span-2">Status</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {currentAttendance.length > 0 ? (
                  currentAttendance.map((employee) => (
                    <div
                      key={employee.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Employee ID */}
                        <div className="col-span-1 text-sm">
                          <p className="text-gray-600">{employee.employeeId}</p>
                        </div>

                        {/* Employee Name */}
                        <div className="col-span-3 flex items-center space-x-3">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {employee.name}
                            </p>
                          </div>
                        </div>

                        {/* Designation */}
                        <div className="col-span-3">
                          <p className="text-gray-600 text-sm">
                            {employee.designation}
                          </p>
                        </div>

                        {/* Type */}
                        <div className="col-span-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              employee.type === "Office"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {employee.type}
                          </span>
                        </div>

                        {/* Check-in Time */}
                        <div className="col-span-2">
                          <p className="text-gray-900 text-sm font-medium">
                            {employee.checkIn}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.statusColor}`}
                          >
                            {employee.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No attendance records found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {filteredAttendance.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredAttendance.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredAttendance.length}
                  </span>{" "}
                  results
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
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
                          onClick={() => handlePageChange(page)}
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
                    onClick={() => handlePageChange(currentPage + 1)}
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
    </div>
  );
};

export default Attendance;
