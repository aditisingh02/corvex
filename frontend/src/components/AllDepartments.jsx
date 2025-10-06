import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AllDepartments = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample department data
  const departments = [
    {
      id: "design",
      name: "Design Department",
      employees: [
        {
          id: 1,
          name: "Sneha Gupta",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face",
          designation: "UI/UX Designer",
        },
        {
          id: 2,
          name: "Priya Sharma",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          designation: "Graphic Designer",
        },
        {
          id: 3,
          name: "Ricky Fisher",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          designation: "Product Designer",
        },
        {
          id: 4,
          name: "Theresa Webb",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
          designation: "Visual Designer",
        },
        {
          id: 5,
          name: "Ronald Richards",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          designation: "Design Lead",
        },
      ],
    },
    {
      id: "sales",
      name: "Sales Department",
      employees: [
        {
          id: 6,
          name: "Daniel Stewart",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          designation: "Sales Manager",
        },
        {
          id: 7,
          name: "Kristin Watson",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
          designation: "Sales Executive",
        },
        {
          id: 8,
          name: "Courtney Henry",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
          designation: "Account Manager",
        },
        {
          id: 9,
          name: "Kathryn Murphy",
          avatar:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=40&h=40&fit=crop&crop=face",
          designation: "Business Development",
        },
        {
          id: 10,
          name: "Albert Flores",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
          designation: "Sales Representative",
        },
      ],
    },
    {
      id: "project-manager",
      name: "Project Manager Department",
      employees: [
        {
          id: 11,
          name: "Leslie Alexander",
          avatar:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=40&h=40&fit=crop&crop=face",
          designation: "Senior Project Manager",
        },
        {
          id: 12,
          name: "Ronald Richards",
          avatar:
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face",
          designation: "Project Coordinator",
        },
        {
          id: 13,
          name: "Savannah Nguyen",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face",
          designation: "Technical Project Manager",
        },
        {
          id: 14,
          name: "Eleanor Pena",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
          designation: "Agile Coach",
        },
        {
          id: 15,
          name: "Esther Howard",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
          designation: "Project Analyst",
        },
      ],
    },
    {
      id: "marketing",
      name: "Marketing Department",
      employees: [
        {
          id: 16,
          name: "Marla Warren",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
          designation: "Marketing Manager",
        },
        {
          id: 17,
          name: "Brooklyn Simmons",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
          designation: "Digital Marketing Specialist",
        },
        {
          id: 18,
          name: "Kristin Watson",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
          designation: "Content Creator",
        },
        {
          id: 19,
          name: "Jacob Jones",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
          designation: "SEO Specialist",
        },
        {
          id: 20,
          name: "Emily Fisher",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
          designation: "Social Media Manager",
        },
      ],
    },
  ];

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
        <h3 className="text-lg font-semibold text-gray-900">
          {department.name}
        </h3>
        <button
          onClick={() => navigate(`/department/${department.id}`)}
          className="text-sm text-[#5E17EB] hover:text-[#4A0EC9] font-medium"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {department.employees.slice(0, 5).map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{employee.name}</p>
                <p className="text-sm text-gray-500">{employee.designation}</p>
              </div>
            </div>
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
        ))}
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
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
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
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDepartments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>

          {/* Empty State */}
          {filteredDepartments.length === 0 && searchTerm && (
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
        </div>
      </div>
    </div>
  );
};

export default AllDepartments;
