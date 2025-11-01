import { apiClient } from './api.js';

class AttendanceService {
  // Clock in
  async clockIn(location = null, method = 'manual') {
    try {
      const data = { location, method };
      return await apiClient.post('/attendance/clock-in', data);
    } catch (error) {
      throw new Error(error.message || 'Failed to clock in');
    }
  }

  // Clock out
  async clockOut(location = null, method = 'manual') {
    try {
      const data = { location, method };
      return await apiClient.post('/attendance/clock-out', data);
    } catch (error) {
      throw new Error(error.message || 'Failed to clock out');
    }
  }

  // Add break
  async addBreak(breakData) {
    try {
      return await apiClient.post('/attendance/break', breakData);
    } catch (error) {
      throw new Error(error.message || 'Failed to add break');
    }
  }

  // Get attendance records
  async getAttendance(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/attendance?${queryString}` : '/attendance';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch attendance records');
    }
  }

  // Get today's attendance status
  async getTodayAttendance() {
    try {
      return await apiClient.get('/attendance/today');
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch today\'s attendance');
    }
  }

  // Get attendance summary
  async getAttendanceSummary(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/attendance/summary?${queryString}` : '/attendance/summary';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch attendance summary');
    }
  }

  // Get user's attendance history for a date range
  async getMyAttendanceHistory(startDate, endDate) {
    try {
      const params = { startDate, endDate };
      return await this.getAttendance(params);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch attendance history');
    }
  }

  // Get attendance statistics
  async getAttendanceStats(employeeId = null, period = 'month') {
    try {
      const params = { period };
      if (employeeId) params.employeeId = employeeId;
      return await this.getAttendanceSummary(params);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch attendance statistics');
    }
  }
}

export const attendanceService = new AttendanceService();
export default attendanceService;