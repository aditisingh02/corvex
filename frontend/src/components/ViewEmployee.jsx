import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { employeeService } from "../services/employeeService";

const ViewEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await employeeService.getEmployeeById(employeeId);
        if (response.success && response.data) {
          setEmployee(response.data);
        } else {
          setError("Employee not found");
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="animate-pulse">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !employee) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee Not Found</h2>
              <p className="text-gray-600 mb-4">{error || "The employee you're looking for doesn't exist."}</p>
              <button
                onClick={() => navigate('/all-employees')}
                className="bg-[#5E17EB] text-white px-6 py-3 rounded-lg hover:bg-[#4A0EC9] transition-colors"
              >
                Back to All Employees
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: "👤" },
    { id: "personal", label: "Personal Info", icon: "📋" },
    { id: "professional", label: "Job Details", icon: "💼" },
    { id: "compensation", label: "Compensation", icon: "💰" },
    { id: "documents", label: "Documents", icon: "📄" },
  ];

  const getFullName = () => {
    const { firstName, middleName, lastName } = employee.personalInfo || {};
    return [firstName, middleName, lastName].filter(Boolean).join(' ');
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    if (!salary?.amount) return 'N/A';
    const { amount, currency = 'USD', frequency = 'yearly' } = salary;
    return `${currency} ${amount.toLocaleString()} (${frequency})`;
  };

  const getInitials = () => {
    const { firstName, lastName } = employee.personalInfo || {};
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Employee ID</p>
              <p className="text-2xl font-bold">{employee.employeeId || 'N/A'}</p>
            </div>
            <div className="text-blue-200">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Department</p>
              <p className="text-xl font-bold">{employee.jobInfo?.department?.name || 'N/A'}</p>
            </div>
            <div className="text-green-200">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Years with Company</p>
              <p className="text-2xl font-bold">
                {employee.jobInfo?.hireDate ? 
                  Math.floor((new Date() - new Date(employee.jobInfo.hireDate)) / (365.25 * 24 * 60 * 60 * 1000)) 
                  : 'N/A'}
              </p>
            </div>
            <div className="text-purple-200">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📋</span>
            Basic Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium text-gray-900">{getFullName()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium text-gray-900">{employee.user?.email || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-900">{employee.personalInfo?.phone || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                employee.status === 'active' ? 'bg-green-100 text-green-800' :
                employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {employee.status?.charAt(0).toUpperCase() + employee.status?.slice(1) || 'Active'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">💼</span>
            Job Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Position:</span>
              <span className="font-medium text-gray-900">{employee.jobInfo?.position || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Level:</span>
              <span className="font-medium text-gray-900">
                {employee.jobInfo?.level?.charAt(0).toUpperCase() + employee.jobInfo?.level?.slice(1) || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Employment Type:</span>
              <span className="font-medium text-gray-900">
                {employee.jobInfo?.employmentType?.replace('_', ' ').toUpperCase() || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Work Location:</span>
              <span className="font-medium text-gray-900">
                {employee.jobInfo?.workLocation?.charAt(0).toUpperCase() + employee.jobInfo?.workLocation?.slice(1) || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PersonalTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">👤</span>
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo?.firstName || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo?.lastName || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo?.middleName || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{formatDate(employee.personalInfo?.dateOfBirth)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.personalInfo?.gender?.replace('_', ' ').toUpperCase() || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.personalInfo?.maritalStatus?.charAt(0).toUpperCase() + employee.personalInfo?.maritalStatus?.slice(1) || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo?.nationality || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo?.phone || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      {employee.personalInfo?.address && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">🏠</span>
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.address.street || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.address.city || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.address.state || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.address.zipCode || 'N/A'}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.address.country || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact */}
      {employee.personalInfo?.emergencyContact && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">🚨</span>
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.emergencyContact.name || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.emergencyContact.relationship || 'N/A'}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.personalInfo.emergencyContact.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ProfessionalTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">💼</span>
          Job Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.jobInfo?.department?.name || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.jobInfo?.position || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Level</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.jobInfo?.level?.charAt(0).toUpperCase() + employee.jobInfo?.level?.slice(1) || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.jobInfo?.manager ? 
                `${employee.jobInfo.manager.personalInfo?.firstName || ''} ${employee.jobInfo.manager.personalInfo?.lastName || ''}`.trim() 
                : 'N/A'
              }
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{formatDate(employee.jobInfo?.hireDate)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Probation End Date</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{formatDate(employee.jobInfo?.probationEndDate)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.jobInfo?.employmentType?.replace('_', ' ').toUpperCase() || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.jobInfo?.workLocation?.charAt(0).toUpperCase() + employee.jobInfo?.workLocation?.slice(1) || 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Shift</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {employee.jobInfo?.shift?.charAt(0).toUpperCase() + employee.jobInfo?.shift?.slice(1) || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const CompensationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">💰</span>
          Salary Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary</label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono text-lg">
              {formatSalary(employee.compensation?.salary)}
            </p>
          </div>
          {employee.compensation?.bonus && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Amount</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono">
                  {employee.compensation.bonus.amount ? 
                    `${employee.compensation.salary?.currency || 'USD'} ${employee.compensation.bonus.amount.toLocaleString()}` 
                    : 'N/A'
                  }
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Type</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.compensation.bonus.type || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Year</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{employee.compensation.bonus.year || 'N/A'}</p>
              </div>
            </>
          )}
        </div>
        
        {employee.compensation?.benefits && employee.compensation.benefits.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Benefits Package</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {employee.compensation.benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
                  <span className="inline-flex items-center text-sm font-medium text-blue-800">
                    <span className="mr-2">✓</span>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const DocumentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">📄</span>
          Employee Documents
        </h3>
        {employee.documents && employee.documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employee.documents.map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 rounded-lg p-2 mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-500">{doc.type}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      Uploaded on {formatDate(doc.uploadDate)}
                    </p>
                    {doc.url && (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents</h3>
            <p className="text-gray-500">No documents have been uploaded for this employee yet.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "personal":
        return <PersonalTab />;
      case "professional":
        return <ProfessionalTab />;
      case "compensation":
        return <CompensationTab />;
      case "documents":
        return <DocumentsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <button
                  onClick={() => navigate('/all-employees')}
                  className="hover:text-[#5E17EB] transition-colors"
                >
                  All Employees
                </button>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">{getFullName()}</span>
              </li>
            </ol>
          </nav>

          {/* Employee Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#5E17EB] to-[#4A0EC9] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {getInitials()}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{getFullName()}</h1>
                <p className="text-lg text-gray-600">{employee.jobInfo?.position || 'N/A'}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
                    </svg>
                    {employee.jobInfo?.department?.name || 'N/A'}
                  </span>
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {employee.user?.email || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  employee.status === 'active' ? 'bg-green-100 text-green-800' :
                  employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {employee.status?.charAt(0).toUpperCase() + employee.status?.slice(1) || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#5E17EB] text-[#5E17EB] bg-purple-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
