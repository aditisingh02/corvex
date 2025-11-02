import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import candidateService from "../services/candidateService";
import { interviewService, interviewUtils } from "../services/interviewService";
import { employeeService } from "../services/employeeService";
import departmentService from "../services/departmentService";

const InterviewScheduling = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    candidate: "",
    interviewer: "",
    interviewDetails: {
      type: "",
      stage: "",
      position: "",
      department: ""
    },
    scheduling: {
      date: "",
      time: "",
      duration: 60,
      location: "",
      timezone: "UTC"
    },
    notes: []
  });

  const [candidates, setCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [availableInterviewers, setAvailableInterviewers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingInterviewers, setLoadingInterviewers] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Fetch available interviewers when date/time changes
  useEffect(() => {
    if (formData.scheduling.date && formData.scheduling.time) {
      fetchAvailableInterviewers();
    }
  }, [formData.scheduling.date, formData.scheduling.time, formData.scheduling.duration]);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching initial data for interview scheduling...');
      
      const [candidatesRes, employeesRes, departmentsRes] = await Promise.all([
        candidateService.getAllCandidates({ limit: 100 }),
        employeeService.getAllEmployees({ status: 'active', limit: 100 }),
        departmentService.getAllDepartments()
      ]);

      console.log('Candidates data:', candidatesRes);
      console.log('Employees data:', employeesRes);
      console.log('Departments data:', departmentsRes);

      setCandidates(candidatesRes.data || candidatesRes || []);
      setEmployees(employeesRes.data || employeesRes || []);
      setDepartments(departmentsRes.data || departmentsRes || []);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableInterviewers = async () => {
    try {
      setLoadingInterviewers(true);
      const response = await interviewService.getAvailableInterviewers(
        formData.scheduling.date,
        formData.scheduling.time,
        formData.scheduling.duration
      );
      setAvailableInterviewers(response.data || []);
    } catch (error) {
      console.error('Error fetching available interviewers:', error);
      setAvailableInterviewers(employees); // Fallback to all employees
    } finally {
      setLoadingInterviewers(false);
    }
  };

  const handleCandidateSelect = (candidateId) => {
    const candidate = candidates.find(c => c._id === candidateId);
    if (candidate) {
      setFormData(prev => ({
        ...prev,
        candidate: candidateId,
        interviewDetails: {
          ...prev.interviewDetails,
          position: candidate.applicationInfo?.position || '',
          department: candidate.applicationInfo?.department?._id || ''
        }
      }));
    }
  };

  const handleInterviewerSelect = (interviewerId) => {
    setFormData(prev => ({
      ...prev,
      interviewer: interviewerId
    }));
  };

  const handleInputChange = (field, value, nested = null) => {
    setFormData(prev => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...prev[nested],
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError("");

      // Validate form data
      const validation = interviewUtils.validateInterviewData(formData);
      if (!validation.isValid) {
        setError(`Please fix the following errors: ${validation.errors.join(", ")}`);
        return;
      }

      const response = await interviewService.scheduleInterview(formData);
      
      if (response.success) {
        alert("Interview scheduled successfully!");
        navigate("/interview-management");
      } else {
        throw new Error(response.message || "Failed to schedule interview");
      }
    } catch (error) {
      console.error("Error scheduling interview:", error);
      setError(error.response?.data?.message || error.message || "Failed to schedule interview");
    } finally {
      setIsLoading(false);
    }
  };

  const generateTimeSlots = () => {
    return interviewUtils.generateTimeSlots(9, 17, 30);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading...</p>
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
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Schedule Interview</h1>
                  <p className="text-gray-600 mt-2">Schedule a new interview with candidate</p>
                </div>
                <button
                  onClick={() => navigate("/interview-management")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Interviews
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Candidate Information */}
                  <div className="col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Candidate
                    </label>
                    <select
                      value={formData.candidate}
                      onChange={(e) => handleCandidateSelect(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Choose a candidate</option>
                      {candidates.map((candidate) => (
                        <option key={candidate._id} value={candidate._id}>
                          {candidate.personalInfo?.firstName} {candidate.personalInfo?.lastName} - {candidate.applicationInfo?.position}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Candidate Email
                    </label>
                    <input
                      type="email"
                      value={formData.candidate ? candidates.find(c => c._id === formData.candidate)?.personalInfo?.email || '' : ''}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                      placeholder="candidate@email.com"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.interviewDetails.position}
                      onChange={(e) => handleInputChange("position", e.target.value, "interviewDetails")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="Position applying for"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Stage
                    </label>
                    <select
                      value={formData.interviewDetails.stage}
                      onChange={(e) => handleInputChange("stage", e.target.value, "interviewDetails")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Select stage</option>
                      <option value="screening">Screening</option>
                      <option value="technical">Technical</option>
                      <option value="hr_round">HR Round</option>
                      <option value="portfolio_review">Portfolio Review</option>
                      <option value="final">Final</option>
                    </select>
                  </div>

                  {/* Interview Details */}
                  <div className="col-span-2 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Details</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Type
                    </label>
                    <select
                      value={formData.interviewDetails.type}
                      onChange={(e) => handleInputChange("type", e.target.value, "interviewDetails")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="in_person">In-person</option>
                      <option value="video_call">Video Call</option>
                      <option value="phone_call">Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.scheduling.date}
                      onChange={(e) => handleInputChange("date", e.target.value, "scheduling")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <select
                      value={formData.scheduling.time}
                      onChange={(e) => handleInputChange("time", e.target.value, "scheduling")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Select time</option>
                      {generateTimeSlots().map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      value={formData.scheduling.duration}
                      onChange={(e) => handleInputChange("duration", parseInt(e.target.value), "scheduling")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>1.5 hours</option>
                      <option value={120}>2 hours</option>
                    </select>
                  </div>

                  {/* Interviewer Information */}
                  <div className="col-span-2 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interviewer Information</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Interviewer
                      {loadingInterviewers && <span className="text-xs text-gray-500 ml-2">(Loading available...)</span>}
                    </label>
                    <select
                      value={formData.interviewer}
                      onChange={(e) => handleInterviewerSelect(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                      disabled={loadingInterviewers}
                    >
                      <option value="">Choose an interviewer</option>
                      {(availableInterviewers.length > 0 ? availableInterviewers : employees).map((interviewer) => (
                        <option key={interviewer._id} value={interviewer._id}>
                          {interviewer.personalInfo?.firstName} {interviewer.personalInfo?.lastName} - {interviewer.jobInfo?.position}
                        </option>
                      ))}
                    </select>
                    {formData.scheduling.date && formData.scheduling.time && availableInterviewers.length === 0 && !loadingInterviewers && (
                      <p className="text-sm text-orange-600 mt-1">
                        No interviewers available at this time. Please choose a different time.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interviewer Email
                    </label>
                    <input
                      type="email"
                      value={formData.interviewer ? employees.find(e => e._id === formData.interviewer)?.personalInfo?.email || '' : ''}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                      placeholder="interviewer@company.com"
                      readOnly
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location / Meeting Link
                    </label>
                    <input
                      type="text"
                      value={formData.scheduling.location}
                      onChange={(e) => handleInputChange("location", e.target.value, "scheduling")}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="Conference Room A / https://meet.google.com/xyz"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="Any additional notes or preparation instructions..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate("/interview-management")}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Scheduling..." : "Schedule Interview"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InterviewScheduling;