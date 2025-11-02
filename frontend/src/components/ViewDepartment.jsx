import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { departmentService } from "../services/departmentService";
import { employeeService } from "../services/employeeService";

const ViewDepartment = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [departmentData, setDepartmentData] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch department details
        const departmentResponse = await departmentService.getDepartment(departmentId);
        const department = departmentResponse.data;

        if (!department) {
          setError("Department not found");
          return;
        }

        // Fetch employees for this department
        const employeesResponse = await employeeService.getAllEmployees({
          department: departmentId
        });
        const employeesData = employeesResponse.data || [];

        // Transform employee data for display
        const transformedEmployees = employeesData.map(employee => ({
          id: employee._id,
          employeeId: employee.employeeId,
          name: `${employee.personalInfo?.firstName || ''} ${employee.personalInfo?.lastName || ''}`.trim(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`${employee.personalInfo?.firstName || ''} ${employee.personalInfo?.lastName || ''}`)}&background=5E17EB&color=ffffff&size=40`,
          designation: employee.jobInfo?.position || 'N/A',
          type: employee.jobInfo?.workLocation === 'remote' ? 'Remote' : 
                employee.jobInfo?.workLocation === 'hybrid' ? 'Hybrid' : 'Office',
          status: employee.jobInfo?.employmentType === 'full_time' ? 'Permanent' : 
                  employee.jobInfo?.employmentType === 'contract' ? 'Contract' : 
                  employee.jobInfo?.employmentType === 'part_time' ? 'Part-time' : 'Intern',
          email: employee.user?.email || 'N/A',
          phone: employee.personalInfo?.phone || 'N/A',
          joinDate: employee.jobInfo?.hireDate ? new Date(employee.jobInfo.hireDate).toLocaleDateString() : 'N/A',
          employeeStatus: employee.status || 'active'
        }));

        setDepartmentData(department);
        setEmployees(transformedEmployees);
      } catch (error) {
        console.error('Error fetching department data:', error);
        setError('Failed to load department data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (departmentId) {
      fetchDepartmentData();
    }
  }, [departmentId]);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "All" || employee.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const EmployeeCard = ({ employee }) => (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/employee/${employee.id}`)}
    >
      <div className="flex items-center space-x-4">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.designation}</p>
          <p className="text-xs text-gray-500">ID: {employee.employeeId}</p>
        </div>
        <div className="text-right">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            employee.type === 'Remote' ? 'bg-blue-100 text-blue-800' :
            employee.type === 'Hybrid' ? 'bg-purple-100 text-purple-800' :
            'bg-green-100 text-green-800'
          }`}>
            {employee.type}
          </span>
          <p className="text-xs text-gray-500 mt-1">{employee.status}</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
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

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
              <p className="text-gray-500 mb-4">The department you're looking for could not be found.</p>
              <button
                onClick={() => navigate('/all-departments')}
                className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg hover:bg-[#4A0EC9] transition-colors"
              >
                Back to All Departments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!departmentData) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Department Not Found</h2>
              <p className="text-gray-600 mb-4">The department you're looking for doesn't exist.</p>
              <button
                onClick={() => navigate('/all-departments')}
                className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg hover:bg-[#4A0EC9] transition-colors"
              >
                Back to All Departments
              </button>
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
          {/* Breadcrumb Navigation */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <button
                  onClick={() => navigate('/all-departments')}
                  className="hover:text-[#5E17EB] transition-colors"
                >
                  All Departments
                </button>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 font-medium">{departmentData.name}</span>
              </li>
            </ol>
          </nav>

          {/* Department Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{departmentData.name}</h1>
                <p className="text-gray-600">{departmentData.code} • {employees.length} employees</p>
              </div>
              <button
                onClick={() => navigate('/add-employee')}
                className="bg-[#5E17EB] text-white px-6 py-3 rounded-lg hover:bg-[#4A0EC9] transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Employee</span>
              </button>
            </div>
            
            {departmentData.description && (
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{departmentData.description}</p>
            )}
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
                  />
                </div>
              </div>
              
              <div className="sm:w-48">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB]"
                >
                  <option value="All">All Types</option>
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredEmployees.length} Employee{filteredEmployees.length !== 1 ? 's' : ''}
              {searchTerm && ` matching "${searchTerm}"`}
              {filterType !== 'All' && ` (${filterType})`}
            </h2>
          </div>

          {/* Employees Grid */}
          {filteredEmployees.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterType !== 'All' ? 'No employees found' : 'No employees in this department'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterType !== 'All' 
                  ? 'Try adjusting your search criteria or filters.'
                  : 'This department doesn\'t have any employees yet.'
                }
              </p>
              {(!searchTerm && filterType === 'All') && (
                <button
                  onClick={() => navigate('/add-employee')}
                  className="bg-[#5E17EB] text-white px-6 py-3 rounded-lg hover:bg-[#4A0EC9] transition-colors"
                >
                  Add First Employee
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
