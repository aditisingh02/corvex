import { apiClient } from './api.js';

class TrainingService {
  // Create training program
  async createTrainingProgram(programData) {
    try {
      return await apiClient.post('/training/programs', programData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create training program');
    }
  }

  // Get training programs
  async getTrainingPrograms(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/training/programs?${queryString}` : '/training/programs';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch training programs');
    }
  }

  // Enroll in training program
  async enrollInProgram(programId, employeeId = null) {
    try {
      const data = employeeId ? { employeeId } : {};
      return await apiClient.post(`/training/enroll/${programId}`, data);
    } catch (error) {
      throw new Error(error.message || 'Failed to enroll in training program');
    }
  }

  // Update training progress
  async updateTrainingProgress(enrollmentId, progressData) {
    try {
      return await apiClient.put(`/training/progress/${enrollmentId}`, progressData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update training progress');
    }
  }

  // Get training history
  async getTrainingHistory(employeeId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/training/history/${employeeId}?${queryString}` : `/training/history/${employeeId}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch training history');
    }
  }

  // Create training assessment
  async createTrainingAssessment(assessmentData) {
    try {
      return await apiClient.post('/training/assessments', assessmentData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create training assessment');
    }
  }

  // Submit assessment attempt
  async submitAssessment(assessmentId, submissionData) {
    try {
      return await apiClient.post(`/training/assessments/${assessmentId}/submit`, submissionData);
    } catch (error) {
      throw new Error(error.message || 'Failed to submit assessment');
    }
  }

  // Get training analytics
  async getTrainingAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/training/analytics?${queryString}` : '/training/analytics';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch training analytics');
    }
  }

  // Issue certificate
  async issueCertificate(certificateData) {
    try {
      return await apiClient.post('/training/certificates', certificateData);
    } catch (error) {
      throw new Error(error.message || 'Failed to issue certificate');
    }
  }

  // Get my training history
  async getMyTrainingHistory() {
    try {
      // This would require getting current user's employee ID
      // For now, we'll assume the backend handles this
      return await apiClient.get('/training/history/me');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch your training history');
    }
  }

  // Get available training programs for enrollment
  async getAvailablePrograms() {
    try {
      return await this.getTrainingPrograms({ status: 'active' });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch available training programs');
    }
  }

  // Get my enrollments
  async getMyEnrollments() {
    try {
      return await apiClient.get('/training/enrollments/me');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch your enrollments');
    }
  }

  // Calculate completion percentage
  calculateCompletionPercentage(completedMaterials, totalMaterials) {
    if (!totalMaterials || totalMaterials === 0) return 0;
    return Math.round((completedMaterials / totalMaterials) * 100);
  }

  // Get training categories
  getTrainingCategories() {
    return [
      { value: 'technical', label: 'Technical Skills' },
      { value: 'soft-skills', label: 'Soft Skills' },
      { value: 'leadership', label: 'Leadership' },
      { value: 'compliance', label: 'Compliance' },
      { value: 'safety', label: 'Safety' },
      { value: 'communication', label: 'Communication' },
      { value: 'project-management', label: 'Project Management' },
      { value: 'sales', label: 'Sales' },
      { value: 'customer-service', label: 'Customer Service' },
      { value: 'orientation', label: 'Orientation' }
    ];
  }

  // Get training material types
  getMaterialTypes() {
    return [
      { value: 'document', label: 'Document', icon: '📄' },
      { value: 'video', label: 'Video', icon: '🎥' },
      { value: 'quiz', label: 'Quiz', icon: '❓' },
      { value: 'presentation', label: 'Presentation', icon: '📊' },
      { value: 'interactive', label: 'Interactive', icon: '🎮' },
      { value: 'webinar', label: 'Webinar', icon: '💻' },
      { value: 'handbook', label: 'Handbook', icon: '📚' },
      { value: 'assessment', label: 'Assessment', icon: '📝' }
    ];
  }

  // Get enrollment status options
  getEnrollmentStatusOptions() {
    return [
      { value: 'enrolled', label: 'Enrolled', color: '#3b82f6' },
      { value: 'in_progress', label: 'In Progress', color: '#f59e0b' },
      { value: 'completed', label: 'Completed', color: '#10b981' },
      { value: 'dropped', label: 'Dropped', color: '#ef4444' },
      { value: 'suspended', label: 'Suspended', color: '#6b7280' }
    ];
  }

  // Get question types for assessments
  getQuestionTypes() {
    return [
      { value: 'multiple_choice', label: 'Multiple Choice' },
      { value: 'true_false', label: 'True/False' },
      { value: 'short_answer', label: 'Short Answer' },
      { value: 'essay', label: 'Essay' },
      { value: 'fill_blank', label: 'Fill in the Blank' }
    ];
  }

  // Validate program data
  validateProgramData(data) {
    const errors = [];
    
    if (!data.title || data.title.trim() === '') {
      errors.push('Program title is required');
    }
    
    if (!data.description || data.description.trim() === '') {
      errors.push('Program description is required');
    }
    
    if (!data.category) {
      errors.push('Program category is required');
    }
    
    if (!data.duration || data.duration <= 0) {
      errors.push('Valid duration is required');
    }
    
    if (!data.startDate || !data.endDate) {
      errors.push('Start and end dates are required');
    }
    
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (start >= end) {
        errors.push('Start date must be before end date');
      }
    }
    
    if (!data.instructor || !data.instructor.name) {
      errors.push('Instructor information is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate assessment data
  validateAssessmentData(data) {
    const errors = [];
    
    if (!data.title || data.title.trim() === '') {
      errors.push('Assessment title is required');
    }
    
    if (!data.programId) {
      errors.push('Program is required');
    }
    
    if (!data.questions || data.questions.length === 0) {
      errors.push('At least one question is required');
    }
    
    if (data.questions) {
      data.questions.forEach((question, index) => {
        if (!question.question || question.question.trim() === '') {
          errors.push(`Question ${index + 1}: Question text is required`);
        }
        
        if (!question.type) {
          errors.push(`Question ${index + 1}: Question type is required`);
        }
        
        if (question.type === 'multiple_choice' && (!question.options || question.options.length < 2)) {
          errors.push(`Question ${index + 1}: Multiple choice questions need at least 2 options`);
        }
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Format duration for display
  formatDuration(hours) {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      let result = `${days} day${days !== 1 ? 's' : ''}`;
      if (remainingHours > 0) {
        result += ` ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`;
      }
      return result;
    }
  }

  // Calculate assessment score
  calculateAssessmentScore(answers, correctAnswers) {
    if (!answers || !correctAnswers || correctAnswers.length === 0) return 0;
    
    let correct = 0;
    correctAnswers.forEach((correctAnswer, index) => {
      if (answers[index] === correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / correctAnswers.length) * 100);
  }
}

export const trainingService = new TrainingService();
export default trainingService;