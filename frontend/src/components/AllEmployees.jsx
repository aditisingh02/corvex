import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AddPayroll from "./AddPayroll";
import { employeeService } from "../services/employeeService";
import { payrollService } from "../services/payrollService";
import { departmentService } from "../services/departmentService";
import { getStatusColorClass, formatStatus } from "../utils/employeeDataTransform";

const AllEmployees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddPayroll, setShowAddPayroll] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState({});
  const itemsPerPage = 10;

  // Fetch employees and departments
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Fetch employees with filters
        const employeeParams = {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
          department: selectedDepartment === "all" ? "" : selectedDepartment,
          status: selectedStatus === "all" ? "" : selectedStatus
        };
        
        const [employeeResponse, departmentResponse] = await Promise.all([
          employeeService.getAllEmployees(employeeParams),
          departmentService.getAllDepartments()
        ]);

        if (employeeResponse.success) {
          setEmployees(employeeResponse.data || []);
        } else {
          setError(employeeResponse.message || "Failed to fetch employees");
        }

        if (departmentResponse.success) {
          setDepartments(departmentResponse.data || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchQuery, selectedDepartment, selectedStatus]);

  // Refresh data when coming back to this page (e.g., after adding employee)
  useEffect(() => {
    const handleFocus = () => {
      // Refresh the employee list when the window regains focus
      const employeeParams = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        department: selectedDepartment === "all" ? "" : selectedDepartment,
        status: selectedStatus === "all" ? "" : selectedStatus
      };
      
      employeeService.getAllEmployees(employeeParams).then(response => {
        if (response.success) {
          setEmployees(response.data || []);
        }
      });
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [currentPage, searchQuery, selectedDepartment, selectedStatus]);

  // Handle employee actions
  const handleEmployeeAction = async (action, employeeId, additionalData = {}) => {
    try {
      setActionLoading(prev => ({ ...prev, [employeeId]: action }));
      
      let response;
      switch (action) {
        case "activate":
          response = await employeeService.updateEmployee(employeeId, { 
            ...additionalData, 
            status: "active" 
          });
          break;
        case "deactivate":
          response = await employeeService.updateEmployee(employeeId, { 
            ...additionalData, 
            status: "inactive" 
          });
          break;
        case "delete":
          if (!window.confirm("Are you sure you want to delete this employee?")) {
            return;
          }
          response = await employeeService.deleteEmployee(employeeId);
          break;
        case "promote":
          response = await employeeService.updateEmployee(employeeId, additionalData);
          break;
        default:
          throw new Error("Unknown action");
      }

      if (response.success) {
        // Refresh the employee list
        const employeeParams = {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
          department: selectedDepartment === "all" ? "" : selectedDepartment,
          status: selectedStatus === "all" ? "" : selectedStatus
        };
        const updatedResponse = await employeeService.getAllEmployees(employeeParams);
        if (updatedResponse.success) {
          setEmployees(updatedResponse.data || []);
        }
      } else {
        throw new Error(response.message || `Failed to ${action} employee`);
      }
    } catch (error) {
      console.error(`Error ${action} employee:`, error);
      alert(`Failed to ${action} employee: ${error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [employeeId]: null }));
    }
  };

  // Handle create payroll
  const handleCreatePayroll = (employee) => {
    setSelectedEmployee(employee);
    setShowAddPayroll(true);
  };

  // Handle view employee details
  const handleViewEmployee = (employee) => {
    navigate(`/employee/${employee._id}`);
  };

  // Handle employee added
  const handleAddEmployee = () => {
    navigate('/add-employee');
  };

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const fullName = `${employee.personalInfo?.firstName || ''} ${employee.personalInfo?.lastName || ''}`.toLowerCase();
    const employeeId = (employee.employeeId || '').toLowerCase();
    const email = (employee.user?.email || employee.personalInfo?.email || '').toLowerCase();
    const department = (employee.jobInfo?.department?.name || '').toLowerCase();
    const position = (employee.jobInfo?.position || '').toLowerCase();
    
    const searchLower = searchQuery.toLowerCase();
    
    const matchesSearch = 
      fullName.includes(searchLower) ||
      employeeId.includes(searchLower) ||
      email.includes(searchLower) ||
      department.includes(searchLower) ||
      position.includes(searchLower);

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  // Get status color using utility function
  const getStatusColor = (status) => getStatusColorClass(status);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error loading employees
                  </h3>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
              <p className="text-gray-600">Manage all employee records and HR operations</p>
            </div>
            <button
              onClick={handleAddEmployee}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Employee
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Employees</p>
                  <p className="text-2xl font-semibold text-gray-900">{employees.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {employees.filter(emp => emp.status === "active").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">On Leave</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {employees.filter(emp => emp.status === "on_leave").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-semibold text-gray-900">{departments.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, or employee ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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
                </div>
              </div>
              
              <div className="flex gap-4">
                {/* Department Filter */}
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        {employees.length === 0 ? "No employees found" : "No employees match your search"}
                      </td>
                    </tr>
                  ) : (
                    paginatedEmployees.map((employee) => (
                      <tr key={employee._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={employee.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.personalInfo?.firstName + ' ' + employee.personalInfo?.lastName)}&background=0ea5e9&color=fff`}
                                alt={`${employee.personalInfo?.firstName} ${employee.personalInfo?.lastName}`}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {employee.personalInfo?.firstName} {employee.personalInfo?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {employee.user?.email || employee.personalInfo?.email || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.employeeId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.jobInfo?.department?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.jobInfo?.position || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                            {employee.status ? employee.status.replace('_', ' ').toUpperCase() : "ACTIVE"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.compensation?.salary?.amount 
                            ? `${employee.compensation.salary.currency || '$'}${employee.compensation.salary.amount.toLocaleString()}`
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.jobInfo?.hireDate ? new Date(employee.jobInfo.hireDate).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {/* View Details */}
                            <button
                              onClick={() => handleViewEmployee(employee)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>

                            {/* Create Payroll */}
                            <button
                              onClick={() => handleCreatePayroll(employee)}
                              className="text-green-600 hover:text-green-900"
                              title="Create Payroll"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            </button>

                            {/* Status Toggle */}
                            {employee.status === "active" ? (
                              <button
                                onClick={() => handleEmployeeAction("deactivate", employee._id)}
                                disabled={actionLoading[employee._id] === "deactivate"}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                title="Deactivate"
                              >
                                {actionLoading[employee._id] === "deactivate" ? (
                                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                                  </svg>
                                )}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEmployeeAction("activate", employee._id)}
                                disabled={actionLoading[employee._id] === "activate"}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                                title="Activate"
                              >
                                {actionLoading[employee._id] === "activate" ? (
                                  <div className="w-5 h-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => handleEmployeeAction("delete", employee._id)}
                              disabled={actionLoading[employee._id] === "delete"}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              title="Delete"
                            >
                              {actionLoading[employee._id] === "delete" ? (
                                <div className="w-5 h-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">{startIndex + 1}</span> to{" "}
                      <span className="font-medium">
                        {Math.min(startIndex + itemsPerPage, filteredEmployees.length)}
                      </span>{" "}
                      of <span className="font-medium">{filteredEmployees.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddPayroll && selectedEmployee && (
        <AddPayroll
          onClose={() => {
            setShowAddPayroll(false);
            setSelectedEmployee(null);
          }}
          onSuccess={() => {
            setShowAddPayroll(false);
            setSelectedEmployee(null);
          }}
          preSelectedEmployee={selectedEmployee}
        />
      )}

      {/* Employee Details Modal */}
      {showEmployeeDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Employee Details</h2>
              <button
                onClick={() => {
                  setShowEmployeeDetails(false);
                  setSelectedEmployee(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Full Name:</span>
                    <p className="font-medium">{selectedEmployee.personalInfo?.firstName} {selectedEmployee.personalInfo?.lastName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium">{selectedEmployee.user?.email || selectedEmployee.personalInfo?.email || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Phone:</span>
                    <p className="font-medium">{selectedEmployee.personalInfo?.phone || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Date of Birth:</span>
                    <p className="font-medium">
                      {selectedEmployee.personalInfo?.dateOfBirth 
                        ? new Date(selectedEmployee.personalInfo.dateOfBirth).toLocaleDateString() 
                        : "N/A"
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Gender:</span>
                    <p className="font-medium">{selectedEmployee.personalInfo?.gender ? selectedEmployee.personalInfo.gender.replace('_', ' ').toUpperCase() : "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Address:</span>
                    <p className="font-medium">
                      {selectedEmployee.personalInfo?.address?.street && selectedEmployee.personalInfo?.address?.city
                        ? `${selectedEmployee.personalInfo.address.street}, ${selectedEmployee.personalInfo.address.city}, ${selectedEmployee.personalInfo.address.state} ${selectedEmployee.personalInfo.address.zipCode}`
                        : "N/A"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Job Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Employee ID:</span>
                    <p className="font-medium">{selectedEmployee.employeeId}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Department:</span>
                    <p className="font-medium">{selectedEmployee.jobInfo?.department?.name || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Position:</span>
                    <p className="font-medium">{selectedEmployee.jobInfo?.position || "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Level:</span>
                    <p className="font-medium">{selectedEmployee.jobInfo?.level ? selectedEmployee.jobInfo.level.replace('_', ' ').toUpperCase() : "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Employment Type:</span>
                    <p className="font-medium">{selectedEmployee.jobInfo?.employmentType ? selectedEmployee.jobInfo.employmentType.replace('_', ' ').toUpperCase() : "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Salary:</span>
                    <p className="font-medium">
                      {selectedEmployee.compensation?.salary?.amount 
                        ? `${selectedEmployee.compensation.salary.currency || '$'}${selectedEmployee.compensation.salary.amount.toLocaleString()} ${selectedEmployee.compensation.salary.frequency || 'yearly'}`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Hire Date:</span>
                    <p className="font-medium">
                      {selectedEmployee.jobInfo?.hireDate 
                        ? new Date(selectedEmployee.jobInfo.hireDate).toLocaleDateString() 
                        : "N/A"
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Work Location:</span>
                    <p className="font-medium">{selectedEmployee.jobInfo?.workLocation ? selectedEmployee.jobInfo.workLocation.replace('_', ' ').toUpperCase() : "N/A"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEmployee.status)}`}>
                      {selectedEmployee.status ? selectedEmployee.status.replace('_', ' ').toUpperCase() : "ACTIVE"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => handleCreatePayroll(selectedEmployee)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Create Payroll
              </button>
              <button
                onClick={() => {
                  setShowEmployeeDetails(false);
                  setSelectedEmployee(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
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

export default AllEmployees;
