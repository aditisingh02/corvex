import { apiClient } from './api.js';

class AnalyticsService {
  // Get dashboard analytics
  async getDashboardAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/analytics/dashboard?${queryString}` : '/analytics/dashboard';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard analytics');
    }
  }

  // Get employee analytics
  async getEmployeeAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/analytics/employees?${queryString}` : '/analytics/employees';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch employee analytics');
    }
  }

  // Get attendance analytics
  async getAttendanceAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/analytics/attendance?${queryString}` : '/analytics/attendance';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch attendance analytics');
    }
  }

  // Get department analytics
  async getDepartmentAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = queryString ? `/analytics/departments?${queryString}` : '/analytics/departments';
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch department analytics');
    }
  }

  // Export analytics data
  async exportAnalytics(type, format = 'json', params = {}) {
    try {
      const allParams = { type, format, ...params };
      const queryString = new URLSearchParams(allParams).toString();
      const endpoint = `/analytics/export?${queryString}`;
      return await apiClient.get(endpoint);
    } catch (error) {
      throw new Error(error.message || 'Failed to export analytics data');
    }
  }

  // Get period options for analytics
  getPeriodOptions() {
    return [
      { value: 'week', label: 'This Week' },
      { value: 'month', label: 'This Month' },
      { value: 'quarter', label: 'This Quarter' },
      { value: 'year', label: 'This Year' },
      { value: 'custom', label: 'Custom Range' }
    ];
  }

  // Get export type options
  getExportTypeOptions() {
    return [
      { value: 'employees', label: 'Employee Data' },
      { value: 'attendance', label: 'Attendance Records' },
      { value: 'departments', label: 'Department Data' },
      { value: 'leave', label: 'Leave Records' },
      { value: 'payroll', label: 'Payroll Data' },
      { value: 'performance', label: 'Performance Data' },
      { value: 'training', label: 'Training Data' }
    ];
  }

  // Get export format options
  getExportFormatOptions() {
    return [
      { value: 'json', label: 'JSON', icon: '📄' },
      { value: 'csv', label: 'CSV', icon: '📊' },
      { value: 'excel', label: 'Excel', icon: '📈' },
      { value: 'pdf', label: 'PDF', icon: '📑' }
    ];
  }

  // Calculate percentage change
  calculatePercentageChange(current, previous) {
    if (!previous || previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  }

  // Format percentage
  formatPercentage(value, decimals = 1) {
    return `${Number(value).toFixed(decimals)}%`;
  }

  // Format large numbers
  formatNumber(value) {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  }

  // Get color for percentage change
  getChangeColor(percentage) {
    if (percentage > 0) return '#10b981'; // green
    if (percentage < 0) return '#ef4444'; // red
    return '#6b7280'; // gray
  }

  // Get trend icon
  getTrendIcon(percentage) {
    if (percentage > 0) return '↗️';
    if (percentage < 0) return '↘️';
    return '➡️';
  }

  // Process chart data for common chart types
  processChartData(data, type = 'line') {
    switch (type) {
      case 'line':
        return {
          labels: data.map(item => item.label || item.date),
          datasets: [{
            label: 'Value',
            data: data.map(item => item.value || item.count),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }]
        };
      
      case 'bar':
        return {
          labels: data.map(item => item.label || item.name),
          datasets: [{
            label: 'Count',
            data: data.map(item => item.count || item.value),
            backgroundColor: [
              '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
              '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
            ]
          }]
        };
      
      case 'pie':
        return {
          labels: data.map(item => item.label || item.name),
          datasets: [{
            data: data.map(item => item.count || item.value),
            backgroundColor: [
              '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
              '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
            ]
          }]
        };
      
      default:
        return data;
    }
  }

  // Get date range for period
  getDateRangeForPeriod(period) {
    const now = new Date();
    let startDate, endDate = now;

    switch (period) {
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
  }

  // Generate KPI summary
  generateKPISummary(data) {
    return {
      totalEmployees: data.overview?.totalEmployees || 0,
      attendanceRate: data.overview?.attendanceRate || 0,
      leaveRequests: data.overview?.leaveRequests || 0,
      avgWorkingHours: data.overview?.averageWorkingHours || 0,
      departmentCount: data.overview?.totalDepartments || 0,
      pendingLeaves: data.overview?.pendingLeaves || 0
    };
  }

  // Validate date range
  validateDateRange(startDate, endDate) {
    const errors = [];
    
    if (!startDate) {
      errors.push('Start date is required');
    }
    
    if (!endDate) {
      errors.push('End date is required');
    }
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start >= end) {
        errors.push('Start date must be before end date');
      }
      
      if (end > new Date()) {
        errors.push('End date cannot be in the future');
      }
      
      // Check if date range is too large (e.g., more than 2 years)
      const daysDiff = (end - start) / (1000 * 60 * 60 * 24);
      if (daysDiff > 730) {
        errors.push('Date range cannot exceed 2 years');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Get common chart configurations
  getChartConfig(type = 'line') {
    const baseConfig = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      }
    };

    switch (type) {
      case 'line':
        return {
          ...baseConfig,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Value'
              }
            }
          }
        };
      
      case 'bar':
        return {
          ...baseConfig,
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
              beginAtZero: true
            }
          }
        };
      
      case 'pie':
        return {
          ...baseConfig,
          plugins: {
            ...baseConfig.plugins,
            legend: {
              position: 'right',
            }
          }
        };
      
      default:
        return baseConfig;
    }
  }

  // Calculate growth rate
  calculateGrowthRate(current, previous, period = 'month') {
    if (!previous || previous === 0) return null;
    
    const rate = ((current - previous) / previous) * 100;
    return {
      rate: Math.round(rate * 100) / 100,
      isPositive: rate > 0,
      period
    };
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;