import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AddNewEmployee = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newEmployeeId, setNewEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",

    // Professional Information
    employeeId: "",
    department: "",
    designation: "",
    joiningDate: "",
    employmentType: "",
    workLocation: "",
    workingDays: "",
    reportingManager: "",
    salary: "",

    // Documents
    appointmentLetter: null,
    salarySlips: null,
    relievingLetter: null,
    experienceLetter: null,

    // Account Access
    enterEmailAddress: "",
    enterSlackId: "",
    enterSkypeId: "",
    enterGithubId: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      icon: (
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "professional",
      label: "Professional Information",
      icon: (
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
          />
        </svg>
      ),
    },
    {
      id: "documents",
      label: "Documents",
      icon: (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: "account",
      label: "Account Access",
      icon: (
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
            d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2a2 2 0 01-2-2M9 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2H9z"
          />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Simulate generating a new employee ID
    const generatedId = Math.random().toString(36).substr(2, 8);
    setNewEmployeeId(generatedId);
    setShowSuccessModal(true);
    // You can add form validation and API call here
  };

  const renderPersonalInformation = () => (
    <div className="space-y-6">
      {/* Profile Picture Upload */}
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <button className="text-[#5E17EB] hover:text-[#4A0EC9] font-medium">
            Upload Photo
          </button>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter mobile number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marital Status
          </label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select marital status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationality *
          </label>
          <select
            value={formData.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select nationality</option>
            <option value="indian">Indian</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          placeholder="Enter complete address"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select city</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="pune">Pune</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select state</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="delhi">Delhi</option>
            <option value="karnataka">Karnataka</option>
            <option value="gujarat">Gujarat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pin Code *
          </label>
          <input
            type="text"
            value={formData.pinCode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Only allow digits
              if (value.length <= 6) {
                handleInputChange("pinCode", value);
              }
            }}
            maxLength={6}
            pattern="[0-9]{6}"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter 6-digit pin code"
          />
        </div>
      </div>
    </div>
  );

  const renderProfessionalInformation = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee ID *
          </label>
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => handleInputChange("employeeId", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter employee ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User Name *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter user name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Employee Type *
          </label>
          <select
            value={formData.employmentType}
            onChange={(e) =>
              handleInputChange("employmentType", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select employee type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="intern">Intern</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.emailAddress}
            onChange={(e) => handleInputChange("emailAddress", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Department *
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select department</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">Human Resources</option>
            <option value="finance">Finance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Designation *
          </label>
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter designation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Working Days *
          </label>
          <select
            value={formData.workingDays}
            onChange={(e) => handleInputChange("workingDays", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          >
            <option value="">Select working days</option>
            <option value="5-days">5 Days (Mon-Fri)</option>
            <option value="6-days">6 Days (Mon-Sat)</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Joining Date *
          </label>
          <input
            type="date"
            value={formData.joiningDate}
            onChange={(e) => handleInputChange("joiningDate", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Office Location *
        </label>
        <select
          value={formData.workLocation}
          onChange={(e) => handleInputChange("workLocation", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
        >
          <option value="">Select office location</option>
          <option value="mumbai">Mumbai Office</option>
          <option value="delhi">Delhi Office</option>
          <option value="bangalore">Bangalore Office</option>
          <option value="pune">Pune Office</option>
          <option value="remote">Remote</option>
        </select>
      </div>
    </div>
  );

  const renderDocuments = () => {
    const handleFileUpload = (field, file) => {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    };

    const DocumentUploadBox = ({
      title,
      field,
      acceptedFormats = ".pdf,.doc,.docx",
    }) => (
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#5E17EB] transition-colors">
        <div className="mb-4">
          <div className="w-12 h-12 bg-[#5E17EB] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
          <p className="text-xs text-gray-500 mb-4">
            Drag & Drop or{" "}
            <button
              type="button"
              className="text-[#5E17EB] hover:text-[#4A0EC9] font-medium"
              onClick={() => document.getElementById(field).click()}
            >
              choose file
            </button>{" "}
            to upload
          </p>
          <p className="text-xs text-gray-400">
            Supported formats: {acceptedFormats}
          </p>
        </div>

        <input
          id={field}
          type="file"
          accept={acceptedFormats}
          onChange={(e) => handleFileUpload(field, e.target.files[0])}
          className="hidden"
        />

        {formData[field] && (
          <div className="mt-3 p-2 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 truncate">
              {formData[field].name}
            </p>
            <button
              type="button"
              onClick={() => handleFileUpload(field, null)}
              className="text-xs text-red-600 hover:text-red-800 mt-1"
            >
              Remove file
            </button>
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Appointment Letter
            </label>
            <DocumentUploadBox
              title="Upload Appointment Letter"
              field="appointmentLetter"
              acceptedFormats=".pdf,.doc,.docx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Salary Slips
            </label>
            <DocumentUploadBox
              title="Upload Salary Slips"
              field="salarySlips"
              acceptedFormats=".pdf,.doc,.docx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Relieving Letter
            </label>
            <DocumentUploadBox
              title="Upload Relieving Letter"
              field="relievingLetter"
              acceptedFormats=".pdf,.doc,.docx"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload Experience Letter
            </label>
            <DocumentUploadBox
              title="Upload Experience Letter"
              field="experienceLetter"
              acceptedFormats=".pdf,.doc,.docx"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderAccountAccess = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Email Address *
          </label>
          <input
            type="email"
            value={formData.enterEmailAddress}
            onChange={(e) =>
              handleInputChange("enterEmailAddress", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Slack ID
          </label>
          <input
            type="text"
            value={formData.enterSlackId}
            onChange={(e) => handleInputChange("enterSlackId", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter Slack ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Skype ID
          </label>
          <input
            type="text"
            value={formData.enterSkypeId}
            onChange={(e) => handleInputChange("enterSkypeId", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter Skype ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Github ID
          </label>
          <input
            type="text"
            value={formData.enterGithubId}
            onChange={(e) => handleInputChange("enterGithubId", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter Github ID"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInformation();
      case "professional":
        return renderProfessionalInformation();
      case "documents":
        return renderDocuments();
      case "account":
        return renderAccountAccess();
      default:
        return renderPersonalInformation();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span>All Employees</span>
              <svg
                className="w-4 h-4 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-gray-900 font-medium">
                Add New Employee
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Employee
            </h1>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">{renderTabContent()}</div>

            {/* Action Buttons */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <div>
                {activeTab !== "personal" && (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div className="flex space-x-4">
                <button className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={activeTab === "account" ? handleSubmit : handleNext}
                  className="px-6 py-2 bg-[#5E17EB] hover:bg-[#4A0EC9] text-white rounded-lg transition-colors"
                >
                  {activeTab === "account" ? "Add" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Employee Added Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                New employee has been created with ID:{" "}
                <span className="font-medium">{newEmployeeId}</span>
              </p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/all-employees");
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Employees
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate(`/employee/${newEmployeeId}`);
                  }}
                  className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A12C7] transition-colors"
                >
                  View Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddNewEmployee;
