import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getEmployeeById, getDefaultEmployeeData } from "../data/employeesData";

const ViewEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  // Get employee data based on ID from URL, or default data if not found
  const baseEmployee = getEmployeeById(employeeId);

  // If employee not found, redirect to all employees
  if (!baseEmployee) {
    navigate("/all-employees");
    return null;
  }

  // Get complete employee data with all sections
  const employee = getDefaultEmployeeData(baseEmployee);

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "attendance", label: "Attendance" },
    { id: "projects", label: "Projects" },
    { id: "leave", label: "Leave" },
    { id: "personal", label: "Personal Information" },
    { id: "professional", label: "Professional Information" },
    { id: "documents", label: "Documents" },
    { id: "account", label: "Account Access" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.firstName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.mobileNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.emailAddress}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.maritalStatus}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <p className="text-gray-900">{employee.personalInfo.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.nationality}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <p className="text-gray-900">{employee.personalInfo.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <p className="text-gray-900">{employee.personalInfo.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <p className="text-gray-900">{employee.personalInfo.country}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip
                </label>
                <p className="text-gray-900">{employee.personalInfo.zip}</p>
              </div>
            </div>
          </div>
        );

      case "personal":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.firstName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.mobileNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.emailAddress}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.dateOfBirth}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marital Status
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.maritalStatus}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <p className="text-gray-900">{employee.personalInfo.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <p className="text-gray-900">
                  {employee.personalInfo.nationality}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <p className="text-gray-900">{employee.personalInfo.address}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <p className="text-gray-900">{employee.personalInfo.city}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <p className="text-gray-900">{employee.personalInfo.country}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zip
                </label>
                <p className="text-gray-900">{employee.personalInfo.zip}</p>
              </div>
            </div>
          </div>
        );

      case "professional":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee ID
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.employeeId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.username}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee Type
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.employeeType}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.emailAddress}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.designation}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reporting Manager
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.reportingManager}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working Days
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.workingDays}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joining Date
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.joiningDate}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Office Location
                </label>
                <p className="text-gray-900">
                  {employee.professionalInfo.officeLocation}
                </p>
              </div>
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="space-y-4">
              {employee.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-900 font-medium">
                      {doc.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
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
                    <button className="p-2 text-gray-400 hover:text-gray-600">
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "account":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{employee.accountAccess.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <p className="text-gray-900">
                  {employee.accountAccess.skypeId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skype ID
                </label>
                <p className="text-gray-900">
                  {employee.accountAccess.skypeId}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Github ID
                </label>
                <p className="text-gray-900">
                  {employee.accountAccess.githubId}
                </p>
              </div>
            </div>
          </div>
        );

      case "attendance":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Check In
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Check Out
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Break
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Working Hours
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employee.attendance.map((record, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {record.date}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {record.checkIn}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {record.checkOut}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {record.break}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {record.workingHours}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === "On time"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Sr. No.
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Project Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Start Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Finish Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employee.projects.map((project) => (
                    <tr key={project.srNo} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {project.srNo}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {project.projectName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {project.startDate}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {project.finishDate}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "leave":
        return (
          <div className="bg-white rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Duration
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Days
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Reporting Manager
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employee.leaves.map((leave, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {leave.date}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {leave.duration}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {leave.days}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {leave.reportingManager}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            leave.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : leave.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <button
              onClick={() => navigate("/all-employees")}
              className="hover:text-[#5E17EB]"
            >
              All Employees
            </button>
            <span>›</span>
            <span className="text-gray-900">{employee.name}</span>
          </div>

          {/* Employee Header */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {employee.name}
                  </h1>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.414a1 1 0 01-.293.707l-5.414 5.414a1 1 0 01-.707.293H7a2 2 0 01-2-2V8a2 2 0 012-2h2"
                        />
                      </svg>
                      <span className="text-gray-600">
                        {employee.designation}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-600">{employee.email}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/edit-employee/${employee.id}`)}
                className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A12C7] transition-colors flex items-center space-x-2"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;