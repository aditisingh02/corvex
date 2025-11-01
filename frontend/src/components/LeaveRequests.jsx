import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const LeaveRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // Mock leave requests data
  const leaveRequests = [
    {
      id: 1,
      employeeName: "Sarah Johnson",
      employeeId: "EMP001",
      department: "Engineering",
      leaveType: "Annual Leave",
      startDate: "2025-11-15",
      endDate: "2025-11-20",
      days: 6,
      reason: "Family vacation",
      status: "pending",
      appliedDate: "2025-10-20",
      approver: "John Smith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      employeeName: "Michael Chen",
      employeeId: "EMP002",
      department: "Engineering",
      leaveType: "Sick Leave",
      startDate: "2025-11-08",
      endDate: "2025-11-09",
      days: 2,
      reason: "Medical checkup",
      status: "approved",
      appliedDate: "2025-11-05",
      approver: "John Smith",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      employeeName: "Emily Davis",
      employeeId: "EMP003",
      department: "Design",
      leaveType: "Personal Leave",
      startDate: "2025-11-25",
      endDate: "2025-11-27",
      days: 3,
      reason: "Personal matters",
      status: "rejected",
      appliedDate: "2025-10-15",
      approver: "Alex Kumar",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 4,
      employeeName: "David Rodriguez",
      employeeId: "EMP004",
      department: "Marketing",
      leaveType: "Maternity/Paternity Leave",
      startDate: "2025-12-01",
      endDate: "2025-12-31",
      days: 31,
      reason: "Paternity leave for newborn",
      status: "approved",
      appliedDate: "2025-10-01",
      approver: "Lisa Wong",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    }
  ];

  const leaveBalance = [
    { type: "Annual Leave", total: 25, used: 12, remaining: 13 },
    { type: "Sick Leave", total: 10, used: 3, remaining: 7 },
    { type: "Personal Leave", total: 5, used: 1, remaining: 4 },
    { type: "Maternity/Paternity", total: 90, used: 0, remaining: 90 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case "Annual Leave":
        return "bg-blue-100 text-blue-800";
      case "Sick Leave":
        return "bg-red-100 text-red-800";
      case "Personal Leave":
        return "bg-purple-100 text-purple-800";
      case "Maternity/Paternity Leave":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = leaveRequests.filter(request => {
    if (activeTab === "pending") return request.status === "pending";
    if (activeTab === "approved") return request.status === "approved";
    if (activeTab === "rejected") return request.status === "rejected";
    return true;
  });

  const handleApprove = (id) => {
    console.log("Approving leave request:", id);
    // Implementation for approval
  };

  const handleReject = (id) => {
    console.log("Rejecting leave request:", id);
    // Implementation for rejection
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
                  <h1 className="text-3xl font-bold text-gray-900">Leave Requests</h1>
                  <p className="text-gray-600 mt-2">Manage employee leave applications and approvals</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate("/leave-calendar")}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Leave Calendar
                  </button>
                  <button
                    onClick={() => navigate("/leave-policies")}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Leave Policies
                  </button>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                    Apply Leave
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{leaveRequests.length}</p>
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
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {leaveRequests.filter(r => r.status === "pending").length}
                    </p>
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
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {leaveRequests.filter(r => r.status === "approved").length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-red-100">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {leaveRequests.filter(r => r.status === "rejected").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Leave Requests */}
              <div className="lg:col-span-2">
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
                        All Requests
                      </button>
                      <button
                        onClick={() => setActiveTab("pending")}
                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "pending"
                            ? "border-[#5E17EB] text-[#5E17EB]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Pending ({leaveRequests.filter(r => r.status === "pending").length})
                      </button>
                      <button
                        onClick={() => setActiveTab("approved")}
                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "approved"
                            ? "border-[#5E17EB] text-[#5E17EB]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => setActiveTab("rejected")}
                        className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "rejected"
                            ? "border-[#5E17EB] text-[#5E17EB]"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Rejected
                      </button>
                    </nav>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Leave Requests</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <div key={request.id} className="p-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              className="h-12 w-12 rounded-full"
                              src={request.avatar}
                              alt={request.employeeName}
                            />
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">
                                {request.employeeName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {request.employeeId} • {request.department}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLeaveTypeColor(request.leaveType)}`}>
                              {request.leaveType}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Duration:</span> {request.startDate} to {request.endDate} ({request.days} days)
                          </div>
                          <div>
                            <span className="font-medium">Applied:</span> {request.appliedDate}
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">Reason:</span> {request.reason}
                          </div>
                          <div>
                            <span className="font-medium">Approver:</span> {request.approver}
                          </div>
                        </div>
                        
                        {request.status === "pending" && (
                          <div className="mt-4 flex space-x-2">
                            <button
                              onClick={() => handleApprove(request.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                            >
                              Reject
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        )}
                        
                        {request.status !== "pending" && (
                          <div className="mt-4">
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leave Balance */}
              <div>
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Leave Balance Overview</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {leaveBalance.map((balance, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-900">{balance.type}</h4>
                            <span className="text-sm text-gray-600">
                              {balance.remaining}/{balance.total} days
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div
                              className="bg-[#5E17EB] h-2 rounded-full"
                              style={{ width: `${(balance.used / balance.total) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Used: {balance.used} days</span>
                            <span>Remaining: {balance.remaining} days</span>
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
                      Apply for Leave
                    </button>
                    <button
                      onClick={() => navigate("/leave-calendar")}
                      className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      View Leave Calendar
                    </button>
                    <button
                      onClick={() => navigate("/leave-policies")}
                      className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Leave Policies
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Download Report
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

export default LeaveRequests;