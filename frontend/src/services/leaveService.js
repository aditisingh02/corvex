import { apiClient } from './api.js';

class LeaveService {
  // Submit leave request
  async submitLeaveRequest(leaveData) {
    try {
      return await apiClient.post('/leave', leaveData);
    } catch (error) {
      throw new Error(error.message || 'Failed to submit leave request');
    }
  }

  // Get leave requests
  async getLeaveRequests(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/leave?${queryString}` : '/leave';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch leave requests');
    }
  }

  // Get single leave request
  async getLeaveRequest(id) {
    try {
      return await apiClient.get(`/leave/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch leave request');
    }
  }

  // Update leave request
  async updateLeaveRequest(id, updateData) {
    try {
      return await apiClient.put(`/leave/${id}`, updateData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update leave request');
    }
  }

  // Delete leave request
  async deleteLeaveRequest(id) {
    try {
      return await apiClient.delete(`/leave/${id}`);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete leave request');
    }
  }

  // Get leave balance
  async getLeaveBalance(employeeId = null) {
    try {
      const params = employeeId ? { employeeId } : {};
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/leave/balance?${queryString}` : '/leave/balance';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch leave balance');
    }
  }

  // Get leave statistics
  async getLeaveStats(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/leave/stats/overview?${queryString}` : '/leave/stats/overview';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch leave statistics');
    }
  }

  // Approve leave request (for managers/HR)
  async approveLeaveRequest(id, comments = '') {
    try {
      return await this.updateLeaveRequest(id, {
        status: 'approved',
        approvalComments: comments
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to approve leave request');
    }
  }

  // Reject leave request (for managers/HR)
  async rejectLeaveRequest(id, comments = '') {
    try {
      return await this.updateLeaveRequest(id, {
        status: 'rejected',
        approvalComments: comments
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to reject leave request');
    }
  }

  // Get my leave requests
  async getMyLeaveRequests(status = null) {
    try {
      const params = status ? { status } : {};
      return await this.getLeaveRequests(params);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch your leave requests');
    }
  }

  // Get pending leave requests (for managers/HR)
  async getPendingLeaveRequests() {
    try {
      return await this.getLeaveRequests({ status: 'pending' });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch pending leave requests');
    }
  }

  // Calculate leave days
  calculateLeaveDays(startDate, endDate, isHalfDay = false) {
    if (isHalfDay) return 0.5;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
  }

  // Get leave types
  getLeaveTypes() {
    return [
      { value: 'annual', label: 'Annual Leave' },
      { value: 'sick', label: 'Sick Leave' },
      { value: 'personal', label: 'Personal Leave' },
      { value: 'maternity', label: 'Maternity Leave' },
      { value: 'paternity', label: 'Paternity Leave' },
      { value: 'emergency', label: 'Emergency Leave' }
    ];
  }
}

export const leaveService = new LeaveService();
export default leaveService;