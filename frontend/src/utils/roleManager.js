// Role-Based Access Control (RBAC) System for HR Management

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  HR_MANAGER: 'hr_manager',
  HR_COORDINATOR: 'hr_coordinator',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  RECRUITER: 'recruiter'
};

export const PERMISSIONS = {
  // Employee Management
  VIEW_ALL_EMPLOYEES: 'view_all_employees',
  ADD_EMPLOYEE: 'add_employee',
  EDIT_EMPLOYEE: 'edit_employee',
  DELETE_EMPLOYEE: 'delete_employee',
  VIEW_EMPLOYEE_DETAILS: 'view_employee_details',
  VIEW_TEAM_EMPLOYEES: 'view_team_employees',
  
  // Department Management
  VIEW_ALL_DEPARTMENTS: 'view_all_departments',
  MANAGE_DEPARTMENTS: 'manage_departments',
  VIEW_DEPARTMENT_ANALYTICS: 'view_department_analytics',
  
  // Recruitment
  VIEW_CANDIDATES: 'view_candidates',
  MANAGE_CANDIDATES: 'manage_candidates',
  SCHEDULE_INTERVIEWS: 'schedule_interviews',
  CONDUCT_INTERVIEWS: 'conduct_interviews',
  POST_JOBS: 'post_jobs',
  VIEW_RECRUITMENT_ANALYTICS: 'view_recruitment_analytics',
  
  // Payroll
  VIEW_ALL_PAYROLL: 'view_all_payroll',
  MANAGE_PAYROLL: 'manage_payroll',
  PROCESS_PAYROLL: 'process_payroll',
  VIEW_OWN_PAYROLL: 'view_own_payroll',
  
  // Leave Management
  VIEW_ALL_LEAVES: 'view_all_leaves',
  APPROVE_LEAVES: 'approve_leaves',
  APPLY_LEAVE: 'apply_leave',
  VIEW_OWN_LEAVES: 'view_own_leaves',
  VIEW_TEAM_LEAVES: 'view_team_leaves',
  
  // Performance
  VIEW_ALL_PERFORMANCE: 'view_all_performance',
  CONDUCT_REVIEWS: 'conduct_reviews',
  VIEW_OWN_PERFORMANCE: 'view_own_performance',
  VIEW_TEAM_PERFORMANCE: 'view_team_performance',
  SET_GOALS: 'set_goals',
  
  // Analytics & Reports
  VIEW_HR_ANALYTICS: 'view_hr_analytics',
  GENERATE_REPORTS: 'generate_reports',
  VIEW_INSIGHTS: 'view_insights',
  VIEW_TEAM_ANALYTICS: 'view_team_analytics',
  
  // Asset Management
  VIEW_ALL_ASSETS: 'view_all_assets',
  MANAGE_ASSETS: 'manage_assets',
  REQUEST_ASSETS: 'request_assets',
  VIEW_OWN_ASSETS: 'view_own_assets',
  ASSIGN_ASSETS: 'assign_assets',
  
  // Training & Learning
  VIEW_ALL_TRAINING: 'view_all_training',
  MANAGE_TRAINING: 'manage_training',
  ENROLL_TRAINING: 'enroll_training',
  VIEW_OWN_TRAINING: 'view_own_training',
  
  // Time & Project Management
  VIEW_ALL_TIMESHEETS: 'view_all_timesheets',
  MANAGE_PROJECTS: 'manage_projects',
  SUBMIT_TIMESHEET: 'submit_timesheet',
  VIEW_OWN_TIMESHEET: 'view_own_timesheet',
  VIEW_TEAM_TIMESHEETS: 'view_team_timesheets',
  
  // System Settings
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_HR_SETTINGS: 'manage_hr_settings',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  
  // Onboarding/Offboarding
  MANAGE_ONBOARDING: 'manage_onboarding',
  MANAGE_OFFBOARDING: 'manage_offboarding'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: [
    // Full access to everything
    ...Object.values(PERMISSIONS)
  ],
  
  [USER_ROLES.HR_MANAGER]: [
    // Employee Management
    PERMISSIONS.VIEW_ALL_EMPLOYEES,
    PERMISSIONS.ADD_EMPLOYEE,
    PERMISSIONS.EDIT_EMPLOYEE,
    PERMISSIONS.DELETE_EMPLOYEE,
    PERMISSIONS.VIEW_EMPLOYEE_DETAILS,
    
    // Department Management
    PERMISSIONS.VIEW_ALL_DEPARTMENTS,
    PERMISSIONS.MANAGE_DEPARTMENTS,
    PERMISSIONS.VIEW_DEPARTMENT_ANALYTICS,
    
    // Recruitment
    PERMISSIONS.VIEW_CANDIDATES,
    PERMISSIONS.MANAGE_CANDIDATES,
    PERMISSIONS.SCHEDULE_INTERVIEWS,
    PERMISSIONS.CONDUCT_INTERVIEWS,
    PERMISSIONS.POST_JOBS,
    PERMISSIONS.VIEW_RECRUITMENT_ANALYTICS,
    
    // Payroll
    PERMISSIONS.VIEW_ALL_PAYROLL,
    PERMISSIONS.MANAGE_PAYROLL,
    PERMISSIONS.PROCESS_PAYROLL,
    PERMISSIONS.VIEW_OWN_PAYROLL,
    
    // Leave Management
    PERMISSIONS.VIEW_ALL_LEAVES,
    PERMISSIONS.APPROVE_LEAVES,
    PERMISSIONS.APPLY_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
    
    // Performance
    PERMISSIONS.VIEW_ALL_PERFORMANCE,
    PERMISSIONS.CONDUCT_REVIEWS,
    PERMISSIONS.VIEW_OWN_PERFORMANCE,
    PERMISSIONS.SET_GOALS,
    
    // Analytics & Reports
    PERMISSIONS.VIEW_HR_ANALYTICS,
    PERMISSIONS.GENERATE_REPORTS,
    PERMISSIONS.VIEW_INSIGHTS,
    
    // Asset Management
    PERMISSIONS.VIEW_ALL_ASSETS,
    PERMISSIONS.MANAGE_ASSETS,
    PERMISSIONS.REQUEST_ASSETS,
    PERMISSIONS.VIEW_OWN_ASSETS,
    PERMISSIONS.ASSIGN_ASSETS,
    
    // Training
    PERMISSIONS.VIEW_ALL_TRAINING,
    PERMISSIONS.MANAGE_TRAINING,
    PERMISSIONS.ENROLL_TRAINING,
    PERMISSIONS.VIEW_OWN_TRAINING,
    
    // Time & Project Management
    PERMISSIONS.VIEW_ALL_TIMESHEETS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.SUBMIT_TIMESHEET,
    PERMISSIONS.VIEW_OWN_TIMESHEET,
    
    // System Settings
    PERMISSIONS.MANAGE_HR_SETTINGS,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    
    // Onboarding/Offboarding
    PERMISSIONS.MANAGE_ONBOARDING,
    PERMISSIONS.MANAGE_OFFBOARDING
  ],
  
  [USER_ROLES.HR_COORDINATOR]: [
    // Employee Management
    PERMISSIONS.VIEW_ALL_EMPLOYEES,
    PERMISSIONS.ADD_EMPLOYEE,
    PERMISSIONS.EDIT_EMPLOYEE,
    PERMISSIONS.VIEW_EMPLOYEE_DETAILS,
    
    // Department Management
    PERMISSIONS.VIEW_ALL_DEPARTMENTS,
    
    // Payroll
    PERMISSIONS.PROCESS_PAYROLL,
    PERMISSIONS.VIEW_OWN_PAYROLL,
    
    // Leave Management
    PERMISSIONS.VIEW_ALL_LEAVES,
    PERMISSIONS.APPLY_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
    
    // Performance
    PERMISSIONS.VIEW_OWN_PERFORMANCE,
    
    // Asset Management
    PERMISSIONS.ASSIGN_ASSETS,
    PERMISSIONS.REQUEST_ASSETS,
    PERMISSIONS.VIEW_OWN_ASSETS,
    
    // Training
    PERMISSIONS.ENROLL_TRAINING,
    PERMISSIONS.VIEW_OWN_TRAINING,
    
    // Time & Project Management
    PERMISSIONS.SUBMIT_TIMESHEET,
    PERMISSIONS.VIEW_OWN_TIMESHEET,
    
    // Onboarding/Offboarding
    PERMISSIONS.MANAGE_ONBOARDING,
    PERMISSIONS.MANAGE_OFFBOARDING
  ],
  
  [USER_ROLES.MANAGER]: [
    // Employee Management (Team only)
    PERMISSIONS.VIEW_TEAM_EMPLOYEES,
    PERMISSIONS.VIEW_EMPLOYEE_DETAILS,
    
    // Leave Management (Team)
    PERMISSIONS.VIEW_TEAM_LEAVES,
    PERMISSIONS.APPROVE_LEAVES,
    PERMISSIONS.APPLY_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
    
    // Performance (Team)
    PERMISSIONS.VIEW_TEAM_PERFORMANCE,
    PERMISSIONS.CONDUCT_REVIEWS,
    PERMISSIONS.VIEW_OWN_PERFORMANCE,
    PERMISSIONS.SET_GOALS,
    
    // Analytics (Team only)
    PERMISSIONS.VIEW_TEAM_ANALYTICS,
    
    // Asset Management
    PERMISSIONS.REQUEST_ASSETS,
    PERMISSIONS.VIEW_OWN_ASSETS,
    
    // Training
    PERMISSIONS.ENROLL_TRAINING,
    PERMISSIONS.VIEW_OWN_TRAINING,
    
    // Time & Project Management
    PERMISSIONS.VIEW_TEAM_TIMESHEETS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.SUBMIT_TIMESHEET,
    PERMISSIONS.VIEW_OWN_TIMESHEET,
    
    // Own data
    PERMISSIONS.VIEW_OWN_PAYROLL
  ],
  
  [USER_ROLES.EMPLOYEE]: [
    // Asset Management
    PERMISSIONS.REQUEST_ASSETS,
    PERMISSIONS.VIEW_OWN_ASSETS,
    
    // Training
    PERMISSIONS.ENROLL_TRAINING,
    PERMISSIONS.VIEW_OWN_TRAINING,
    
    // Time & Project Management
    PERMISSIONS.SUBMIT_TIMESHEET,
    PERMISSIONS.VIEW_OWN_TIMESHEET,
    
    // Own access only
    PERMISSIONS.APPLY_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
    PERMISSIONS.VIEW_OWN_PERFORMANCE,
    PERMISSIONS.VIEW_OWN_PAYROLL
  ],
  
  [USER_ROLES.RECRUITER]: [
    // Recruitment (Full access)
    PERMISSIONS.VIEW_CANDIDATES,
    PERMISSIONS.MANAGE_CANDIDATES,
    PERMISSIONS.SCHEDULE_INTERVIEWS,
    PERMISSIONS.CONDUCT_INTERVIEWS,
    PERMISSIONS.POST_JOBS,
    PERMISSIONS.VIEW_RECRUITMENT_ANALYTICS,
    
    // Own access
    PERMISSIONS.APPLY_LEAVE,
    PERMISSIONS.VIEW_OWN_LEAVES,
    PERMISSIONS.VIEW_OWN_PERFORMANCE,
    PERMISSIONS.VIEW_OWN_PAYROLL,
    PERMISSIONS.SUBMIT_TIMESHEET,
    PERMISSIONS.VIEW_OWN_TIMESHEET,
    PERMISSIONS.ENROLL_TRAINING,
    PERMISSIONS.VIEW_OWN_TRAINING
  ]
};

export const ROLE_DESCRIPTIONS = {
  [USER_ROLES.SUPER_ADMIN]: 'System Administrator with full access',
  [USER_ROLES.HR_MANAGER]: 'HR Manager with comprehensive HR access',
  [USER_ROLES.HR_COORDINATOR]: 'HR Coordinator handling daily operations',
  [USER_ROLES.MANAGER]: 'Team Manager with team-specific access',
  [USER_ROLES.EMPLOYEE]: 'Employee with self-service access',
  [USER_ROLES.RECRUITER]: 'Recruiter with recruitment-focused access'
};

// Utility functions
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

export const filterMenuByRole = (menuSections, userRole) => {
  if (!userRole || !menuSections) return [];
  
  return menuSections.map(section => ({
    ...section,
    items: section.items.filter(item => {
      // If no permission required, show to all authenticated users
      if (!item.requiredPermission) return true;
      
      // If single permission, check it
      if (typeof item.requiredPermission === 'string') {
        return hasPermission(userRole, item.requiredPermission);
      }
      
      // If array of permissions, user needs at least one
      if (Array.isArray(item.requiredPermission)) {
        return hasAnyPermission(userRole, item.requiredPermission);
      }
      
      return false;
    })
  })).filter(section => section.items.length > 0);
};

export const getUserRoleLevel = (role) => {
  const roleLevels = {
    [USER_ROLES.SUPER_ADMIN]: 6,
    [USER_ROLES.HR_MANAGER]: 5,
    [USER_ROLES.HR_COORDINATOR]: 4,
    [USER_ROLES.MANAGER]: 3,
    [USER_ROLES.RECRUITER]: 2,
    [USER_ROLES.EMPLOYEE]: 1
  };
  return roleLevels[role] || 0;
};

export const canAccessRoute = (userRole, requiredPermissions) => {
  if (!requiredPermissions) return true;
  
  if (typeof requiredPermissions === 'string') {
    return hasPermission(userRole, requiredPermissions);
  }
  
  if (Array.isArray(requiredPermissions)) {
    return hasAnyPermission(userRole, requiredPermissions);
  }
  
  return false;
};

export default {
  USER_ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  ROLE_DESCRIPTIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  filterMenuByRole,
  getUserRoleLevel,
  canAccessRoute
};