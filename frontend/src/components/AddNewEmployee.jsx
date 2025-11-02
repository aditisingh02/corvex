import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { employeeService } from "../services/employeeService";
import { departmentService } from "../services/departmentService";
import { authService } from "../services/authService";
import { transformFormDataToEmployee, validateEmployeeFormData } from "../utils/employeeDataTransform";

// Department-specific designations mapping
const departmentDesignations = {
  // Human Resources
  "Human Resources": {
    management: [
      "Chief Human Resources Officer",
      "HR Director", 
      "HR Manager",
      "Assistant HR Manager"
    ],
    senior: [
      "Senior HR Business Partner",
      "Senior HR Specialist",
      "Senior Recruiter",
      "Senior Compensation Analyst",
      "Senior Training Manager"
    ],
    mid: [
      "HR Business Partner",
      "HR Specialist",
      "Recruiter",
      "HR Coordinator",
      "Training Coordinator",
      "Compensation Analyst",
      "Employee Relations Specialist",
      "HR Generalist"
    ],
    junior: [
      "Junior HR Specialist",
      "HR Assistant",
      "Recruitment Coordinator",
      "HR Intern"
    ]
  },

  // Engineering
  "Engineering": {
    management: [
      "Chief Technology Officer",
      "VP of Engineering",
      "Engineering Director",
      "Engineering Manager",
      "Tech Lead",
      "Team Lead"
    ],
    senior: [
      "Senior Software Engineer",
      "Senior Full Stack Developer",
      "Senior Frontend Developer",
      "Senior Backend Developer",
      "Senior DevOps Engineer",
      "Senior Mobile Developer",
      "Senior Data Engineer",
      "Senior QA Engineer",
      "Principal Engineer"
    ],
    mid: [
      "Software Engineer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "DevOps Engineer",
      "Mobile Developer",
      "Data Engineer",
      "QA Engineer",
      "Software Developer"
    ],
    junior: [
      "Junior Software Engineer",
      "Junior Developer",
      "Junior QA Engineer",
      "Software Engineer Intern",
      "Developer Trainee"
    ]
  },

  // Marketing
  "Marketing": {
    management: [
      "Chief Marketing Officer",
      "Marketing Director",
      "Marketing Manager",
      "Brand Manager",
      "Product Marketing Manager",
      "Digital Marketing Manager"
    ],
    senior: [
      "Senior Marketing Specialist",
      "Senior Content Strategist",
      "Senior Social Media Manager",
      "Senior SEO Specialist",
      "Senior Brand Specialist"
    ],
    mid: [
      "Marketing Specialist",
      "Content Marketing Specialist",
      "Digital Marketing Specialist",
      "Social Media Specialist",
      "SEO Specialist",
      "Content Writer",
      "Marketing Coordinator",
      "Campaign Manager",
      "Brand Specialist"
    ],
    junior: [
      "Junior Marketing Specialist",
      "Marketing Assistant",
      "Content Writing Intern",
      "Social Media Intern",
      "Marketing Intern"
    ]
  },

  // Finance
  "Finance": {
    management: [
      "Chief Financial Officer",
      "Finance Director",
      "Finance Manager",
      "Accounting Manager",
      "Controller",
      "Treasurer"
    ],
    senior: [
      "Senior Financial Analyst",
      "Senior Accountant",
      "Senior Auditor",
      "Senior Tax Specialist",
      "Senior Budget Analyst"
    ],
    mid: [
      "Financial Analyst",
      "Accountant",
      "Auditor",
      "Tax Specialist",
      "Budget Analyst",
      "Accounts Payable Specialist",
      "Accounts Receivable Specialist",
      "Payroll Specialist",
      "Financial Coordinator"
    ],
    junior: [
      "Junior Financial Analyst",
      "Junior Accountant",
      "Accounting Assistant",
      "Finance Intern",
      "Bookkeeper"
    ]
  },

  // Operations
  "Operations": {
    management: [
      "Chief Operating Officer",
      "Operations Director",
      "Operations Manager",
      "Supply Chain Manager",
      "Logistics Manager",
      "Process Manager"
    ],
    senior: [
      "Senior Operations Analyst",
      "Senior Supply Chain Specialist",
      "Senior Logistics Coordinator",
      "Senior Process Improvement Specialist"
    ],
    mid: [
      "Operations Analyst",
      "Operations Coordinator",
      "Supply Chain Specialist",
      "Logistics Coordinator",
      "Process Improvement Specialist",
      "Operations Specialist",
      "Inventory Manager",
      "Quality Assurance Specialist"
    ],
    junior: [
      "Junior Operations Analyst",
      "Operations Assistant",
      "Logistics Assistant",
      "Operations Intern"
    ]
  }
};

const AddNewEmployee = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newEmployeeId, setNewEmployeeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentService.getAllDepartments();
        setDepartments(response.data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setDepartments([]);
      }
    };

    const ensureAuthentication = async () => {
      try {
        // Check if user is already authenticated
        if (!authService.isAuthenticated()) {
          // Auto-login with admin credentials for testing
          console.log('Auto-logging in with admin credentials for testing...');
          await authService.login({
            email: 'admin@corvex.com',
            password: 'Admin123!'
          });
        }
      } catch (error) {
        console.error('Auto-login failed:', error);
        setError('Authentication required. Please login to add employees.');
      }
    };

    ensureAuthentication();
    fetchDepartments();
  }, []);

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
    username: "",
    department: "",
    designation: "",
    joiningDate: "",
    employmentType: "",
    workLocation: "",
    workingDays: "",
    salary: "",

    // Documents
    appointmentLetter: null,
    salarySlips: null,
    relievingLetter: null,
    experienceLetter: null,

        // Account Access
    enterSlackId: "",
    enterSkypeId: "",
    enterGoogleHangoutId: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [field]: value,
      };
      
      // Clear designation when department changes
      if (field === 'department') {
        newData.designation = '';
      }
      
      return newData;
    });
  };

  // Get available designations based on selected department
  const getAvailableDesignations = () => {
    const selectedDepartment = formData.department;
    
    // Find the department by name from the departments array
    const department = departments.find(dept => dept._id === selectedDepartment);
    const departmentName = department?.name;
    
    if (!departmentName || !departmentDesignations[departmentName]) {
      return [];
    }
    
    const deptDesignations = departmentDesignations[departmentName];
    
    // Flatten all levels into a single array with level labels
    const allDesignations = [
      ...deptDesignations.management.map(title => ({ title, level: 'Management' })),
      ...deptDesignations.senior.map(title => ({ title, level: 'Senior Level' })),
      ...deptDesignations.mid.map(title => ({ title, level: 'Mid Level' })),
      ...deptDesignations.junior.map(title => ({ title, level: 'Junior Level' }))
    ];
    
    return allDesignations;
  };

  const getTabValidationStatus = (tabId) => {
    switch (tabId) {
      case "personal":
        return formData.firstName && 
               formData.lastName && 
               formData.emailAddress && 
               formData.mobileNumber &&
               formData.dateOfBirth &&
               formData.gender &&
               formData.nationality &&
               formData.address &&
               formData.city &&
               formData.state &&
               formData.pinCode;
      case "professional":
        return formData.department && 
               formData.designation &&
               formData.employmentType &&
               formData.joiningDate &&
               formData.workLocation &&
               formData.workingDays &&
               formData.salary;
      case "documents":
        return true; // Documents are optional
      case "account":
        return true; // Account info is optional
      default:
        return true;
    }
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

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      // Debug: Log current form data
      console.log("Current form data:", formData);
      
      // Validate form data using utility function
      const validation = validateEmployeeFormData(formData);
      
      if (!validation.isValid) {
        setError(`Please fix the following errors: ${validation.errors.join(", ")}`);
        setIsLoading(false);
        return;
      }

      // Transform form data to MongoDB structure
      const employeeData = transformFormDataToEmployee(formData);

      console.log("Submitting employee data:", employeeData);
      const response = await employeeService.createEmployee(employeeData);
      console.log("Employee created successfully:", response);
      
      if (response.success) {
        setNewEmployeeId(response.data._id || response.data.id);
        setShowSuccessModal(true);
      } else {
        throw new Error(response.message || "Failed to create employee");
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      
      let errorMessage = error.message || "Failed to create employee. Please try again.";
      
      // Special handling for duplicate errors (mainly email now)
      if (error.message && error.message.includes('already exists')) {
        // Focus on email duplicate since Employee ID is auto-generated
        if (error.message.includes('email')) {
          errorMessage += " Please check the email address and try a different one.";
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            <option value="prefer_not_to_say">Prefer not to say</option>
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
            <option value="Indian">Indian</option>
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Canadian">Canadian</option>
            <option value="Australian">Australian</option>
            <option value="Other">Other</option>
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
      {/* Auto-generation notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800">Employee ID Auto-Generation</h4>
            <p className="text-sm text-blue-700">A unique Employee ID will be automatically generated for this employee upon creation.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
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
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
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
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Designation *
          </label>
          <select
            value={formData.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            disabled={!formData.department}
          >
            <option value="">
              {!formData.department ? "Please select a department first" : "Select designation"}
            </option>
            
            {formData.department && (() => {
              const availableDesignations = getAvailableDesignations();
              const groupedDesignations = availableDesignations.reduce((acc, designation) => {
                if (!acc[designation.level]) {
                  acc[designation.level] = [];
                }
                acc[designation.level].push(designation.title);
                return acc;
              }, {});

              return Object.entries(groupedDesignations).map(([level, titles]) => (
                <optgroup key={level} label={level}>
                  {titles.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </optgroup>
              ));
            })()}
          </select>
          {!formData.department && (
            <p className="text-sm text-gray-500 mt-1">
              Select a department to see available designations
            </p>
          )}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Salary *
          </label>
          <input
            type="number"
            value={formData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
            placeholder="Enter annual salary"
            min="0"
            step="1000"
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
          <option value="office">Office</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
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
                {tabs.map((tab) => {
                  const isValid = getTabValidationStatus(tab.id);
                  return (
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
                      {!isValid && (
                        <span className="w-2 h-2 bg-red-500 rounded-full ml-1" title="Missing required fields"></span>
                      )}
                      {isValid && tab.id !== "documents" && tab.id !== "account" && (
                        <span className="w-2 h-2 bg-green-500 rounded-full ml-1" title="Required fields completed"></span>
                      )}
                    </button>
                  );
                })}
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
              
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm">{error}</p>
                      {error.includes('already exists') && (
                        <button
                          onClick={() => setError("")}
                          className="mt-2 text-xs bg-red-100 hover:bg-red-200 text-red-800 px-2 py-1 rounded"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button 
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => navigate("/all-employees")}
                >
                  Cancel
                </button>
                <button
                  onClick={activeTab === "account" ? handleSubmit : handleNext}
                  disabled={isLoading}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    isLoading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-[#5E17EB] hover:bg-[#4A0EC9]"
                  } text-white`}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding...</span>
                    </div>
                  ) : (
                    activeTab === "account" ? "Add Employee" : "Next"
                  )}
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
                New employee has been created and assigned Employee ID:{" "}
                <span className="font-medium text-blue-600">{newEmployeeId}</span>
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
