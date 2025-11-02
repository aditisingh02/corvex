import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import candidateService, { candidateUtils } from '../services/candidateService';

const ViewCandidate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchCandidate();
  }, [id]);

  const fetchCandidate = async () => {
    try {
      setLoading(true);
      console.log('Fetching candidate with ID:', id);
      const response = await candidateService.getCandidateById(id);
      console.log('Candidate response:', response);
      
      // Handle both possible response structures
      const candidateData = response.data || response;
      console.log('Candidate data:', candidateData);
      
      if (!candidateData) {
        throw new Error('No candidate data received');
      }
      
      setCandidate(candidateData);
    } catch (error) {
      console.error('Error fetching candidate:', error);
      setError(error.message || 'Failed to fetch candidate details');
    } finally {
      setLoading(false);
    }
  };

  const handleAdvanceStage = async () => {
    try {
      setActionLoading(true);
      await candidateService.advanceStage(id);
      await fetchCandidate(); // Refresh data
    } catch (error) {
      setError(error.message || 'Failed to advance candidate stage');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectCandidate = async () => {
    const reason = prompt('Please provide a reason for rejection (optional):');
    if (reason !== null) {
      try {
        setActionLoading(true);
        await candidateService.rejectCandidate(id, reason);
        await fetchCandidate(); // Refresh data
      } catch (error) {
        setError(error.message || 'Failed to reject candidate');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleHireCandidate = async () => {
    if (window.confirm('Are you sure you want to hire this candidate?')) {
      try {
        setActionLoading(true);
        await candidateService.hireCandidate(id);
        await fetchCandidate(); // Refresh data
      } catch (error) {
        setError(error.message || 'Failed to hire candidate');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const renderPersonalInfo = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <p className="text-gray-900 font-medium">
            {candidate.personalInfo?.firstName} {candidate.personalInfo?.lastName}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <p className="text-gray-900">{candidate.personalInfo?.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <p className="text-gray-900">{candidate.personalInfo?.phone}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
          <p className="text-gray-900">
            {candidate.personalInfo?.dateOfBirth 
              ? new Date(candidate.personalInfo.dateOfBirth).toLocaleDateString()
              : 'Not provided'
            }
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Nationality</label>
          <p className="text-gray-900">{candidate.personalInfo?.nationality || 'Not provided'}</p>
        </div>
        {candidate.personalInfo?.address && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <p className="text-gray-900">
              {[
                candidate.personalInfo.address.street,
                candidate.personalInfo.address.city,
                candidate.personalInfo.address.state,
                candidate.personalInfo.address.zipCode,
                candidate.personalInfo.address.country
              ].filter(Boolean).join(', ') || 'Not provided'}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderApplicationInfo = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">Position</label>
          <p className="text-gray-900 font-medium">{candidate.applicationInfo?.position}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Department</label>
          <p className="text-gray-900">{candidate.applicationInfo?.department?.name || candidate.applicationInfo?.department}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Applied Date</label>
          <p className="text-gray-900">
            {new Date(candidate.applicationInfo?.appliedDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Application Source</label>
          <p className="text-gray-900">{candidateUtils.formatStatus(candidate.applicationInfo?.source)}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Current Stage</label>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${candidateUtils.getStageColor(candidate.interviewStage)}`}>
            {candidateUtils.formatStage(candidate.interviewStage)}
          </span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Status</label>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${candidateUtils.getStatusColor(candidate.status)}`}>
            {candidateUtils.formatStatus(candidate.status)}
          </span>
        </div>
        {candidate.applicationInfo?.referredBy && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Referred By</label>
            <p className="text-gray-900">{candidate.applicationInfo.referredBy}</p>
          </div>
        )}
        {candidate.applicationInfo?.expectedSalary && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Expected Salary</label>
            <p className="text-gray-900">${candidate.applicationInfo.expectedSalary.toLocaleString()}</p>
          </div>
        )}
        {candidate.applicationInfo?.availableStartDate && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Available Start Date</label>
            <p className="text-gray-900">
              {new Date(candidate.applicationInfo.availableStartDate).toLocaleDateString()}
            </p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-600">Total Experience</label>
          <p className="text-gray-900">{candidate.totalExperience || 0} years</p>
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
      {candidate.experience && candidate.experience.length > 0 ? (
        <div className="space-y-4">
          {candidate.experience.map((exp, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString()} - 
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-700 mb-2">{exp.description}</p>
              )}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No work experience provided</p>
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
      {candidate.education && candidate.education.length > 0 ? (
        <div className="space-y-4">
          {candidate.education.map((edu, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.field && (
                    <p className="text-sm text-gray-600">Field: {edu.field}</p>
                  )}
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
                  )}
                </div>
                {edu.graduationYear && (
                  <div className="text-sm text-gray-500">
                    Graduated: {edu.graduationYear}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No education information provided</p>
      )}
    </div>
  );

  const renderSkills = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
      {candidate.skills && candidate.skills.length > 0 ? (
        <div className="space-y-4">
          {candidate.skills.map((skill, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium text-gray-900">{skill.name}</span>
                {skill.yearsOfExperience && (
                  <span className="text-sm text-gray-600 ml-2">
                    ({skill.yearsOfExperience} years)
                  </span>
                )}
              </div>
              {skill.level && (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  skill.level === 'expert' ? 'bg-green-100 text-green-800' :
                  skill.level === 'advanced' ? 'bg-blue-100 text-blue-800' :
                  skill.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No skills information provided</p>
      )}
    </div>
  );

  const renderAttachments = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidate.documents?.resume?.path && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <span className="text-gray-900">Resume</span>
              {candidate.documents.resume.filename && (
                <p className="text-sm text-gray-600">{candidate.documents.resume.filename}</p>
              )}
            </div>
            <a
              href={candidate.documents.resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5E17EB] hover:text-[#4A0E99]"
            >
              View
            </a>
          </div>
        )}
        {candidate.documents?.coverLetter?.path && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <span className="text-gray-900">Cover Letter</span>
              {candidate.documents.coverLetter.filename && (
                <p className="text-sm text-gray-600">{candidate.documents.coverLetter.filename}</p>
              )}
            </div>
            <a
              href={candidate.documents.coverLetter.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5E17EB] hover:text-[#4A0E99]"
            >
              View
            </a>
          </div>
        )}
        {candidate.documents?.portfolio?.path && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <span className="text-gray-900">Portfolio</span>
              {candidate.documents.portfolio.filename && (
                <p className="text-sm text-gray-600">{candidate.documents.portfolio.filename}</p>
              )}
            </div>
            <a
              href={candidate.documents.portfolio.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5E17EB] hover:text-[#4A0E99]"
            >
              View
            </a>
          </div>
        )}
      </div>
      {(!candidate.documents?.resume?.path && !candidate.documents?.coverLetter?.path && !candidate.documents?.portfolio?.path) && (
        <p className="text-gray-500">No documents provided</p>
      )}
    </div>
  );

  const renderNotes = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Notes</h2>
      {candidate.notes && candidate.notes.length > 0 ? (
        <div className="space-y-4">
          {candidate.notes.map((note, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="text-sm text-gray-500 ml-4 flex-shrink-0">
                  {note.addedAt && new Date(note.addedAt).toLocaleDateString()}
                  {note.addedBy && (
                    <p className="text-xs">
                      by {note.addedBy.personalInfo?.firstName} {note.addedBy.personalInfo?.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No notes available</p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading candidate details...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error && !candidate) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading candidate</h3>
              <p className="mt-1 text-sm text-gray-500">{error}</p>
              <div className="mt-6 flex space-x-4 justify-center">
                <button
                  onClick={fetchCandidate}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5E17EB] hover:bg-[#4A0E99]"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/candidates')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Candidates
                </button>
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
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/candidates')}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ← Back to Candidates
                  </button>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {candidate.personalInfo?.firstName} {candidate.personalInfo?.lastName}
                    </h1>
                    <p className="text-gray-600 mt-1">{candidate.applicationInfo?.position}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/edit-candidate/${id}`)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  
                  {candidate.status === 'active' && candidate.interviewStage !== 'selected' && candidate.interviewStage !== 'rejected' && (
                    <>
                      <button
                        onClick={handleAdvanceStage}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {actionLoading ? 'Processing...' : 'Advance Stage'}
                      </button>
                      <button
                        onClick={handleRejectCandidate}
                        disabled={actionLoading}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                      >
                        {actionLoading ? 'Processing...' : 'Reject'}
                      </button>
                    </>
                  )}
                  
                  {candidate.interviewStage === 'final' && candidate.status === 'active' && (
                    <button
                      onClick={handleHireCandidate}
                      disabled={actionLoading}
                      className="px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] disabled:opacity-50"
                    >
                      {actionLoading ? 'Processing...' : 'Hire Candidate'}
                    </button>
                  )}
                  
                  <button
                    onClick={() => navigate('/interview-scheduling', { state: { candidateId: id } })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Schedule Interview
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>

            {/* Candidate Details */}
            <div className="space-y-6">
              {renderPersonalInfo()}
              {renderApplicationInfo()}
              {renderExperience()}
              {renderEducation()}
              {renderSkills()}
              {renderAttachments()}
              {renderNotes()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewCandidate;