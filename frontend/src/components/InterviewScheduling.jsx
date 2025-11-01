import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const InterviewScheduling = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    candidateId: "",
    candidateName: "",
    candidateEmail: "",
    position: "",
    interviewType: "",
    stage: "",
    date: "",
    time: "",
    duration: "60",
    interviewer: "",
    interviewerEmail: "",
    location: "",
    notes: ""
  });

  const candidates = [
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@email.com", position: "Senior Frontend Developer" },
    { id: 2, name: "Michael Chen", email: "michael.chen@email.com", position: "Backend Developer" },
    { id: 3, name: "Emily Davis", email: "emily.davis@email.com", position: "UX Designer" },
    { id: 4, name: "David Rodriguez", email: "david.rodriguez@email.com", position: "Data Scientist" }
  ];

  const interviewers = [
    { id: 1, name: "John Smith", email: "john.smith@company.com", role: "Tech Lead" },
    { id: 2, name: "Lisa Wong", email: "lisa.wong@company.com", role: "HR Manager" },
    { id: 3, name: "Alex Kumar", email: "alex.kumar@company.com", role: "Design Head" },
    { id: 4, name: "Priya Sharma", email: "priya.sharma@company.com", role: "Data Science Manager" }
  ];

  const handleCandidateSelect = (candidateId) => {
    const candidate = candidates.find(c => c.id === parseInt(candidateId));
    if (candidate) {
      setFormData({
        ...formData,
        candidateId,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        position: candidate.position
      });
    }
  };

  const handleInterviewerSelect = (interviewerId) => {
    const interviewer = interviewers.find(i => i.id === parseInt(interviewerId));
    if (interviewer) {
      setFormData({
        ...formData,
        interviewer: interviewer.name,
        interviewerEmail: interviewer.email
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Scheduling interview:", formData);
    alert("Interview scheduled successfully!");
    navigate("/interview-management");
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

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
                      value={formData.candidateId}
                      onChange={(e) => handleCandidateSelect(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Choose a candidate</option>
                      {candidates.map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name} - {candidate.position}
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
                      value={formData.candidateEmail}
                      onChange={(e) => setFormData({...formData, candidateEmail: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="candidate@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
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
                      value={formData.stage}
                      onChange={(e) => setFormData({...formData, stage: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Select stage</option>
                      <option value="Screening">Screening</option>
                      <option value="Technical">Technical</option>
                      <option value="HR Round">HR Round</option>
                      <option value="Portfolio Review">Portfolio Review</option>
                      <option value="Final">Final</option>
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
                      value={formData.interviewType}
                      onChange={(e) => setFormData({...formData, interviewType: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="In-person">In-person</option>
                      <option value="Video Call">Video Call</option>
                      <option value="Phone Call">Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
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
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
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
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  {/* Interviewer Information */}
                  <div className="col-span-2 mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Interviewer Information</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Interviewer
                    </label>
                    <select
                      onChange={(e) => handleInterviewerSelect(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      required
                    >
                      <option value="">Choose an interviewer</option>
                      {interviewers.map((interviewer) => (
                        <option key={interviewer.id} value={interviewer.id}>
                          {interviewer.name} - {interviewer.role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interviewer Email
                    </label>
                    <input
                      type="email"
                      value={formData.interviewerEmail}
                      onChange={(e) => setFormData({...formData, interviewerEmail: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="interviewer@company.com"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location / Meeting Link
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
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
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
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
                    className="px-6 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors"
                  >
                    Schedule Interview
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