import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const InterviewFeedback = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    technicalSkills: 0,
    communication: 0,
    problemSolving: 0,
    culturalFit: 0,
    strengths: "",
    weaknesses: "",
    recommendations: "",
    decision: "",
    notes: ""
  });

  // Mock interview data
  const interviewData = {
    id: interviewId,
    candidateName: "Michael Chen",
    position: "Backend Developer",
    stage: "Technical",
    date: "2025-11-03",
    time: "2:00 PM",
    interviewer: "Lisa Wong",
    duration: "60 minutes",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
  };

  const handleRatingChange = (category, rating) => {
    setFeedback({ ...feedback, [category]: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting feedback:", feedback);
    alert("Feedback submitted successfully!");
    navigate("/interview-management");
  };

  const StarRating = ({ rating, onRatingChange, label }) => {
    return (
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 w-32">{label}:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className={`w-6 h-6 ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:text-yellow-400 transition-colors`}
            >
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">{rating}/5</span>
      </div>
    );
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
                  <h1 className="text-3xl font-bold text-gray-900">Interview Feedback</h1>
                  <p className="text-gray-600 mt-2">Provide detailed feedback for the interview</p>
                </div>
                <button
                  onClick={() => navigate("/interview-management")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Interviews
                </button>
              </div>
            </div>

            {/* Interview Details Card */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <h2 className="text-lg font-semibold mb-4">Interview Details</h2>
              <div className="flex items-center">
                <img
                  className="h-16 w-16 rounded-full"
                  src={interviewData.avatar}
                  alt={interviewData.candidateName}
                />
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">{interviewData.candidateName}</h3>
                  <p className="text-gray-600">{interviewData.position}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{interviewData.stage}</span>
                    <span>•</span>
                    <span>{interviewData.date} at {interviewData.time}</span>
                    <span>•</span>
                    <span>{interviewData.duration}</span>
                    <span>•</span>
                    <span>Interviewed by {interviewData.interviewer}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-white rounded-lg shadow">
              <form onSubmit={handleSubmit} className="p-6">
                {/* Ratings Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Evaluation Ratings</h3>
                  <div className="space-y-4">
                    <StarRating
                      rating={feedback.overallRating}
                      onRatingChange={(rating) => handleRatingChange("overallRating", rating)}
                      label="Overall Rating"
                    />
                    <StarRating
                      rating={feedback.technicalSkills}
                      onRatingChange={(rating) => handleRatingChange("technicalSkills", rating)}
                      label="Technical Skills"
                    />
                    <StarRating
                      rating={feedback.communication}
                      onRatingChange={(rating) => handleRatingChange("communication", rating)}
                      label="Communication"
                    />
                    <StarRating
                      rating={feedback.problemSolving}
                      onRatingChange={(rating) => handleRatingChange("problemSolving", rating)}
                      label="Problem Solving"
                    />
                    <StarRating
                      rating={feedback.culturalFit}
                      onRatingChange={(rating) => handleRatingChange("culturalFit", rating)}
                      label="Cultural Fit"
                    />
                  </div>
                </div>

                {/* Detailed Feedback */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Strengths
                    </label>
                    <textarea
                      value={feedback.strengths}
                      onChange={(e) => setFeedback({...feedback, strengths: e.target.value})}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="What are the candidate's key strengths?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Areas for Improvement
                    </label>
                    <textarea
                      value={feedback.weaknesses}
                      onChange={(e) => setFeedback({...feedback, weaknesses: e.target.value})}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="What areas need improvement?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recommendations
                    </label>
                    <textarea
                      value={feedback.recommendations}
                      onChange={(e) => setFeedback({...feedback, recommendations: e.target.value})}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="Your recommendations for next steps or future interviews"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={feedback.notes}
                      onChange={(e) => setFeedback({...feedback, notes: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      placeholder="Any additional observations or notes"
                    />
                  </div>
                </div>

                {/* Decision Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Decision</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="proceed"
                        checked={feedback.decision === "proceed"}
                        onChange={(e) => setFeedback({...feedback, decision: e.target.value})}
                        className="text-[#5E17EB] focus:ring-[#5E17EB]"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Proceed to next round
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="hire"
                        checked={feedback.decision === "hire"}
                        onChange={(e) => setFeedback({...feedback, decision: e.target.value})}
                        className="text-[#5E17EB] focus:ring-[#5E17EB]"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Recommend for hire
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="reject"
                        checked={feedback.decision === "reject"}
                        onChange={(e) => setFeedback({...feedback, decision: e.target.value})}
                        className="text-[#5E17EB] focus:ring-[#5E17EB]"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Do not proceed
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="decision"
                        value="waitlist"
                        checked={feedback.decision === "waitlist"}
                        onChange={(e) => setFeedback({...feedback, decision: e.target.value})}
                        className="text-[#5E17EB] focus:ring-[#5E17EB]"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Waitlist for future opportunities
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate("/interview-management")}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors"
                  >
                    Submit Feedback
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

export default InterviewFeedback;