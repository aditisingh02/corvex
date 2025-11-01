import { apiClient } from './api.js';

class PerformanceService {
  // Create performance review
  async createPerformanceReview(reviewData) {
    try {
      return await apiClient.post('/performance/reviews', reviewData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create performance review');
    }
  }

  // Get performance reviews
  async getPerformanceReviews(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/performance/reviews?${queryString}` : '/performance/reviews';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch performance reviews');
    }
  }

  // Update performance review
  async updatePerformanceReview(id, updateData) {
    try {
      return await apiClient.put(`/performance/reviews/${id}`, updateData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update performance review');
    }
  }

  // Set performance goals
  async setPerformanceGoals(goalsData) {
    try {
      return await apiClient.post('/performance/goals', goalsData);
    } catch (error) {
      throw new Error(error.message || 'Failed to set performance goals');
    }
  }

  // Update goal progress
  async updateGoalProgress(goalId, progressData) {
    try {
      return await apiClient.put(`/performance/goals/${goalId}`, progressData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update goal progress');
    }
  }

  // Get performance analytics
  async getPerformanceAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/performance/analytics?${queryString}` : '/performance/analytics';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch performance analytics');
    }
  }

  // Get employee performance dashboard
  async getEmployeePerformanceDashboard(employeeId) {
    try {
      return await apiClient.get(`/performance/dashboard/${employeeId}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch performance dashboard');
    }
  }

  // Submit self-assessment
  async submitSelfAssessment(assessmentData) {
    try {
      return await apiClient.post('/performance/self-assessment', assessmentData);
    } catch (error) {
      throw new Error(error.message || 'Failed to submit self-assessment');
    }
  }

  // Get my performance dashboard
  async getMyPerformanceDashboard() {
    try {
      return await apiClient.get('/performance/dashboard/me');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch your performance dashboard');
    }
  }

  // Get my performance reviews
  async getMyPerformanceReviews() {
    try {
      return await this.getPerformanceReviews();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch your performance reviews');
    }
  }

  // Calculate goal completion rate
  calculateGoalCompletionRate(goals) {
    if (!goals || goals.length === 0) return 0;
    
    const completedGoals = goals.filter(goal => goal.status === 'completed').length;
    return Math.round((completedGoals / goals.length) * 100);
  }

  // Get goal status options
  getGoalStatusOptions() {
    return [
      { value: 'not_started', label: 'Not Started', color: '#6b7280' },
      { value: 'in_progress', label: 'In Progress', color: '#3b82f6' },
      { value: 'completed', label: 'Completed', color: '#10b981' },
      { value: 'on_hold', label: 'On Hold', color: '#f59e0b' },
      { value: 'cancelled', label: 'Cancelled', color: '#ef4444' }
    ];
  }

  // Get goal priority options
  getGoalPriorityOptions() {
    return [
      { value: 'low', label: 'Low', color: '#10b981' },
      { value: 'medium', label: 'Medium', color: '#f59e0b' },
      { value: 'high', label: 'High', color: '#ef4444' }
    ];
  }

  // Get goal category options
  getGoalCategoryOptions() {
    return [
      { value: 'performance', label: 'Performance' },
      { value: 'learning', label: 'Learning & Development' },
      { value: 'project', label: 'Project Goals' },
      { value: 'leadership', label: 'Leadership' },
      { value: 'innovation', label: 'Innovation' },
      { value: 'collaboration', label: 'Collaboration' }
    ];
  }

  // Get review type options
  getReviewTypeOptions() {
    return [
      { value: 'annual', label: 'Annual Review' },
      { value: 'quarterly', label: 'Quarterly Review' },
      { value: 'monthly', label: 'Monthly Check-in' },
      { value: 'probation', label: 'Probation Review' },
      { value: 'project', label: 'Project Review' }
    ];
  }

  // Get rating scale
  getRatingScale() {
    return [
      { value: 1, label: 'Needs Improvement', description: 'Below expectations' },
      { value: 2, label: 'Developing', description: 'Partially meets expectations' },
      { value: 3, label: 'Meets Expectations', description: 'Satisfactory performance' },
      { value: 4, label: 'Exceeds Expectations', description: 'Above average performance' },
      { value: 5, label: 'Outstanding', description: 'Exceptional performance' }
    ];
  }

  // Format rating display
  formatRating(rating) {
    const scale = this.getRatingScale();
    const ratingInfo = scale.find(r => r.value === rating);
    return ratingInfo ? ratingInfo.label : 'Not Rated';
  }

  // Calculate overall rating from competencies
  calculateOverallRating(competencies) {
    if (!competencies || competencies.length === 0) return null;
    
    const totalRating = competencies.reduce((sum, comp) => sum + (comp.rating || 0), 0);
    return Math.round((totalRating / competencies.length) * 10) / 10;
  }

  // Get current quarter
  getCurrentQuarter() {
    const month = new Date().getMonth();
    return Math.floor(month / 3) + 1;
  }

  // Get current year
  getCurrentYear() {
    return new Date().getFullYear();
  }

  // Validate review data
  validateReviewData(data) {
    const errors = [];
    
    if (!data.employeeId) {
      errors.push('Employee is required');
    }
    
    if (!data.reviewType) {
      errors.push('Review type is required');
    }
    
    if (!data.reviewPeriodStart || !data.reviewPeriodEnd) {
      errors.push('Review period dates are required');
    }
    
    if (data.reviewPeriodStart && data.reviewPeriodEnd) {
      const start = new Date(data.reviewPeriodStart);
      const end = new Date(data.reviewPeriodEnd);
      if (start >= end) {
        errors.push('Review period start date must be before end date');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate goal data
  validateGoalData(data) {
    const errors = [];
    
    if (!data.title || data.title.trim() === '') {
      errors.push('Goal title is required');
    }
    
    if (!data.description || data.description.trim() === '') {
      errors.push('Goal description is required');
    }
    
    if (!data.targetDate) {
      errors.push('Target date is required');
    }
    
    if (data.targetDate && new Date(data.targetDate) <= new Date()) {
      errors.push('Target date must be in the future');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const performanceService = new PerformanceService();
export default performanceService;