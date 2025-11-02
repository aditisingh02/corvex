import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import candidateService, { candidateUtils } from '../services/candidateService';
import departmentService from '../services/departmentService';

// Department-specific positions mapping
const departmentPositions = {
  // Human Resources
  "Human Resources": {
    management: [
      "Chief Human Resources Officer",
      "HR Director", 
      "HR Manager",
      "Assistant HR Manager"
    ],
    senior: [
      "Senior HR Business Partner",
      "Senior HR Specialist",
      "Senior Recruiter",
      "Senior Compensation Analyst",
      "Senior Training Manager"
    ],
    mid: [
      "HR Business Partner",
      "HR Specialist",
      "Recruiter",
      "HR Coordinator",
      "Training Coordinator",
      "Compensation Analyst",
      "Employee Relations Specialist",
      "HR Generalist"
    ],
    junior: [
      "Junior HR Specialist",
      "HR Assistant",
      "Recruitment Coordinator",
      "HR Intern"
    ]
  },

  // Engineering
  "Engineering": {
    management: [
      "Chief Technology Officer",
      "VP of Engineering",
      "Engineering Director",
      "Engineering Manager",
      "Tech Lead",
      "Team Lead"
    ],
    senior: [
      "Senior Software Engineer",
      "Senior Full Stack Developer",
      "Senior Frontend Developer",
      "Senior Backend Developer",
      "Senior DevOps Engineer",
      "Senior Mobile Developer",
      "Senior Data Engineer",
      "Senior QA Engineer",
      "Principal Engineer"
    ],
    mid: [
      "Software Engineer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "DevOps Engineer",
      "Mobile Developer",
      "Data Engineer",
      "QA Engineer",
      "Software Developer"
    ],
    junior: [
      "Junior Software Engineer",
      "Junior Developer",
      "Junior QA Engineer",
      "Software Engineer Intern",
      "Developer Trainee"
    ]
  },

  // Marketing
  "Marketing": {
    management: [
      "Chief Marketing Officer",
      "Marketing Director",
      "Marketing Manager",
      "Brand Manager",
      "Product Marketing Manager",
      "Digital Marketing Manager"
    ],
    senior: [
      "Senior Marketing Specialist",
      "Senior Content Strategist",
      "Senior Social Media Manager",
      "Senior SEO Specialist",
      "Senior Brand Specialist"
    ],
    mid: [
      "Marketing Specialist",
      "Content Marketing Specialist",
      "Digital Marketing Specialist",
      "Social Media Specialist",
      "SEO Specialist",
      "Content Writer",
      "Marketing Coordinator",
      "Campaign Manager",
      "Brand Specialist"
    ],
    junior: [
      "Junior Marketing Specialist",
      "Marketing Assistant",
      "Social Media Coordinator",
      "Marketing Intern"
    ]
  },

  // Sales
  "Sales": {
    management: [
      "Chief Revenue Officer",
      "VP of Sales",
      "Sales Director",
      "Regional Sales Manager",
      "Sales Manager",
      "Area Sales Manager"
    ],
    senior: [
      "Senior Sales Executive",
      "Senior Account Manager",
      "Senior Business Development Manager",
      "Key Account Manager",
      "Enterprise Sales Executive"
    ],
    mid: [
      "Sales Executive",
      "Account Manager",
      "Business Development Representative",
      "Sales Representative",
      "Inside Sales Representative",
      "Sales Consultant"
    ],
    junior: [
      "Junior Sales Executive",
      "Sales Associate",
      "Sales Trainee",
      "Sales Intern"
    ]
  },

  // Finance
  "Finance": {
    management: [
      "Chief Financial Officer",
      "Finance Director",
      "Controller",
      "Finance Manager",
      "Accounting Manager"
    ],
    senior: [
      "Senior Financial Analyst",
      "Senior Accountant",
      "Senior Tax Specialist",
      "Senior Budget Analyst"
    ],
    mid: [
      "Financial Analyst",
      "Accountant",
      "Tax Specialist",
      "Budget Analyst",
      "Financial Coordinator",
      "Accounts Payable Specialist",
      "Accounts Receivable Specialist"
    ],
    junior: [
      "Junior Financial Analyst",
      "Junior Accountant",
      "Accounting Assistant",
      "Finance Intern"
    ]
  },

  // Operations
  "Operations": {
    management: [
      "Chief Operating Officer",
      "Operations Director",
      "Operations Manager",
      "Production Manager",
      "Supply Chain Manager"
    ],
    senior: [
      "Senior Operations Specialist",
      "Senior Process Analyst",
      "Senior Supply Chain Analyst",
      "Senior Quality Analyst"
    ],
    mid: [
      "Operations Specialist",
      "Process Analyst",
      "Supply Chain Analyst",
      "Quality Analyst",
      "Operations Coordinator",
      "Logistics Coordinator"
    ],
    junior: [
      "Junior Operations Specialist",
      "Operations Assistant",
      "Operations Intern"
    ]
  }
};

const EditCandidate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {},
    dateOfBirth: '',
    nationality: '',
    position: '',
    department: '',
    appliedDate: '',
    source: 'website',
    referredBy: '',
    expectedSalary: '',
    availableStartDate: '',
    education: [],
    certifications: [],
    workExperience: [],
    technicalSkills: [],
    softSkills: [],
    languages: [],
    resume: '',
    coverLetter: '',
    portfolio: '',
    otherAttachments: [],
    notes: '',
    totalExperience: 0,
    interviewStage: 'applied',
    status: 'active'
  });

  useEffect(() => {
    fetchCandidate();
    fetchDepartments();
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
      
      // Transform API data to form format
      const transformedData = candidateUtils.transformApiDataToForm(candidateData);
      console.log('Transformed data:', transformedData);
      setFormData(transformedData);
    } catch (error) {
      console.error('Error in fetchCandidate:', error);
      setError(error.message || 'Failed to fetch candidate details');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await departmentService.getAllDepartments();
      setDepartments(response.data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Clear position when department changes
      if (name === 'department') {
        newData.position = '';
      }
      
      return newData;
    });
  };

  // Get available positions based on selected department
  const getAvailablePositions = () => {
    const selectedDepartment = formData.department;
    
    // Find the department by ID from the departments array
    const department = departments.find(dept => dept._id === selectedDepartment);
    const departmentName = department?.name;
    
    if (!departmentName || !departmentPositions[departmentName]) {
      return [];
    }
    
    const deptPositions = departmentPositions[departmentName];
    
    // Flatten all levels into a single array with level labels
    const allPositions = [
      ...deptPositions.management.map(title => ({ title, level: 'Management' })),
      ...deptPositions.senior.map(title => ({ title, level: 'Senior Level' })),
      ...deptPositions.mid.map(title => ({ title, level: 'Mid Level' })),
      ...deptPositions.junior.map(title => ({ title, level: 'Junior Level' }))
    ];
    
    return allPositions;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Validate form data
      const candidateData = candidateUtils.transformFormDataToApi(formData);
      const validation = candidateUtils.validateCandidateData(candidateData);

      if (!validation.isValid) {
        setError(Object.values(validation.errors).join(', '));
        setSaving(false);
        return;
      }

      // Update candidate
      await candidateService.updateCandidate(id, candidateData);
      setSuccess('Candidate updated successfully!');
      
      setTimeout(() => {
        navigate(`/view-candidate/${id}`);
      }, 2000);
    } catch (error) {
      setError(error.message || 'Failed to update candidate');
    } finally {
      setSaving(false);
    }
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
              <p className="mt-4 text-gray-600">Loading candidate details...</p>
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
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Edit Candidate</h1>
                  <p className="text-gray-600 mt-2">Update candidate information</p>
                </div>
                <button
                  onClick={() => navigate(`/view-candidate/${id}`)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Back to Candidate
                </button>
              </div>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">{success}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Application Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="position"
                        value={formData.position || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        required
                        disabled={!formData.department}
                      >
                        <option value="">
                          {!formData.department ? "Please select a department first" : "Select position"}
                        </option>
                        
                        {formData.department && getAvailablePositions().length > 0 && (
                          <>
                            {/* Group positions by level */}
                            {['Management', 'Senior Level', 'Mid Level', 'Junior Level'].map(level => {
                              const levelPositions = getAvailablePositions().filter(pos => pos.level === level);
                              if (levelPositions.length === 0) return null;
                              
                              return (
                                <optgroup key={level} label={level}>
                                  {levelPositions.map((position) => (
                                    <option key={position.title} value={position.title}>
                                      {position.title}
                                    </option>
                                  ))}
                                </optgroup>
                              );
                            })}
                          </>
                        )}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="department"
                        value={formData.department || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept._id} value={dept._id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary</label>
                      <input
                        type="number"
                        name="expectedSalary"
                        value={formData.expectedSalary || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience (years)</label>
                      <input
                        type="number"
                        name="totalExperience"
                        value={formData.totalExperience || ''}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Interview Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interview Stage
                      </label>
                      <select
                        name="interviewStage"
                        value={formData.interviewStage || 'applied'}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      >
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status || 'active'}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                      >
                        <option value="active">Active</option>
                        <option value="withdrawn">Withdrawn</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                        <option value="on_hold">On Hold</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>Note:</strong> Manually updating the interview stage will override the automatic progression. 
                          Consider using the "Advance Stage" button in the candidates list for standard progression.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                      <textarea
                        name="technicalSkills"
                        value={formData.technicalSkills?.join(', ') || ''}
                        onChange={(e) => {
                          const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                          setFormData(prev => ({ ...prev, technicalSkills: skills }));
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        rows="3"
                        placeholder="e.g. JavaScript, React, Node.js"
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Soft Skills</label>
                      <textarea
                        name="softSkills"
                        value={formData.softSkills?.join(', ') || ''}
                        onChange={(e) => {
                          const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                          setFormData(prev => ({ ...prev, softSkills: skills }));
                        }}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                        rows="3"
                        placeholder="e.g. Leadership, Communication"
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                    rows="4"
                    placeholder="Any additional information about the candidate..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(`/view-candidate/${id}`)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditCandidate;