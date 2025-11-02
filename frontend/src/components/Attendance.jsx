import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { attendanceService } from "../services/attendanceService";

const Attendance = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("today");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todayStatus, setTodayStatus] = useState(null);
  const itemsPerPage = 10;

  // Fetch attendance data from backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await attendanceService.getAllAttendance();
        if (response.success) {
          setAttendanceData(response.data || []);
        } else {
          setError(response.message || "Failed to fetch attendance data");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [dateFilter]);

  // Fetch today's attendance status
  useEffect(() => {
    const fetchTodayStatus = async () => {
      try {
        const response = await attendanceService.getTodayStatus();
        if (response.success) {
          setTodayStatus(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch today's status:", err);
      }
    };

    fetchTodayStatus();
  }, []);

  // Clock In function
  const handleClockIn = async () => {
    try {
      const response = await attendanceService.clockIn();
      if (response.success) {
        // Refresh data
        const updatedResponse = await attendanceService.getTodayStatus();
        if (updatedResponse.success) {
          setTodayStatus(updatedResponse.data);
        }
        alert("Clocked in successfully!");
      } else {
        alert(response.message || "Failed to clock in");
      }
    } catch (err) {
      alert(err.message || "Failed to clock in");
    }
  };

  // Clock Out function
  const handleClockOut = async () => {
    try {
      const response = await attendanceService.clockOut();
      if (response.success) {
        // Refresh data
        const updatedResponse = await attendanceService.getTodayStatus();
        if (updatedResponse.success) {
          setTodayStatus(updatedResponse.data);
        }
        alert("Clocked out successfully!");
      } else {
        alert(response.message || "Failed to clock out");
      }
    } catch (err) {
      alert(err.message || "Failed to clock out");
    }
  };

  // Filter employees based on search and filters
  const filteredAttendance = attendanceData.filter((record) => {
    const employee = record.employee;
    const fullName = `${employee?.firstName} ${employee?.lastName}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      employee?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.employeeId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttendance = filteredAttendance.slice(startIndex, startIndex + itemsPerPage);

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "--:--";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "absent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading attendance data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <svg className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 font-medium">Error loading attendance data</p>
                <p className="text-red-500 text-sm mt-1">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance</h1>
            <p className="text-gray-600">
              Track and manage employee attendance
            </p>
          </div>

          {/* Today's Status Card */}
          {todayStatus && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Status</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Check In: <span className="font-medium">{formatTime(todayStatus.checkIn)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Check Out: <span className="font-medium">{formatTime(todayStatus.checkOut)}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(todayStatus.status)}`}>
                        {todayStatus.status}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {!todayStatus.checkIn ? (
                    <button
                      onClick={handleClockIn}
                      className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0EC9] transition-colors"
                    >
                      Clock In
                    </button>
                  ) : !todayStatus.checkOut ? (
                    <button
                      onClick={handleClockOut}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Clock Out
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
                      Day Complete
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              {/* Search */}
              <div className="relative w-80">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                />
              </div>

              {/* Export Button */}
              <button className="flex items-center px-4 py-2.5 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0EC9] transition-colors">
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
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
              </select>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                <div className="col-span-3">Employee</div>
                <div className="col-span-2">Employee ID</div>
                <div className="col-span-2">Check In</div>
                <div className="col-span-2">Check Out</div>
                <div className="col-span-1">Work Hours</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-1">Action</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {paginatedAttendance.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-sm font-medium text-gray-900">No attendance records found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchQuery ? "Try adjusting your search terms" : "Attendance records will appear here"}
                  </p>
                </div>
              ) : (
                paginatedAttendance.map((record) => (
                  <div
                    key={record._id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Employee */}
                      <div className="col-span-3 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-[#5E17EB] text-white flex items-center justify-center font-medium">
                          {record.employee?.firstName?.charAt(0)}{record.employee?.lastName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {record.employee?.firstName} {record.employee?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{record.employee?.jobTitle}</p>
                        </div>
                      </div>

                      {/* Employee ID */}
                      <div className="col-span-2">
                        <p className="text-gray-600">{record.employee?.employeeId || record.employee?._id?.slice(-8)}</p>
                      </div>

                      {/* Check In */}
                      <div className="col-span-2">
                        <p className="text-gray-600">{formatTime(record.checkIn)}</p>
                      </div>

                      {/* Check Out */}
                      <div className="col-span-2">
                        <p className="text-gray-600">{formatTime(record.checkOut)}</p>
                      </div>

                      {/* Work Hours */}
                      <div className="col-span-1">
                        <p className="text-gray-600">{record.totalHours || "--"}</p>
                      </div>

                      {/* Status */}
                      <div className="col-span-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status || "Unknown"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1">
                        <button className="p-1 text-gray-400 hover:text-[#5E17EB] transition-colors">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAttendance.length)} of {filteredAttendance.length} records
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
