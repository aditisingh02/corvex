import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const itemsPerPage = 10;

  // Sample candidates data
  const candidatesData = [
    {
      id: 1,
      name: "Leslie Watson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612c2d5?w=40&h=40&fit=crop&crop=face",
      appliedFor: "UI/UX Designer",
      appliedTime: "July 14, 2023",
      email: "leslie.w@demo.com",
      mobile: "(529) 555-0125",
      status: "Selected",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "Arjun Patel",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      appliedFor: "Sales Manager",
      appliedTime: "July 14, 2023",
      email: "arjun.p@demo.com",
      mobile: "+91 98765 43210",
      status: "In Process",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      name: "Ananya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      appliedFor: "Sr. UX Designer",
      appliedTime: "July 14, 2023",
      email: "ananya.s@demo.com",
      mobile: "+91 87654 32109",
      status: "In Process",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 4,
      name: "Kavya Reddy",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
      appliedFor: "Sr. Python Developer",
      appliedTime: "July 14, 2023",
      email: "kavya.r@demo.com",
      mobile: "+91 76543 21098",
      status: "In Process",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 5,
      name: "Esther Howard",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      appliedFor: "BDE",
      appliedTime: "July 14, 2023",
      email: "esther.h@demo.com",
      mobile: "(406) 555-0120",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: 6,
      name: "Darrell Steward",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      appliedFor: "HR Executive",
      appliedTime: "July 14, 2023",
      email: "darrell.s@demo.com",
      mobile: "(603) 555-0123",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: 7,
      name: "Ronald Richards",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=40&h=40&fit=crop&crop=face",
      appliedFor: "Project Manager",
      appliedTime: "July 14, 2023",
      email: "ronald.r@demo.com",
      mobile: "(480) 555-0103",
      status: "Selected",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 8,
      name: "Jacob Jones",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      appliedFor: "Business Analyst",
      appliedTime: "July 14, 2023",
      email: "jacob.j@demo.com",
      mobile: "(208) 555-0112",
      status: "Selected",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 9,
      name: "Cameron Williamson",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face",
      appliedFor: "Sr. UI/UX Lead",
      appliedTime: "July 14, 2023",
      email: "cameron.w@demo.com",
      mobile: "(671) 555-0110",
      status: "In Process",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 10,
      name: "Bessie Cooper",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face",
      appliedFor: "BDM",
      appliedTime: "July 14, 2023",
      email: "bessie.c@demo.com",
      mobile: "(225) 555-0118",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: 11,
      name: "Kathryn Murphy",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face",
      appliedFor: "QS Developer",
      appliedTime: "July 14, 2023",
      email: "kathryn.m@demo.com",
      mobile: "(239) 555-0108",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
    },
    {
      id: 12,
      name: "Marvin McKinney",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face",
      appliedFor: "Delivery Head",
      appliedTime: "July 14, 2023",
      email: "marvin.m@demo.com",
      mobile: "(308) 555-0121",
      status: "Selected",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  // Filter candidates based on search
  const filteredCandidates = candidatesData.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.appliedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  // Handle candidate selection
  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((id) => id !== candidateId);
      } else {
        return [...prev, candidateId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === currentCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(currentCandidates.map((candidate) => candidate.id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
              <p className="text-gray-600 mt-2">
                Manage job applications and candidate profiles
              </p>
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

            {/* Candidates Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700 items-center">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={
                        selectedCandidates.length ===
                          currentCandidates.length &&
                        currentCandidates.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-[#5E17EB] border-gray-300 rounded focus:ring-[#5E17EB]"
                    />
                  </div>
                  <div className="col-span-2">Candidate Name</div>
                  <div className="col-span-2">Applied For</div>
                  <div className="col-span-2">Applied Time</div>
                  <div className="col-span-2">Email Address</div>
                  <div className="col-span-2">Mobile Number</div>
                  <div className="col-span-1">Status</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {currentCandidates.length > 0 ? (
                  currentCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Checkbox */}
                        <div className="col-span-1">
                          <input
                            type="checkbox"
                            checked={selectedCandidates.includes(candidate.id)}
                            onChange={() => handleSelectCandidate(candidate.id)}
                            className="w-4 h-4 text-[#5E17EB] border-gray-300 rounded focus:ring-[#5E17EB]"
                          />
                        </div>

                        {/* Candidate Name */}
                        <div className="col-span-2 flex items-center space-x-3">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 text-sm truncate">
                              {candidate.name}
                            </p>
                          </div>
                        </div>

                        {/* Applied For */}
                        <div className="col-span-2">
                          <p className="text-gray-600 text-sm">
                            {candidate.appliedFor}
                          </p>
                        </div>

                        {/* Applied Time */}
                        <div className="col-span-2">
                          <p className="text-gray-600 text-sm">
                            {candidate.appliedTime}
                          </p>
                        </div>

                        {/* Email Address */}
                        <div className="col-span-2">
                          <p className="text-gray-600 text-sm">
                            {candidate.email}
                          </p>
                        </div>

                        {/* Mobile Number */}
                        <div className="col-span-2">
                          <p className="text-gray-600 text-sm">
                            {candidate.mobile}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="col-span-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${candidate.statusColor}`}
                          >
                            {candidate.status}
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No candidates found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {filteredCandidates.length > itemsPerPage && (
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{itemsPerPage}</span>{" "}
                  out of{" "}
                  <span className="font-medium">
                    {filteredCandidates.length}
                  </span>{" "}
                  results
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

export default Candidates;
