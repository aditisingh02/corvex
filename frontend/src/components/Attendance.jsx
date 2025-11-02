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
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showManualAttendanceModal, setShowManualAttendanceModal] = useState(false);
  const [manualAttendanceForm, setManualAttendanceForm] = useState({
    date: new Date().toISOString().split('T')[0],
    action: 'checkIn', // 'checkIn' or 'checkOut'
    reason: '',
    remarks: ''
  });
  const itemsPerPage = 10;

  // Fetch attendance data from backend
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        // Build query parameters based on filters
        const params = {};
        
        // Date filtering
        const today = new Date();
        switch (dateFilter) {
          case 'today':
            params.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
            params.endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
            break;
          case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            params.startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toISOString();
            params.endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1).toISOString();
            break;
          case 'thisWeek':
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            params.startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()).toISOString();
            break;
          case 'thisMonth':
            params.startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
            break;
          default:
            // Get last 30 days by default
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 30);
            params.startDate = thirtyDaysAgo.toISOString();
        }

        const response = await attendanceService.getAllAttendance(params);
        if (response.success) {
          setAttendanceData(response.data || []);
        } else {
          setError(response.message || "Failed to fetch attendance data");
        }
      } catch (err) {
        console.error('Fetch attendance error:', err);
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
        console.log('Fetching today\'s status...');
        const response = await attendanceService.getTodayStatus();
        console.log('Today\'s status response:', response);
        if (response.success) {
          setTodayStatus(response.data);
          console.log('Set today\'s status to:', response.data);
        }
      } catch (err) {
        console.error("Failed to fetch today's status:", err);
      }
    };

    fetchTodayStatus();
  }, []);

  // Handle view attendance details
  const handleViewAttendance = (record) => {
    setSelectedAttendance(record);
    setShowViewModal(true);
  };

  // Close view modal
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedAttendance(null);
  };

  // Handle manual attendance
  const handleManualAttendance = () => {
    setShowManualAttendanceModal(true);
  };

  const closeManualAttendanceModal = () => {
    setShowManualAttendanceModal(false);
    setManualAttendanceForm({
      date: new Date().toISOString().split('T')[0],
      action: 'checkIn',
      reason: '',
      remarks: ''
    });
  };

  const handleManualAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentTimestamp = new Date();
      
      // Prepare attendance data based on action
      const attendanceData = {
        date: manualAttendanceForm.date,
        action: manualAttendanceForm.action,
        timestamp: currentTimestamp.toISOString(),
        reason: manualAttendanceForm.reason,
        remarks: manualAttendanceForm.remarks
      };

      // Call API to save manual attendance
      console.log('Submitting manual attendance data:', attendanceData);
      const response = await attendanceService.manualAttendance(attendanceData);
      
      if (response.success) {
        // Update today's status immediately if the date is today
        const today = new Date().toISOString().split('T')[0];
        if (manualAttendanceForm.date === today) {
          // Refresh today's status from server
          try {
            console.log('Refreshing today\'s status after manual attendance...');
            const updatedTodayStatus = await attendanceService.getTodayStatus();
            console.log('Updated today\'s status response:', updatedTodayStatus);
            if (updatedTodayStatus.success) {
              setTodayStatus(updatedTodayStatus.data);
              console.log('Updated today\'s status to:', updatedTodayStatus.data);
            }
          } catch (err) {
            console.error("Failed to refresh today's status:", err);
          }
        }
        
        // Show success message with timestamp
        const timeString = currentTimestamp.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });
        
        alert(`Manual ${manualAttendanceForm.action === 'checkIn' ? 'Check In' : 'Check Out'} marked successfully at ${timeString}!`);
        closeManualAttendanceModal();
        
        // Refresh attendance data
        const fetchAttendance = async () => {
          try {
            // Build query parameters based on filters
            const params = {};
            
            // Date filtering
            const today = new Date();
            switch (dateFilter) {
              case 'today':
                params.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
                params.endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
                break;
              case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                params.startDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toISOString();
                params.endDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1).toISOString();
                break;
              case 'thisWeek':
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                params.startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate()).toISOString();
                break;
              case 'thisMonth':
                params.startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
                break;
              default:
                // Get last 30 days by default
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);
                params.startDate = thirtyDaysAgo.toISOString();
            }

            const attendanceResponse = await attendanceService.getAllAttendance(params);
            if (attendanceResponse.success) {
              setAttendanceData(attendanceResponse.data || []);
            }
          } catch (err) {
            console.error('Error refreshing attendance data:', err);
          }
        };
        
        // Refresh attendance data
        await fetchAttendance();
      } else {
        alert(response.message || 'Failed to mark attendance. Please try again.');
      }
      
    } catch (error) {
      console.error('Error marking manual attendance:', error);
      alert('Failed to mark attendance. Please try again.');
    }
  };

  // Clock In function
  const handleClockIn = async () => {
    try {
      const response = await attendanceService.clockIn();
      if (response.success) {
        // Refresh today's status
        const updatedResponse = await attendanceService.getTodayStatus();
        if (updatedResponse.success) {
          setTodayStatus(updatedResponse.data);
        }
        
        // Refresh attendance data for the table
        const fetchAttendance = async () => {
          try {
            const params = {};
            const today = new Date();
            switch (dateFilter) {
              case 'today':
                params.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
                params.endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
                break;
              default:
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);
                params.startDate = thirtyDaysAgo.toISOString();
            }
            const attendanceResponse = await attendanceService.getAllAttendance(params);
            if (attendanceResponse.success) {
              setAttendanceData(attendanceResponse.data || []);
            }
          } catch (err) {
            console.error('Error refreshing attendance data:', err);
          }
        };
        
        await fetchAttendance();
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
        // Refresh today's status
        const updatedResponse = await attendanceService.getTodayStatus();
        if (updatedResponse.success) {
          setTodayStatus(updatedResponse.data);
        }
        
        // Refresh attendance data for the table
        const fetchAttendance = async () => {
          try {
            const params = {};
            const today = new Date();
            switch (dateFilter) {
              case 'today':
                params.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
                params.endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
                break;
              default:
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);
                params.startDate = thirtyDaysAgo.toISOString();
            }
            const attendanceResponse = await attendanceService.getAllAttendance(params);
            if (attendanceResponse.success) {
              setAttendanceData(attendanceResponse.data || []);
            }
          } catch (err) {
            console.error('Error refreshing attendance data:', err);
          }
        };
        
        await fetchAttendance();
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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Status</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Check In: <span className="font-medium">{todayStatus?.checkIn ? formatTime(todayStatus.checkIn) : '--:--'}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Check Out: <span className="font-medium">{todayStatus?.checkOut ? formatTime(todayStatus.checkOut) : '--:--'}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(todayStatus?.status || 'absent')}`}>
                      {todayStatus?.status || 'Not clocked in'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-3">
                  {!todayStatus?.checkIn ? (
                    <button
                      onClick={handleClockIn}
                      className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0EC9] transition-colors"
                    >
                      Clock In
                    </button>
                  ) : !todayStatus?.checkOut ? (
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
                <button
                  onClick={handleManualAttendance}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Mark Manual Attendance
                </button>
              </div>
            </div>
          </div>

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
                        <button 
                          onClick={() => handleViewAttendance(record)}
                          className="p-1 text-gray-400 hover:text-[#5E17EB] transition-colors"
                          title="View Details"
                        >
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

      {/* Manual Attendance Modal */}
      {showManualAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Mark Manual Attendance</h2>
              <button
                onClick={closeManualAttendanceModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleManualAttendanceSubmit} className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Manual Attendance Entry</p>
                    <p className="text-sm text-blue-700 mt-1">
                      This will record your attendance with the current timestamp. Use when automatic check-in/out isn't working.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={manualAttendanceForm.date}
                  onChange={(e) => setManualAttendanceForm({...manualAttendanceForm, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                <select
                  value={manualAttendanceForm.action}
                  onChange={(e) => setManualAttendanceForm({...manualAttendanceForm, action: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                >
                  <option value="checkIn">Check In</option>
                  <option value="checkOut">Check Out</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Current time will be used: {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Manual Entry</label>
                <select
                  value={manualAttendanceForm.reason}
                  onChange={(e) => setManualAttendanceForm({...manualAttendanceForm, reason: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="System malfunction">System malfunction</option>
                  <option value="Forgot to clock in/out">Forgot to clock in/out</option>
                  <option value="Network issues">Network issues</option>
                  <option value="Working from different location">Working from different location</option>
                  <option value="Emergency situation">Emergency situation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Remarks</label>
                <textarea
                  value={manualAttendanceForm.remarks}
                  onChange={(e) => setManualAttendanceForm({...manualAttendanceForm, remarks: e.target.value})}
                  placeholder="Any additional details about this attendance entry..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent resize-none"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end pt-4 space-x-3">
                <button
                  type="button"
                  onClick={closeManualAttendanceModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0EC9] transition-colors"
                >
                  Mark {manualAttendanceForm.action === 'checkIn' ? 'Check In' : 'Check Out'} Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Attendance Details Modal */}
      {showViewModal && selectedAttendance && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Attendance Details</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedAttendance.employee.firstName} {selectedAttendance.employee.lastName} • {new Date(selectedAttendance.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={closeViewModal}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Employee Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Employee Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedAttendance.employee.firstName} {selectedAttendance.employee.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employee ID:</span>
                      <span className="font-medium">{selectedAttendance.employee.employeeId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Position:</span>
                      <span className="font-medium">{selectedAttendance.employee.jobTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{selectedAttendance.employee.department}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Attendance Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(selectedAttendance.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAttendance.status)}`}>
                        {selectedAttendance.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Working Hours:</span>
                      <span className="font-medium">{selectedAttendance.totalHours || '--'}</span>
                    </div>
                    {selectedAttendance.lateArrival && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Late Arrival:</span>
                        <span className="text-red-600 font-medium">Yes</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Time Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Check In</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{formatTime(selectedAttendance.checkIn)}</p>
                        <p className="text-sm text-gray-600">Check In Time</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Check Out</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{formatTime(selectedAttendance.checkOut)}</p>
                        <p className="text-sm text-gray-600">Check Out Time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Breaks Information */}
              {selectedAttendance.breaks && selectedAttendance.breaks.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Breaks</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="space-y-3">
                      {selectedAttendance.breaks.map((breakItem, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 capitalize">{breakItem.type} Break</p>
                              <p className="text-sm text-gray-600">
                                {formatTime(breakItem.startTime)} - {formatTime(breakItem.endTime)}
                              </p>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {breakItem.duration} min
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Remarks */}
              {selectedAttendance.remarks && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Remarks</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedAttendance.remarks}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-6 border-t border-gray-200 space-x-3">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
