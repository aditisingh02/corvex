import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const ViewDepartment = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Sample department data - in a real app, this would come from an API
  const departmentData = {
    design: {
      name: "Design Department",
      description: "All Departments > Design Department",
      employees: [
        {
          id: "09746406",
          name: "Floyd Miles",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          designation: "Lead UI/UX Designer",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "45356752",
          name: "Dianne Fisher",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          designation: "Sr UI/UX Designer",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "34535131",
          name: "Jerome Bell",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          designation: "Sr UI/UX Designer",
          type: "Remote",
          status: "Permanent",
        },
        {
          id: "45367891",
          name: "Savannah Nguyen",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
          designation: "Sr UI/UX Designer",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "09585765",
          name: "Jacob Jones",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          designation: "UX Designer",
          type: "Remote",
          status: "Permanent",
        },
        {
          id: "55687502",
          name: "Marvin McKinney",
          avatar:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
          designation: "UX Designer",
          type: "Remote",
          status: "Permanent",
        },
        {
          id: "54535011",
          name: "Brooklyn Simmons",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
          designation: "UI/UX Designer",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "45564008",
          name: "Kristin Watson",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
          designation: "UI/UX Designer",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "09553410",
          name: "Kathryn Murphy",
          avatar:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
          designation: "UI/UX Designer",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "87193543",
          name: "Arlene McCoy",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          designation: "UI/UX Designer",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "09534410",
          name: "Devon Lane",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
          designation: "UI/UX Designer",
          type: "Remote",
          status: "Permanent",
        },
      ],
    },
    sales: {
      name: "Sales Department",
      description: "All Departments > Sales Department",
      employees: [
        {
          id: "34535132",
          name: "Daniel Stewart",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          designation: "Sales Manager",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "09746407",
          name: "Kristin Watson",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
          designation: "Sales Executive",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "45356753",
          name: "Courtney Henry",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
          designation: "Account Manager",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "34535132",
          name: "Albert Flores",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
          designation: "Sales Representative",
          type: "Remote",
          status: "Permanent",
        },
      ],
    },
    marketing: {
      name: "Marketing Department",
      description: "All Departments > Marketing Department",
      employees: [
        {
          id: "34535133",
          name: "Marla Warren",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
          designation: "Marketing Manager",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "09746408",
          name: "Brooklyn Simmons",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          designation: "Digital Marketing Specialist",
          type: "Remote",
          status: "Permanent",
        },
      ],
    },
    "project-manager": {
      name: "Project Manager Department",
      description: "All Departments > Project Manager Department",
      employees: [
        {
          id: "34535134",
          name: "Leslie Alexander",
          avatar:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
          designation: "Senior Project Manager",
          type: "Office",
          status: "Permanent",
        },
        {
          id: "09746409",
          name: "Ronald Richards",
          avatar:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
          designation: "Project Coordinator",
          type: "Remote",
          status: "Permanent",
        },
      ],
    },
  };

  const currentDepartment = departmentData[departmentId];

  if (!currentDepartment) {
    return (
      <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Department Not Found
              </h2>
              <p className="text-gray-600 mb-4">
                The department you're looking for doesn't exist.
              </p>
              <button
                onClick={() => navigate("/all-departments")}
                className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-6 py-2 rounded-lg"
              >
                Back to All Departments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter employees based on search term and filter type
  const filteredEmployees = currentDepartment.employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === "All" || employee.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb and Header */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <button
                onClick={() => navigate("/all-departments")}
                className="hover:text-[#5E17EB] transition-colors"
              >
                All Departments
              </button>
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
                {currentDepartment.name}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentDepartment.name}
            </h1>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                />
              </div>

              {/* Add Employee Button */}
              <button
                onClick={() => navigate("/add-employee")}
                className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Add New Employee</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1">
              {["All", "Office", "Remote"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterType === type
                      ? "bg-[#5E17EB] text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 items-center">
                <div className="col-span-1">Employee ID</div>
                <div className="col-span-3 flex items-center">
                  Employee Name
                </div>
                <div className="col-span-4">Designation</div>
                <div className="col-span-1">Type</div>
                <div className="col-span-1">Status</div>
                <div className="col-span-2">Action</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Employee ID */}
                    <div className="col-span-1 text-sm">
                      <p className="text-gray-600">{employee.id}</p>
                    </div>

                    {/* Employee Name */}
                    <div className="col-span-3 flex items-center space-x-3">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {employee.name}
                        </p>
                      </div>
                    </div>

                    {/* Designation */}
                    <div className="col-span-4">
                      <p className="text-gray-600 text-sm">
                        {employee.designation}
                      </p>
                    </div>

                    {/* Type */}
                    <div className="col-span-1">
                      <p className="text-gray-600 text-sm">{employee.type}</p>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#5E17EB] text-white">
                        {employee.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded">
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
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded">
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
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded">
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredEmployees.length}</span> of{" "}
              <span className="font-medium">
                {currentDepartment.employees.length}
              </span>{" "}
              employees
            </div>

            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50">
                Previous
              </button>

              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-8 h-8 text-sm rounded ${
                      page === 1
                        ? "bg-[#5E17EB] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
