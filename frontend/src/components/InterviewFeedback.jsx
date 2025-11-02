import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { interviewService } from "../services/interviewService";

const InterviewFeedback = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [interviewData, setInterviewData] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  
  const [feedback, setFeedback] = useState({
    overallRating: 0,
    technicalSkills: { rating: 0, comments: "" },
    communicationSkills: { rating: 0, comments: "" },
    problemSolving: { rating: 0, comments: "" },
    culturalFit: { rating: 0, comments: "" },
    strengths: "",
    weaknesses: "",
    recommendations: "",
    decision: "",
    notes: ""
  });

  useEffect(() => {
    fetchInterviewData();
  }, [interviewId]);

  const fetchInterviewData = async () => {
    try {
      setLoading(true);
      setError("");
      console.log('Fetching interview data for ID:', interviewId);
      
      const response = await interviewService.getInterviewById(interviewId);
      console.log('Interview data response:', response);
      
      const interview = response.data || response;
      setInterviewData(interview);
      
      // Check if interview already has feedback (view mode) or is empty (add mode)
      if (interview.feedback && interview.feedback.overallRating) {
        setIsViewMode(true);
        setFeedback({
          overallRating: interview.feedback.overallRating || 0,
          technicalSkills: interview.feedback.technicalSkills || { rating: 0, comments: "" },
          communicationSkills: interview.feedback.communicationSkills || { rating: 0, comments: "" },
          problemSolving: interview.feedback.problemSolving || { rating: 0, comments: "" },
          culturalFit: interview.feedback.culturalFit || { rating: 0, comments: "" },
          strengths: interview.feedback.strengths || "",
          weaknesses: interview.feedback.weaknesses || "",
          recommendations: interview.feedback.recommendations || "",
          decision: interview.feedback.decision || "",
          notes: interview.feedback.notes || ""
        });
      }
    } catch (error) {
      console.error('Error fetching interview data:', error);
      setError('Failed to load interview data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = (category, rating) => {
    if (category === 'overallRating') {
      setFeedback({ ...feedback, [category]: rating });
    } else {
      // Handle nested rating structure for skill categories
      setFeedback({ 
        ...feedback, 
        [category]: { 
          ...feedback[category], 
          rating: rating 
        } 
      });
    }
  };

  const handleCommentChange = (category, comment) => {
    setFeedback({ 
      ...feedback, 
      [category]: { 
        ...feedback[category], 
        comments: comment 
      } 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isViewMode) {
      navigate("/interview-management");
      return;
    }

    setSaving(true);
    setError("");

    try {
      console.log("Submitting feedback:", feedback);
      
      await interviewService.addFeedback(interviewId, feedback);
      
      // Show success message and redirect
      alert("Feedback submitted successfully! Interview marked as completed.");
      navigate("/interview-management");
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const StarRating = ({ rating, onRatingChange, label, disabled = false }) => {
    return (
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 w-32">{label}:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => !disabled && onRatingChange(star)}
              disabled={disabled}
              className={`w-6 h-6 ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } ${!disabled ? "hover:text-yellow-400" : "cursor-not-allowed"} transition-colors`}
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

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading interview data...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Interview</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => navigate("/interview-management")}
                className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99]"
              >
                Back to Interviews
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Interview Not Found</h3>
              <p className="text-gray-600 mb-4">The requested interview could not be found.</p>
              <button
                onClick={() => navigate("/interview-management")}
                className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99]"
              >
                Back to Interviews
              </button>
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
                  <h1 className="text-3xl font-bold text-gray-900">
                    {isViewMode ? "Interview Feedback" : "Add Interview Feedback"}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {isViewMode ? "View detailed feedback for the interview" : "Provide detailed feedback for the interview"}
                  </p>
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
                <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-700">
                    {interviewData.candidate?.personalInfo?.firstName?.[0]}
                    {interviewData.candidate?.personalInfo?.lastName?.[0]}
                  </span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {interviewData.candidate?.personalInfo?.firstName} {interviewData.candidate?.personalInfo?.lastName}
                  </h3>
                  <p className="text-gray-600">{interviewData.interviewDetails?.position}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="capitalize">{interviewData.interviewDetails?.stage?.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>{new Date(interviewData.scheduling?.date).toLocaleDateString()} at {interviewData.scheduling?.time}</span>
                    <span>•</span>
                    <span>{interviewData.scheduling?.duration} minutes</span>
                    <span>•</span>
                    <span>Interviewed by {interviewData.interviewer?.personalInfo?.firstName} {interviewData.interviewer?.personalInfo?.lastName}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      interviewData.status === 'completed' ? 'bg-green-100 text-green-800' :
                      interviewData.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      interviewData.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {interviewData.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-white rounded-lg shadow">
              {error && (
                <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="p-6">
                {/* Ratings Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Evaluation Ratings</h3>
                  <div className="space-y-4">
                    <StarRating
                      rating={feedback.overallRating}
                      onRatingChange={(rating) => handleRatingChange("overallRating", rating)}
                      label="Overall Rating"
                      disabled={isViewMode}
                    />
                    <StarRating
                      rating={feedback.technicalSkills?.rating || 0}
                      onRatingChange={(rating) => handleRatingChange("technicalSkills", rating)}
                      label="Technical Skills"
                      disabled={isViewMode}
                    />
                    <StarRating
                      rating={feedback.communicationSkills?.rating || 0}
                      onRatingChange={(rating) => handleRatingChange("communicationSkills", rating)}
                      label="Communication"
                      disabled={isViewMode}
                    />
                    <StarRating
                      rating={feedback.problemSolving?.rating || 0}
                      onRatingChange={(rating) => handleRatingChange("problemSolving", rating)}
                      label="Problem Solving"
                      disabled={isViewMode}
                    />
                    <StarRating
                      rating={feedback.culturalFit?.rating || 0}
                      onRatingChange={(rating) => handleRatingChange("culturalFit", rating)}
                      label="Cultural Fit"
                      disabled={isViewMode}
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="What are the candidate's key strengths?"
                      required={!isViewMode}
                      disabled={isViewMode}
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="What areas need improvement?"
                      required={!isViewMode}
                      disabled={isViewMode}
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Your recommendations for next steps or future interviews"
                      required={!isViewMode}
                      disabled={isViewMode}
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
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Any additional observations or notes"
                      disabled={isViewMode}
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
                        className="text-[#5E17EB] focus:ring-[#5E17EB] disabled:cursor-not-allowed"
                        disabled={isViewMode}
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
                        className="text-[#5E17EB] focus:ring-[#5E17EB] disabled:cursor-not-allowed"
                        disabled={isViewMode}
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
                        className="text-[#5E17EB] focus:ring-[#5E17EB] disabled:cursor-not-allowed"
                        disabled={isViewMode}
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
                        className="text-[#5E17EB] focus:ring-[#5E17EB] disabled:cursor-not-allowed"
                        disabled={isViewMode}
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
                    {isViewMode ? "Close" : "Cancel"}
                  </button>
                  {!isViewMode && (
                    <>
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Save as Draft
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? "Submitting..." : "Submit Feedback"}
                      </button>
                    </>
                  )}
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