import api from './api';

// Candidate API functions
export const candidateService = {
  // Create a new candidate
  async createCandidate(candidateData) {
    try {
      const response = await api.post('/interviews/candidates', candidateData);
      return response.data;
    } catch (error) {
      console.error('Error creating candidate:', error);
      throw error;
    }
  },

  // Get all candidates with optional filtering
  async getAllCandidates(params = {}) {
    try {
      const response = await api.get('/interviews/candidates', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching candidates:', error);
      throw error;
    }
  },

  // Get candidate by ID
  async getCandidateById(candidateId) {
    try {
      const response = await api.get(`/interviews/candidates/${candidateId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate:', error);
      throw error;
    }
  },

  // Update candidate
  async updateCandidate(candidateId, updateData) {
    try {
      const response = await api.put(`/interviews/candidates/${candidateId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  },

  // Delete candidate
  async deleteCandidate(candidateId) {
    try {
      const response = await api.delete(`/interviews/candidates/${candidateId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  },

  // Advance candidate to next stage
  async advanceStage(candidateId) {
    try {
      const response = await api.put(`/interviews/candidates/${candidateId}/advance-stage`);
      return response.data;
    } catch (error) {
      console.error('Error advancing candidate stage:', error);
      throw error;
    }
  },

  // Reject candidate
  async rejectCandidate(candidateId, reason) {
    try {
      const response = await api.put(`/interviews/candidates/${candidateId}/reject`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error rejecting candidate:', error);
      throw error;
    }
  },

  // Hire candidate
  async hireCandidate(candidateId) {
    try {
      const response = await api.put(`/interviews/candidates/${candidateId}/hire`);
      return response.data;
    } catch (error) {
      console.error('Error hiring candidate:', error);
      throw error;
    }
  }
};

// Interview API functions
export const interviewService = {
  // Schedule a new interview
  async scheduleInterview(interviewData) {
    try {
      const response = await api.post('/interviews/interviews', interviewData);
      return response.data;
    } catch (error) {
      console.error('Error scheduling interview:', error);
      throw error;
    }
  },

  // Get all interviews with optional filtering
  async getAllInterviews(params = {}) {
    try {
      const response = await api.get('/interviews/interviews', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews:', error);
      throw error;
    }
  },

  // Get interview by ID
  async getInterviewById(interviewId) {
    try {
      const response = await api.get(`/interviews/interviews/${interviewId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching interview:', error);
      throw error;
    }
  },

  // Update interview
  async updateInterview(interviewId, updateData) {
    try {
      const response = await api.put(`/interviews/interviews/${interviewId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating interview:', error);
      throw error;
    }
  },

  // Reschedule interview
  async rescheduleInterview(interviewId, rescheduleData) {
    try {
      const response = await api.put(`/interviews/interviews/${interviewId}/reschedule`, rescheduleData);
      return response.data;
    } catch (error) {
      console.error('Error rescheduling interview:', error);
      throw error;
    }
  },

  // Cancel interview
  async cancelInterview(interviewId, reason) {
    try {
      const response = await api.put(`/interviews/interviews/${interviewId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error cancelling interview:', error);
      throw error;
    }
  },

  // Add interview feedback
  async addFeedback(interviewId, feedbackData) {
    try {
      const response = await api.post(`/interviews/interviews/${interviewId}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      console.error('Error adding feedback:', error);
      throw error;
    }
  },

  // Get interview statistics
  async getStatistics(params = {}) {
    try {
      const response = await api.get('/interviews/interviews/statistics', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching interview statistics:', error);
      throw error;
    }
  },

  // Get available interviewers for a specific date/time
  async getAvailableInterviewers(date, time, duration = 60) {
    try {
      const response = await api.get('/interviews/interviews/available-interviewers', {
        params: { date, time, duration }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching available interviewers:', error);
      throw error;
    }
  },

  // Get upcoming interviews
  async getUpcomingInterviews(days = 7) {
    try {
      const response = await api.get('/interviews/interviews', {
        params: { upcoming: true, limit: 50 }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming interviews:', error);
      throw error;
    }
  },

  // Get interviews by status
  async getInterviewsByStatus(status, params = {}) {
    try {
      const response = await api.get('/interviews/interviews', {
        params: { status, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews by status:', error);
      throw error;
    }
  },

  // Get interviews by stage
  async getInterviewsByStage(stage, params = {}) {
    try {
      const response = await api.get('/interviews/interviews', {
        params: { stage, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews by stage:', error);
      throw error;
    }
  },

  // Get interviews for a specific interviewer
  async getInterviewsByInterviewer(interviewerId, params = {}) {
    try {
      const response = await api.get('/interviews/interviews', {
        params: { interviewer: interviewerId, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews by interviewer:', error);
      throw error;
    }
  },

  // Get interviews for a specific candidate
  async getInterviewsByCandidate(candidateId, params = {}) {
    try {
      const response = await api.get('/interviews/interviews', {
        params: { candidate: candidateId, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching interviews by candidate:', error);
      throw error;
    }
  }
};

// Utility functions for interview management
export const interviewUtils = {
  // Format interview date and time for display
  formatInterviewDateTime(date, time) {
    if (!date || !time) return 'TBD';
    
    const interviewDate = new Date(date);
    const [hours, minutes] = time.split(':');
    interviewDate.setHours(parseInt(hours), parseInt(minutes));
    
    return interviewDate.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Calculate interview duration in hours and minutes
  formatDuration(minutes) {
    if (!minutes) return '';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  },

  // Get status color class
  getStatusColor(status) {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rescheduled: 'bg-purple-100 text-purple-800',
      no_show: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  },

  // Get stage color class
  getStageColor(stage) {
    const colors = {
      screening: 'bg-purple-100 text-purple-800',
      technical: 'bg-indigo-100 text-indigo-800',
      hr_round: 'bg-green-100 text-green-800',
      portfolio_review: 'bg-orange-100 text-orange-800',
      final: 'bg-red-100 text-red-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  },

  // Format stage name for display
  formatStageName(stage) {
    const stageNames = {
      screening: 'Screening',
      technical: 'Technical',
      hr_round: 'HR Round',
      portfolio_review: 'Portfolio Review',
      final: 'Final'
    };
    return stageNames[stage] || stage;
  },

  // Format interview type for display
  formatInterviewType(type) {
    const typeNames = {
      in_person: 'In-person',
      video_call: 'Video Call',
      phone_call: 'Phone Call'
    };
    return typeNames[type] || type;
  },

  // Check if interview is upcoming
  isUpcoming(date, time) {
    if (!date || !time) return false;
    
    const [hours, minutes] = time.split(':');
    const interviewDateTime = new Date(date);
    interviewDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    return interviewDateTime > new Date();
  },

  // Check if interview is today
  isToday(date) {
    if (!date) return false;
    
    const today = new Date();
    const interviewDate = new Date(date);
    
    return today.toDateString() === interviewDate.toDateString();
  },

  // Generate time slots for interview scheduling
  generateTimeSlots(startHour = 9, endHour = 17, interval = 30) {
    const slots = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        if (hour === endHour && minute > 0) break;
        
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    
    return slots;
  },

  // Validate interview scheduling data
  validateInterviewData(data) {
    const errors = [];
    
    if (!data.candidate) errors.push('Candidate is required');
    if (!data.interviewer) errors.push('Interviewer is required');
    if (!data.interviewDetails?.type) errors.push('Interview type is required');
    if (!data.interviewDetails?.stage) errors.push('Interview stage is required');
    if (!data.interviewDetails?.position) errors.push('Position is required');
    if (!data.scheduling?.date) errors.push('Interview date is required');
    if (!data.scheduling?.time) errors.push('Interview time is required');
    if (!data.scheduling?.duration) errors.push('Interview duration is required');
    if (!data.scheduling?.location) errors.push('Location/meeting link is required');
    
    // Validate date is not in the past
    if (data.scheduling?.date) {
      const interviewDate = new Date(data.scheduling.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (interviewDate < today) {
        errors.push('Interview date cannot be in the past');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

export default {
  candidateService,
  interviewService,
  interviewUtils
};