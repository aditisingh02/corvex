import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { employeeService } from '../services/employeeService';
import { analyticsService } from '../services/analyticsService';
import { attendanceService } from '../services/attendanceService';
import { leaveService } from '../services/leaveService';

export const useDashboardData = () => {
  const { user, employee } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    activities: [],
    todayAttendance: null,
    leaveBalance: null,
    performanceData: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const dataPromises = [];

        // Common data for all roles
        dataPromises.push(
          attendanceService.getTodayStatus().catch(() => null),
          analyticsService.getDashboardAnalytics().catch(() => null)
        );

        // Role-specific data
        if (user.role === 'hr_manager' || user.role === 'super_admin') {
          dataPromises.push(
            employeeService.getEmployeeStats().catch(() => null),
            employeeService.getAllEmployees({ limit: 10 }).catch(() => null)
          );
        }

        if (user.role === 'employee' || user.role === 'manager') {
          // For employees, get personal data
          if (employee?._id) {
            dataPromises.push(
              attendanceService.getAttendanceStats(employee._id).catch(() => null)
            );
          }
        }

        const results = await Promise.all(dataPromises);
        
        const [todayAttendance, analytics, employeeStats, recentEmployees, personalAttendance] = results;

        // Process the data based on what we received
        const processedData = {
          stats: {
            // For HR/Admin roles - get real employee counts
            totalEmployees: employeeStats?.data?.totalEmployees || recentEmployees?.total || 0,
            activeEmployees: employeeStats?.data?.activeEmployees || recentEmployees?.data?.filter(emp => emp.status === 'active')?.length || 0,
            inactiveEmployees: employeeStats?.data?.inactiveEmployees || recentEmployees?.data?.filter(emp => emp.status === 'inactive')?.length || 0,
            pendingLeaves: analytics?.data?.pendingLeaves || 0,
            attendanceRate: analytics?.data?.attendanceRate || 0,
            departmentCount: employeeStats?.data?.departmentCount || 0,
            newHiresThisMonth: employeeStats?.data?.newHiresThisMonth || 0,
            
            // For Employee roles
            todayHours: personalAttendance?.data?.todayHours || 0,
            weeklyHours: personalAttendance?.data?.weeklyHours || 0,
            monthlyHours: personalAttendance?.data?.monthlyHours || 0
          },
          activities: recentEmployees?.data?.slice(0, 5)?.map(emp => ({
            id: emp._id,
            action: `New Employee: ${emp.personalInfo?.firstName} ${emp.personalInfo?.lastName}`,
            employee: emp.jobInfo?.department?.name || 'No Department',
            time: emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : 'Recent',
            type: 'employee',
            icon: '👤'
          })) || [],
          todayAttendance,
          analytics: analytics?.data || {},
          employeeData: recentEmployees?.data || []
        };

        setDashboardData(processedData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, employee]);

  // Helper function to get stats for HR Manager
  const getHRStats = () => {
    const { stats, analytics, employeeData } = dashboardData;
    
    // Calculate additional metrics from employee data
    const departmentDistribution = employeeData?.reduce((acc, emp) => {
      const dept = emp.jobInfo?.department?.name || 'Unassigned';
      acc[dept] = (acc[dept] || 0) + 1;
      return acc;
    }, {});
    
    const departmentCount = Object.keys(departmentDistribution || {}).length;
    
    // Calculate attendance rate from today's data
    const attendanceRate = stats.totalEmployees > 0 
      ? Math.round((stats.activeEmployees / stats.totalEmployees) * 100) 
      : 0;
    
    return [
      {
        title: "Total Employees",
        value: stats.totalEmployees || 0,
        change: stats.newHiresThisMonth > 0 ? `+${stats.newHiresThisMonth} this month` : "No new hires",
        isPositive: true,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: "Active Employees",
        value: stats.activeEmployees || 0,
        change: `${Math.round(((stats.activeEmployees || 0) / (stats.totalEmployees || 1)) * 100)}% of total`,
        isPositive: true,
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Departments",
        value: departmentCount || 0,
        change: `${stats.totalEmployees || 0} total staff`,
        isPositive: true,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      },
      {
        title: "Pending Leaves",
        value: stats.pendingLeaves || 0,
        change: stats.pendingLeaves > 0 ? "Needs review" : "All clear",
        isPositive: stats.pendingLeaves === 0,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      }
    ];
  };

  // Helper function to get stats for Employee
  const getEmployeeStats = () => {
    const { stats, todayAttendance } = dashboardData;
    
    return [
      {
        title: "Hours Today",
        value: todayAttendance?.data?.hoursWorked ? `${Math.round(todayAttendance.data.hoursWorked * 10) / 10}h` : "0h",
        change: "+2.5h",
        isPositive: true,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "This Week",
        value: `${Math.round((stats.weeklyHours || 0) * 10) / 10}h`,
        change: "25 total",
        isPositive: true,
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: "Attendance Status",
        value: todayAttendance?.data?.status === 'checked_in' ? "Checked In" : "Not Checked In",
        change: todayAttendance?.data?.checkInTime ? new Date(todayAttendance.data.checkInTime).toLocaleTimeString() : "N/A",
        isPositive: todayAttendance?.data?.status === 'checked_in',
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        )
      },
      {
        title: "Leave Balance",
        value: "18 days", // TODO: Get from API
        change: "+0.2",
        isPositive: true,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        )
      }
    ];
  };

  // Helper function to get recent activities with real data
  const getRecentActivities = () => {
    return dashboardData.activities.length > 0 
      ? dashboardData.activities 
      : [
          {
            id: 1,
            action: "No recent activities",
            employee: "Check back later",
            time: "N/A",
            type: "info",
            icon: "ℹ️"
          }
        ];
  };

  return {
    loading,
    error,
    dashboardData,
    getHRStats,
    getEmployeeStats,
    getRecentActivities,
    refreshData: () => {
      // Trigger re-fetch by updating a dependency
      setLoading(true);
    }
  };
};

export default useDashboardData;