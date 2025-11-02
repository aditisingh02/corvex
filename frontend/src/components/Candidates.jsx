import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, ArrowUp, X, UserCheck, Trash2 } from "lucide-react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import candidateService from "../services/candidateService";
import { interviewUtils } from "../services/interviewService";

const Candidates = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(10);

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    filterCandidates();
  }, [candidates, searchTerm, selectedStatus, selectedStage, selectedPosition]);

  const fetchCandidates = async () => {
    try {
      setIsLoading(true);
      setError("");
      console.log('Fetching candidates...');
      const response = await candidateService.getAllCandidates({ limit: 100 });
      console.log('Candidates response:', response);
      
      // Handle both possible response structures
      const candidatesData = response.data || response || [];
      console.log('Candidates data:', candidatesData);
      setCandidates(candidatesData);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setError(`Failed to load candidates: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCandidates = () => {
    let filtered = [...candidates];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(candidate =>
        candidate.personalInfo?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.personalInfo?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.personalInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.applicationInfo?.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (selectedStatus) {
      filtered = filtered.filter(candidate => candidate.status === selectedStatus);
    }

    // Stage filter
    if (selectedStage) {
      filtered = filtered.filter(candidate => candidate.interviewStage === selectedStage);
    }

    // Position filter
    if (selectedPosition) {
      filtered = filtered.filter(candidate => 
        candidate.applicationInfo?.position?.toLowerCase().includes(selectedPosition.toLowerCase())
      );
    }

    setFilteredCandidates(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDeleteCandidate = (candidate) => {
    setCandidateToDelete(candidate);
    setShowDeleteModal(true);
  };

  const confirmDeleteCandidate = async () => {
    try {
      await candidateService.deleteCandidate(candidateToDelete._id);
      setCandidates(candidates.filter(c => c._id !== candidateToDelete._id));
      setShowDeleteModal(false);
      setCandidateToDelete(null);
      alert("Candidate deleted successfully");
    } catch (error) {
      console.error('Error deleting candidate:', error);
      alert("Failed to delete candidate. Please try again.");
    }
  };

  const handleAdvanceStage = async (candidateId) => {
    try {
      await candidateService.advanceStage(candidateId);
      fetchCandidates(); // Refresh data
      alert("Candidate stage advanced successfully");
    } catch (error) {
      console.error('Error advancing candidate stage:', error);
      alert("Failed to advance candidate stage. Please try again.");
    }
  };

  const handleRejectCandidate = async (candidateId) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason) return;

    try {
      await candidateService.rejectCandidate(candidateId, reason);
      fetchCandidates(); // Refresh data
      alert("Candidate rejected successfully");
    } catch (error) {
      console.error('Error rejecting candidate:', error);
      alert("Failed to reject candidate. Please try again.");
    }
  };

  const handleHireCandidate = async (candidateId) => {
    if (!confirm("Are you sure you want to hire this candidate?")) return;

    try {
      await candidateService.hireCandidate(candidateId);
      fetchCandidates(); // Refresh data
      alert("Candidate hired successfully");
    } catch (error) {
      console.error('Error hiring candidate:', error);
      alert("Failed to hire candidate. Please try again.");
    }
  };

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'withdrawn': 'bg-gray-100 text-gray-800',
      'hired': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800',
      'on_hold': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStageColor = (stage) => {
    return interviewUtils.getStageColor(stage);
  };

  const formatStatus = (status) => {
    return status?.replace('_', ' ').toUpperCase() || 'ACTIVE';
  };

  const formatStage = (stage) => {
    return interviewUtils.formatStageName(stage);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading candidates...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
                  <p className="text-gray-600 mt-2">Manage job candidates and track their progress</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate("/add-candidate")}
                    className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors"
                  >
                    Add New Candidate
                  </button>
                  <button
                    onClick={() => navigate("/interview-scheduling")}
                    className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                  <button 
                    onClick={fetchCandidates}
                    className="mt-2 text-red-600 hover:text-red-800 underline"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="withdrawn">Withdrawn</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interview Stage</label>
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                  >
                    <option value="">All Stages</option>
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="technical">Technical</option>
                    <option value="hr_round">HR Round</option>
                    <option value="portfolio_review">Portfolio Review</option>
                    <option value="final">Final</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    placeholder="Filter by position..."
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                  />
                </div>
              </div>
              
              {(searchTerm || selectedStatus || selectedStage || selectedPosition) && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {filteredCandidates.length} of {candidates.length} candidates
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedStatus("");
                      setSelectedStage("");
                      setSelectedPosition("");
                    }}
                    className="text-sm text-[#5E17EB] hover:text-[#4A0E99]"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {/* Candidates Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">All Candidates ({filteredCandidates.length})</h2>
              </div>
              
              {currentCandidates.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {candidates.length === 0 ? "Get started by adding your first candidate." : "No candidates match your current filters."}
                  </p>
                  {candidates.length === 0 && (
                    <div className="mt-6">
                      <button
                        onClick={() => navigate("/add-candidate")}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5E17EB] hover:bg-[#4A0E99]"
                      >
                        Add Candidate
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stage
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Applied Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Experience
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentCandidates.map((candidate) => (
                          <tr key={candidate._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {candidate.personalInfo?.firstName?.[0]}
                                    {candidate.personalInfo?.lastName?.[0]}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {candidate.personalInfo?.firstName} {candidate.personalInfo?.lastName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {candidate.personalInfo?.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {candidate.applicationInfo?.position}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(candidate.interviewStage)}`}>
                                {formatStage(candidate.interviewStage)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                                {formatStatus(candidate.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(candidate.applicationInfo?.appliedDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {candidate.totalExperience ? `${candidate.totalExperience} years` : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => navigate(`/view-candidate/${candidate._id}`)}
                                  className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                  title="View Candidate"
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  onClick={() => navigate(`/edit-candidate/${candidate._id}`)}
                                  className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                  title="Edit Candidate"
                                >
                                  <Edit size={16} />
                                </button>
                                {candidate.status === 'active' && candidate.interviewStage !== 'selected' && candidate.interviewStage !== 'rejected' && (
                                  <>
                                    <button
                                      onClick={() => handleAdvanceStage(candidate._id)}
                                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                      title="Advance Stage"
                                    >
                                      <ArrowUp size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleRejectCandidate(candidate._id)}
                                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                      title="Reject Candidate"
                                    >
                                      <X size={16} />
                                    </button>
                                  </>
                                )}
                                {candidate.interviewStage === 'final' && candidate.status === 'active' && (
                                  <button
                                    onClick={() => handleHireCandidate(candidate._id)}
                                    className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                                    title="Hire Candidate"
                                  >
                                    <UserCheck size={16} />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteCandidate(candidate)}
                                  className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                  title="Delete Candidate"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Showing {indexOfFirstCandidate + 1} to {Math.min(indexOfLastCandidate, filteredCandidates.length)} of {filteredCandidates.length} candidates
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-2 border rounded-md text-sm font-medium ${
                                currentPage === page
                                  ? 'bg-[#5E17EB] text-white border-[#5E17EB]'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Delete Candidate</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete {candidateToDelete?.personalInfo?.firstName} {candidateToDelete?.personalInfo?.lastName}? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 px-4 py-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteCandidate}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidates;
