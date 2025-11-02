import api from './api';

const candidateService = {
  // Get all candidates with optional filtering
  getAllCandidates: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.stage) queryParams.append('stage', filters.stage);
      if (filters.position) queryParams.append('position', filters.position);
      if (filters.page) queryParams.append('page', filters.page);
      if (filters.limit) queryParams.append('limit', filters.limit);
      
      const queryString = queryParams.toString();
      const url = queryString ? `/candidates?${queryString}` : '/candidates';
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      
      // Handle specific error cases
      if (error.message?.includes('Not authorized')) {
        throw new Error('You need to log in to view candidates. Please log in and try again.');
      }
      if (error.message?.includes('Route /api/candidates not found')) {
        throw new Error('Candidates service is not available. Please contact support.');
      }
      
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch candidates');
    }
  },

  // Get single candidate by ID
  getCandidateById: async (id) => {
    try {
      const response = await api.get(`/candidates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch candidate');
    }
  },

  // Create new candidate
  createCandidate: async (candidateData) => {
    try {
      console.log('Creating candidate with data:', candidateData);
      
      // Check if user is authenticated before making the request
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required: Please log in to create candidates.');
      }
      
      console.log('Token exists, making API request...');
      const response = await api.post('/candidates', candidateData);
      console.log('Candidate created successfully:', response);
      return response.data;
    } catch (error) {
      console.error('Error creating candidate:', error);
      console.error('Candidate data that failed:', candidateData);
      
      // Get the original error message
      const originalMessage = error.message || 'Unknown error occurred';
      
      // Handle specific error cases based on the original message
      if (originalMessage.includes('Authentication required')) {
        throw error; // Re-throw our custom auth error as-is
      }
      if (originalMessage.includes('Not authorized') || originalMessage.includes('401')) {
        throw new Error('Session expired or invalid. Please log in again to create candidates.');
      }
      if (originalMessage.includes('Route /api/candidates not found') || originalMessage.includes('404')) {
        throw new Error('Candidates service is not available. Please contact support.');
      }
      if (originalMessage.includes('Network error')) {
        throw error; // Re-throw network errors as-is
      }
      if (originalMessage.includes('500')) {
        throw new Error('Server error occurred while creating candidate. Please try again or contact support.');
      }
      if (originalMessage.includes('400')) {
        throw new Error('Invalid candidate data provided. Please check all required fields and try again.');
      }
      
      // For any other error, just re-throw it to preserve the original message
      throw error;
    }
  },

  // Update candidate
  updateCandidate: async (id, candidateData) => {
    try {
      const response = await api.put(`/candidates/${id}`, candidateData);
      return response.data;
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw new Error(error.response?.data?.message || 'Failed to update candidate');
    }
  },

  // Delete candidate
  deleteCandidate: async (id) => {
    try {
      const response = await api.delete(`/candidates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete candidate');
    }
  },

  // Advance candidate to next stage
  advanceStage: async (id) => {
    try {
      const response = await api.put(`/candidates/${id}/advance`);
      return response.data;
    } catch (error) {
      console.error('Error advancing candidate stage:', error);
      throw new Error(error.response?.data?.message || 'Failed to advance candidate stage');
    }
  },

  // Reject candidate
  rejectCandidate: async (id, reason = '') => {
    try {
      // Update candidate status to rejected and stage to rejected
      const updateData = { 
        status: 'rejected', 
        interviewStage: 'rejected',
        rejectionReason: reason
      };
      return await candidateService.updateCandidate(id, updateData);
    } catch (error) {
      console.error('Error rejecting candidate:', error);
      throw new Error(error.response?.data?.message || 'Failed to reject candidate');
    }
  },

  // Hire candidate
  hireCandidate: async (id, hireData = {}) => {
    try {
      // Update candidate status to hired
      const updateData = { 
        status: 'hired', 
        interviewStage: 'selected',
        hiredDate: new Date(),
        ...hireData
      };
      return await candidateService.updateCandidate(id, updateData);
    } catch (error) {
      console.error('Error hiring candidate:', error);
      throw new Error(error.response?.data?.message || 'Failed to hire candidate');
    }
  },

  // Get candidates by status
  getCandidatesByStatus: async (status) => {
    try {
      const response = await api.get(`/candidates?status=${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidates by status:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch candidates by status');
    }
  },

  // Get candidates by interview stage
  getCandidatesByStage: async (stage) => {
    try {
      const response = await api.get(`/candidates?stage=${stage}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidates by stage:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch candidates by stage');
    }
  },

  // Search candidates
  searchCandidates: async (searchTerm) => {
    try {
      const response = await api.get(`/candidates?search=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching candidates:', error);
      throw new Error(error.response?.data?.message || 'Failed to search candidates');
    }
  }
};

// Utility functions for frontend formatting
export const candidateUtils = {
  // Format interview stage for display
  formatStage: (stage) => {
    const stageMap = {
      'applied': 'Applied',
      'screening': 'Screening',
      'technical': 'Technical',
      'hr_round': 'HR Round',
      'portfolio_review': 'Portfolio Review',
      'final': 'Final',
      'selected': 'Selected',
      'rejected': 'Rejected'
    };
    return stageMap[stage] || stage;
  },

  // Format status for display
  formatStatus: (status) => {
    const statusMap = {
      'active': 'Active',
      'withdrawn': 'Withdrawn',
      'hired': 'Hired',
      'rejected': 'Rejected',
      'on_hold': 'On Hold'
    };
    return statusMap[status] || status;
  },

  // Get color class for stage badge
  getStageColor: (stage) => {
    const colorMap = {
      'applied': 'bg-blue-100 text-blue-800',
      'screening': 'bg-yellow-100 text-yellow-800',
      'technical': 'bg-purple-100 text-purple-800',
      'hr_round': 'bg-indigo-100 text-indigo-800',
      'portfolio_review': 'bg-pink-100 text-pink-800',
      'final': 'bg-orange-100 text-orange-800',
      'selected': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colorMap[stage] || 'bg-gray-100 text-gray-800';
  },

  // Get color class for status badge
  getStatusColor: (status) => {
    const colorMap = {
      'active': 'bg-green-100 text-green-800',
      'withdrawn': 'bg-gray-100 text-gray-800',
      'hired': 'bg-blue-100 text-blue-800',
      'rejected': 'bg-red-100 text-red-800',
      'on_hold': 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  },

  // Validate candidate data
  validateCandidateData: (candidateData) => {
    const errors = {};

    // Personal Info validation
    if (!candidateData.personalInfo?.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!candidateData.personalInfo?.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!candidateData.personalInfo?.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidateData.personalInfo.email)) {
      errors.email = 'Invalid email format';
    }
    if (!candidateData.personalInfo?.phone?.trim()) {
      errors.phone = 'Phone number is required';
    }

    // Application Info validation
    if (!candidateData.applicationInfo?.position?.trim()) {
      errors.position = 'Position is required';
    }
    if (!candidateData.applicationInfo?.appliedDate) {
      errors.appliedDate = 'Applied date is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Transform form data to API format
  transformFormDataToApi: (formData) => {
    return {
      personalInfo: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || {},
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality
      },
      applicationInfo: {
        position: formData.position,
        department: formData.department,
        appliedDate: formData.appliedDate || new Date(),
        source: formData.source,
        referredBy: formData.referredBy,
        expectedSalary: formData.expectedSalary,
        availableStartDate: formData.availableStartDate
      },
      qualifications: {
        education: formData.education || [],
        certifications: formData.certifications || []
      },
      workExperience: formData.workExperience || [],
      skills: {
        technical: formData.technicalSkills || [],
        soft: formData.softSkills || [],
        languages: formData.languages || []
      },
      attachments: {
        resume: formData.resume,
        coverLetter: formData.coverLetter,
        portfolio: formData.portfolio,
        others: formData.otherAttachments || []
      },
      notes: formData.notes ? [{
        content: formData.notes,
        addedAt: new Date()
      }] : [],
      totalExperience: formData.totalExperience || 0,
      interviewStage: formData.interviewStage || 'applied',
      status: formData.status || 'active'
    };
  },

  // Transform API data to form format
  transformApiDataToForm: (apiData) => {
    // Handle null or undefined apiData
    if (!apiData) {
      return {
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
      };
    }
    
    return {
      firstName: apiData.personalInfo?.firstName || '',
      lastName: apiData.personalInfo?.lastName || '',
      email: apiData.personalInfo?.email || '',
      phone: apiData.personalInfo?.phone || '',
      address: apiData.personalInfo?.address || {},
      dateOfBirth: apiData.personalInfo?.dateOfBirth || '',
      nationality: apiData.personalInfo?.nationality || '',
      position: apiData.applicationInfo?.position || '',
      department: typeof apiData.applicationInfo?.department === 'object' 
        ? apiData.applicationInfo.department._id 
        : apiData.applicationInfo?.department || '',
      appliedDate: apiData.applicationInfo?.appliedDate || '',
      source: apiData.applicationInfo?.source || '',
      referredBy: apiData.applicationInfo?.referredBy || '',
      expectedSalary: apiData.applicationInfo?.expectedSalary || '',
      availableStartDate: apiData.applicationInfo?.availableStartDate || '',
      education: apiData.qualifications?.education || [],
      certifications: apiData.qualifications?.certifications || [],
      workExperience: apiData.workExperience || [],
      technicalSkills: apiData.skills?.technical || [],
      softSkills: apiData.skills?.soft || [],
      languages: apiData.skills?.languages || [],
      resume: apiData.attachments?.resume || '',
      coverLetter: apiData.attachments?.coverLetter || '',
      portfolio: apiData.attachments?.portfolio || '',
      otherAttachments: apiData.attachments?.others || [],
      notes: apiData.notes?.[0]?.content || '',
      totalExperience: apiData.totalExperience || 0,
      interviewStage: apiData.interviewStage || 'applied',
      status: apiData.status || 'active'
    };
  }
};

export default candidateService;