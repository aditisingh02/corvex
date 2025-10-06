import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Payroll = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample payroll data
  const payrollData = [
    {
      id: 1,
      employeeId: "EMP001",
      name: "Riya Agarwal",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612c2d5?w=40&h=40&fit=crop&crop=face",
      ctc: "₹45000",
      salary: "₹35000",
      deduction: "—",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      employeeId: "EMP002",
      name: "Kavya Reddy",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      ctc: "₹50000",
      salary: "₹40000",
      deduction: "₹100",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      employeeId: "EMP003",
      name: "Vivek Yadav",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      ctc: "₹80000",
      salary: "₹65000",
      deduction: "₹500",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      employeeId: "EMP004",
      name: "Pooja Kumari",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face",
      ctc: "₹55000",
      salary: "₹45000",
      deduction: "—",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 5,
      employeeId: "EMP005",
      name: "Leslie Alexander",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      ctc: "₹60000",
      salary: "₹50000",
      deduction: "—",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 6,
      employeeId: "EMP006",
      name: "Ronald Richards",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      ctc: "₹46000",
      salary: "₹38000",
      deduction: "—",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 7,
      employeeId: "EMP007",
      name: "Guy Hawkins",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      ctc: "₹55000",
      salary: "₹44000",
      deduction: "₹50",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 8,
      employeeId: "EMP008",
      name: "Albert Flores",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      ctc: "₹60000",
      salary: "₹50000",
      deduction: "₹160",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 9,
      employeeId: "EMP009",
      name: "Savannah Nguyen",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      ctc: "₹49000",
      salary: "₹40000",
      deduction: "—",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 10,
      employeeId: "EMP010",
      name: "Marvin McKinney",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face",
      ctc: "₹41000",
      salary: "₹27000",
      deduction: "—",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 11,
      employeeId: "EMP011",
      name: "Karan Singh",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&crop=face",
      ctc: "₹78000",
      salary: "₹64000",
      deduction: "—",
      status: "Complete",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 12,
      employeeId: "EMP012",
      name: "Jenny Wilson",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      ctc: "₹48000",
      salary: "₹36000",
      deduction: "₹100",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ];

  // Filter payroll data based on search
  const filteredPayroll = payrollData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredPayroll.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayroll = filteredPayroll.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    // Convert payroll data to CSV format
    const csvHeaders = [
      "Employee ID",
      "Employee Name",
      "CTC",
      "Salary Per Month",
      "Deduction",
      "Status",
    ];

    const csvData = filteredPayroll.map((employee) => [
      employee.employeeId,
      employee.name,
      employee.ctc,
      employee.salary,
      employee.deduction,
      employee.status,
    ]);

    // Create CSV content
    const csvContent = [
      csvHeaders.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `payroll_data_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Payroll</h1>
                <p className="text-gray-600 mt-2">
                  Manage employee salary and payroll information
                </p>
              </div>
              <button
                onClick={handleExport}
                className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
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
                <span>Export</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="max-w-md">
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Payroll Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 items-center">
                  <div className="col-span-4 flex items-center">
                    Employee Name
                  </div>
                  <div className="col-span-2">CTC</div>
                  <div className="col-span-2">Salary Per Month</div>
                  <div className="col-span-2">Deduction</div>
                  <div className="col-span-2">Status</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {currentPayroll.length > 0 ? (
                  currentPayroll.map((employee) => (
                    <div
                      key={employee.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Employee Name */}
                        <div className="col-span-4 flex items-center space-x-3">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {employee.name}
                            </p>
                          </div>
                        </div>

                        {/* CTC */}
                        <div className="col-span-2">
                          <p className="text-gray-900 text-sm font-medium">
                            {employee.ctc}
                          </p>
                        </div>

                        {/* Salary Per Month */}
                        <div className="col-span-2">
                          <p className="text-gray-900 text-sm font-medium">
                            {employee.salary}
                          </p>
                        </div>

                        {/* Deduction */}
                        <div className="col-span-2">
                          <p className="text-gray-600 text-sm">
                            {employee.deduction}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.statusColor}`}
                          >
                            {employee.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No payroll records found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {filteredPayroll.length > 0 && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{itemsPerPage}</span>{" "}
                  per page of{" "}
                  <span className="font-medium">{filteredPayroll.length}</span>{" "}
                  employees
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>

                  <div className="flex space-x-1">
                    {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentPage === page
                              ? "bg-[#5E17EB] text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    {totalPages > 5 && (
                      <>
                        <span className="px-3 py-1 text-sm text-gray-500">
                          ...
                        </span>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`px-3 py-1 text-sm rounded-md ${
                            currentPage === totalPages
                              ? "bg-[#5E17EB] text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payroll;
