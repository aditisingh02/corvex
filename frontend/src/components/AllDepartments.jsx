import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { departmentService } from "../services/departmentService";
import { employeeService } from "../services/employeeService";

const AllDepartments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch departments and their employees from MongoDB
  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch all departments
        const departmentsResponse = await departmentService.getAllDepartments();
        const departmentsData = departmentsResponse.data || [];

        // Fetch all employees to group by department
        const employeesResponse = await employeeService.getAllEmployees();
        const employeesData = employeesResponse.data || [];

        console.log('Departments data:', departmentsData);
        console.log('Employees data:', employeesData);

        // Group employees by department
        const departmentsWithEmployees = departmentsData.map(dept => {
          const departmentEmployees = employeesData.filter(employee => {
            // Handle both cases: employee.jobInfo.department as ObjectId or populated object
            const employeeDeptId = typeof employee.jobInfo?.department === 'object' 
              ? employee.jobInfo.department._id 
              : employee.jobInfo?.department;
            
            return employeeDeptId === dept._id;
          });

          console.log(`Department ${dept.name} has ${departmentEmployees.length} employees`);

          return {
            ...dept,
            employees: departmentEmployees.map(employee => ({
              id: employee._id,
              name: `${employee.personalInfo?.firstName || ''} ${employee.personalInfo?.lastName || ''}`.trim(),
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`${employee.personalInfo?.firstName || ''} ${employee.personalInfo?.lastName || ''}`)}&background=5E17EB&color=ffffff&size=40`,
              designation: employee.jobInfo?.position || 'N/A',
              employeeId: employee.employeeId,
              email: employee.user?.email || 'N/A',
              status: employee.status || 'active'
            }))
          };
        });

        setDepartments(departmentsWithEmployees);
      } catch (error) {
        console.error('Error fetching departments data:', error);
        setError('Failed to load departments data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentsData();
  }, []);

  // Filter departments based on search term
  const filteredDepartments = departments
    .map((dept) => ({
      ...dept,
      employees: dept.employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((dept) => dept.employees.length > 0 || searchTerm === "");

  const DepartmentCard = ({ department }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {department.name}
          </h3>
          <p className="text-sm text-gray-500">
            {department.code} • {department.employees.length} employees
          </p>
        </div>
        <button
          onClick={() => navigate(`/department/${department._id}`)}
          className="text-sm text-[#5E17EB] hover:text-[#4A0EC9] font-medium"
        >
          View All
        </button>
      </div>

      {department.description && (
        <p className="text-sm text-gray-600 mb-4">{department.description}</p>
      )}

      <div className="space-y-3">
        {department.employees.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">No employees in this department</p>
          </div>
        ) : (
          department.employees.slice(0, 5).map((employee) => (
            <div
              key={employee.id}
              className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
              onClick={() => navigate(`/employee/${employee.id}`)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{employee.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">{employee.designation}</p>
                    {employee.employeeId && (
                      <>
                        <span className="text-gray-300">•</span>
                        <p className="text-xs text-gray-400">{employee.employeeId}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  employee.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {employee.status}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5 text-gray-400 hover:text-gray-600"
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
                </button>
              </div>
            </div>
          ))
        )}

        {department.employees.length > 5 && (
          <div className="text-center pt-2">
            <button
              onClick={() => navigate(`/department/${department._id}`)}
              className="text-sm text-[#5E17EB] hover:text-[#4A0EC9] font-medium"
            >
              +{department.employees.length - 5} more employees
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              All Departments
            </h1>
            <p className="text-gray-600">
              Manage departments and view employee assignments
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between">
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                />
              </div>
              
              {!loading && (
                <div className="text-sm text-gray-600">
                  {departments.length} departments • {departments.reduce((total, dept) => total + dept.employees.length, 0)} total employees
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((empIndex) => (
                      <div key={empIndex} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-32"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Departments Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDepartments.map((department) => (
                <DepartmentCard key={department._id} department={department} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredDepartments.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                No employees found matching "{searchTerm}". Try searching with
                different keywords.
              </p>
            </div>
          )}

          {/* No Departments State */}
          {!loading && !error && departments.length === 0 && (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No departments found
              </h3>
              <p className="text-gray-500">
                Get started by creating your first department.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDepartments;
