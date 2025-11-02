import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
      "Content Writing Intern",
      "Social Media Intern",
      "Marketing Intern"
    ]
  },

  // Finance
  "Finance": {
    management: [
      "Chief Financial Officer",
      "Finance Director",
      "Finance Manager",
      "Accounting Manager",
      "Controller",
      "Treasurer"
    ],
    senior: [
      "Senior Financial Analyst",
      "Senior Accountant",
      "Senior Auditor",
      "Senior Tax Specialist",
      "Senior Budget Analyst"
    ],
    mid: [
      "Financial Analyst",
      "Accountant",
      "Auditor",
      "Tax Specialist",
      "Budget Analyst",
      "Finance Coordinator",
      "Accounts Payable Specialist",
      "Accounts Receivable Specialist"
    ],
    junior: [
      "Junior Financial Analyst",
      "Junior Accountant",
      "Finance Assistant",
      "Accounting Clerk",
      "Finance Intern"
    ]
  },

  // Sales
  "Sales": {
    management: [
      "Chief Sales Officer",
      "Sales Director",
      "Regional Sales Manager",
      "Sales Manager",
      "Area Sales Manager"
    ],
    senior: [
      "Senior Sales Representative",
      "Senior Account Manager",
      "Senior Business Development Manager",
      "Key Account Manager"
    ],
    mid: [
      "Sales Representative",
      "Account Manager",
      "Business Development Representative",
      "Sales Coordinator",
      "Inside Sales Representative"
    ],
    junior: [
      "Junior Sales Representative",
      "Sales Assistant",
      "Sales Intern",
      "Lead Generation Specialist"
    ]
  },

  // Operations
  "Operations": {
    management: [
      "Chief Operating Officer",
      "Operations Director",
      "Operations Manager",
      "Supply Chain Manager",
      "Logistics Manager"
    ],
    senior: [
      "Senior Operations Specialist",
      "Senior Supply Chain Analyst",
      "Senior Logistics Coordinator"
    ],
    mid: [
      "Operations Specialist",
      "Supply Chain Analyst",
      "Logistics Coordinator",
      "Operations Coordinator",
      "Process Improvement Specialist"
    ],
    junior: [
      "Operations Assistant",
      "Logistics Assistant",
      "Operations Intern"
    ]
  }
};

const AddCandidate = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [departments, setDepartments] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    
    // Application Information
    position: '',
    department: '',
    appliedDate: new Date().toISOString().split('T')[0],
    source: 'website',
    referredBy: '',
    expectedSalary: '',
    availableStartDate: '',
    
    // Qualifications
    education: [{
      degree: '',
      institution: '',
      graduationYear: '',
      gpa: ''
    }],
    certifications: [],
    
    // Work Experience
    workExperience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: []
    }],
    totalExperience: 0,
    
    // Skills
    technicalSkills: [],
    softSkills: [],
    languages: [{
      language: '',
      proficiency: 'beginner'
    }],
    
    // Attachments
    resume: '',
    coverLetter: '',
    portfolio: '',
    otherAttachments: [],
    
    // Additional Information
    notes: ''
  });

  // Fetch departments on component mount
  useEffect(() => {
    // Wait for auth to load
    if (authLoading) return;
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError('You must be logged in to add candidates. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    
    fetchDepartments();
  }, [isAuthenticated, authLoading, navigate]);

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

  const handleNestedInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayInputChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, newItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSkillsChange = (skillType, value) => {
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({
      ...prev,
      [skillType]: skillsArray
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.position && formData.department;
      case 3:
        return true; // Optional fields
      case 4:
        return true; // Optional fields
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      setError('');
    } else {
      setError('Please fill in all required fields for this step.');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form data
      const validation = candidateUtils.validateCandidateData(
        candidateUtils.transformFormDataToApi(formData)
      );

      if (!validation.isValid) {
        setError(Object.values(validation.errors).join(', '));
        setLoading(false);
        return;
      }

      // Transform and submit data
      const candidateData = candidateUtils.transformFormDataToApi(formData);
      console.log('Submitting candidate data:', candidateData);
      
      const response = await candidateService.createCandidate(candidateData);

      setSuccess('Candidate created successfully!');
      setTimeout(() => {
        navigate('/candidates');
      }, 2000);
    } catch (error) {
      console.error('AddCandidate submission error:', error);
      
      // Show user-friendly error message
      if (error.message?.includes('Authentication required') || error.message?.includes('log in')) {
        setError(`${error.message} Click here to go to login page.`);
        // Optionally redirect to login after a delay
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(error.message || 'Failed to create candidate. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
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
            value={formData.lastName}
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
            value={formData.email}
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
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          >
            <option value="">Select nationality</option>
            <option value="Indian">Indian</option>
            <option value="American">American</option>
            <option value="British">British</option>
            <option value="Canadian">Canadian</option>
            <option value="Australian">Australian</option>
            <option value="German">German</option>
            <option value="French">French</option>
            <option value="Japanese">Japanese</option>
            <option value="Chinese">Chinese</option>
            <option value="Brazilian">Brazilian</option>
            <option value="South African">South African</option>
            <option value="Nigerian">Nigerian</option>
            <option value="Mexican">Mexican</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      {/* Address Section */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-4">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleNestedInputChange('address', 'street', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => handleNestedInputChange('address', 'city', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
            <input
              type="text"
              value={formData.address.state}
              onChange={(e) => handleNestedInputChange('address', 'state', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              value={formData.address.zipCode}
              onChange={(e) => handleNestedInputChange('address', 'zipCode', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              type="text"
              value={formData.address.country}
              onChange={(e) => handleNestedInputChange('address', 'country', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderApplicationInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Application Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position <span className="text-red-500">*</span>
          </label>
          <select
            name="position"
            value={formData.position}
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
            value={formData.department}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Applied Date</label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Application Source</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          >
            <option value="website">Company Website</option>
            <option value="linkedin">LinkedIn</option>
            <option value="referral">Employee Referral</option>
            <option value="job_board">Job Board</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Referred By</label>
          <input
            type="text"
            name="referredBy"
            value={formData.referredBy}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            placeholder="Employee name (if referred)"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary</label>
          <input
            type="number"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            placeholder="Annual salary expectation"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Start Date</label>
          <input
            type="date"
            name="availableStartDate"
            value={formData.availableStartDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience (years)</label>
          <input
            type="number"
            name="totalExperience"
            value={formData.totalExperience}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            min="0"
            step="0.5"
          />
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Experience & Education</h3>
      
      {/* Work Experience */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium text-gray-800">Work Experience</h4>
          <button
            type="button"
            onClick={() => addArrayItem('workExperience', {
              company: '', position: '', startDate: '', endDate: '', description: '', technologies: []
            })}
            className="text-[#5E17EB] hover:text-[#4A0E99] text-sm"
          >
            + Add Experience
          </button>
        </div>
        
        {formData.workExperience.map((exp, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleArrayInputChange('workExperience', index, 'company', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleArrayInputChange('workExperience', index, 'position', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleArrayInputChange('workExperience', index, 'startDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleArrayInputChange('workExperience', index, 'endDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => handleArrayInputChange('workExperience', index, 'description', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                rows="3"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => removeArrayItem('workExperience', index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Education */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium text-gray-800">Education</h4>
          <button
            type="button"
            onClick={() => addArrayItem('education', {
              degree: '', institution: '', graduationYear: '', gpa: ''
            })}
            className="text-[#5E17EB] hover:text-[#4A0E99] text-sm"
          >
            + Add Education
          </button>
        </div>
        
        {formData.education.map((edu, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleArrayInputChange('education', index, 'degree', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleArrayInputChange('education', index, 'institution', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                <input
                  type="number"
                  value={edu.graduationYear}
                  onChange={(e) => handleArrayInputChange('education', index, 'graduationYear', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleArrayInputChange('education', index, 'gpa', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
                  placeholder="e.g. 3.8/4.0"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => removeArrayItem('education', index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsAndAttachments = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Skills & Attachments</h3>
      
      {/* Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
          <textarea
            value={formData.technicalSkills.join(', ')}
            onChange={(e) => handleSkillsChange('technicalSkills', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            rows="3"
            placeholder="e.g. JavaScript, React, Node.js, Python"
          />
          <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Soft Skills</label>
          <textarea
            value={formData.softSkills.join(', ')}
            onChange={(e) => handleSkillsChange('softSkills', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            rows="3"
            placeholder="e.g. Leadership, Communication, Problem Solving"
          />
          <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
        </div>
      </div>
      
      {/* Languages */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium text-gray-800">Languages</h4>
          <button
            type="button"
            onClick={() => addArrayItem('languages', { language: '', proficiency: 'beginner' })}
            className="text-[#5E17EB] hover:text-[#4A0E99] text-sm"
          >
            + Add Language
          </button>
        </div>
        
        {formData.languages.map((lang, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <input
                type="text"
                value={lang.language}
                onChange={(e) => handleArrayInputChange('languages', index, 'language', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency</label>
              <select
                value={lang.proficiency}
                onChange={(e) => handleArrayInputChange('languages', index, 'proficiency', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="native">Native</option>
              </select>
            </div>
            
            <div>
              <button
                type="button"
                onClick={() => removeArrayItem('languages', index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Attachments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resume URL</label>
          <input
            type="url"
            name="resume"
            value={formData.resume}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            placeholder="https://example.com/resume.pdf"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
            placeholder="https://example.com/portfolio"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter URL</label>
        <input
          type="url"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          placeholder="https://example.com/cover-letter.pdf"
        />
      </div>
      
      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E17EB]"
          rows="4"
          placeholder="Any additional information about the candidate..."
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderApplicationInfo();
      case 3:
        return renderExperience();
      case 4:
        return renderSkillsAndAttachments();
      default:
        return renderPersonalInfo();
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5E17EB] mx-auto"></div>
              <p className="mt-4 text-gray-600">Checking authentication...</p>
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
                  <h1 className="text-3xl font-bold text-gray-900">Add New Candidate</h1>
                  <p className="text-gray-600 mt-2">Create a comprehensive candidate profile</p>
                </div>
                <button
                  onClick={() => navigate('/candidates')}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Back to Candidates
                </button>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step <= currentStep
                          ? 'bg-[#5E17EB] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-full h-1 mx-4 ${
                          step < currentStep ? 'bg-[#5E17EB]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Personal Info</span>
                <span>Application</span>
                <span>Experience</span>
                <span>Skills & Files</span>
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
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0E99] transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Creating...' : 'Create Candidate'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCandidate;