import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { filterMenuByRole, PERMISSIONS, USER_ROLES } from "../utils/roleManager";

const Sidebar = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  // Role-based menu structure with required permissions
  const menuSections = [
    {
      title: "Main",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          ),
          path: "/dashboard",
          requiredPermission: null // Dashboard accessible to all authenticated users
        }
      ]
    },
    {
      title: "Employee Management",
      items: [
        {
          id: "employees",
          label: "All Employees",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          ),
          path: "/all-employees",
          requiredPermission: [PERMISSIONS.VIEW_ALL_EMPLOYEES, PERMISSIONS.VIEW_TEAM_EMPLOYEES]
        },
        {
          id: "departments",
          label: "Departments",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0h6" />
            </svg>
          ),
          path: "/all-departments",
          requiredPermission: PERMISSIONS.VIEW_ALL_DEPARTMENTS
        },
        {
          id: "onboarding",
          label: "Onboarding",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          ),
          path: "/onboarding",
          requiredPermission: PERMISSIONS.MANAGE_ONBOARDING
        },
        {
          id: "offboarding",
          label: "Offboarding",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
            </svg>
          ),
          path: "/offboarding",
          requiredPermission: PERMISSIONS.MANAGE_OFFBOARDING
        }
      ]
    },
    {
      title: "Recruitment",
      items: [
        {
          id: "interviews",
          label: "Interview Management",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          ),
          path: "/interview-management",
          requiredPermission: [PERMISSIONS.SCHEDULE_INTERVIEWS, PERMISSIONS.CONDUCT_INTERVIEWS]
        },
        {
          id: "jobs",
          label: "Job Openings",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-4z" />
            </svg>
          ),
          path: "/jobs",
          requiredPermission: PERMISSIONS.POST_JOBS
        },
        {
          id: "candidates",
          label: "Candidates",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          path: "/candidates",
          requiredPermission: [PERMISSIONS.VIEW_CANDIDATES, PERMISSIONS.MANAGE_CANDIDATES]
        }
      ]
    },
    {
      title: "HR Operations",
      items: [
        {
          id: "attendance",
          label: "Attendance",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          path: "/attendance",
          requiredPermission: [PERMISSIONS.VIEW_ALL_EMPLOYEES, PERMISSIONS.VIEW_TEAM_EMPLOYEES]
        },
        {
          id: "leave",
          label: "Leave Management",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          path: "/leave-requests",
          requiredPermission: [PERMISSIONS.APPLY_LEAVE, PERMISSIONS.VIEW_ALL_LEAVES, PERMISSIONS.VIEW_TEAM_LEAVES]
        },
        {
          id: "payroll",
          label: "Payroll",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          path: "/payroll",
          requiredPermission: [PERMISSIONS.VIEW_OWN_PAYROLL, PERMISSIONS.VIEW_ALL_PAYROLL, PERMISSIONS.MANAGE_PAYROLL]
        },
        {
          id: "holidays",
          label: "Holidays",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
          path: "/holidays",
          requiredPermission: null // Public holidays visible to all
        }
      ]
    },
    {
      title: "Performance & Development",
      items: [
        {
          id: "performance",
          label: "Performance",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          path: "/performance-management",
          requiredPermission: [PERMISSIONS.VIEW_OWN_PERFORMANCE, PERMISSIONS.VIEW_ALL_PERFORMANCE, PERMISSIONS.VIEW_TEAM_PERFORMANCE]
        },
        {
          id: "training",
          label: "Training & Learning",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
          path: "/training-development",
          requiredPermission: [PERMISSIONS.VIEW_OWN_TRAINING, PERMISSIONS.VIEW_ALL_TRAINING, PERMISSIONS.MANAGE_TRAINING]
        },
        {
          id: "learning",
          label: "Learning Management",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
          path: "/learning-management",
          requiredPermission: PERMISSIONS.ENROLL_TRAINING
        }
      ]
    },
    {
      title: "Project Management",
      items: [
        {
          id: "timesheet",
          label: "Timesheet",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          path: "/timesheet",
          requiredPermission: [PERMISSIONS.SUBMIT_TIMESHEET, PERMISSIONS.VIEW_ALL_TIMESHEETS, PERMISSIONS.VIEW_TEAM_TIMESHEETS]
        },
        {
          id: "projects",
          label: "Projects",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          path: "/projects",
          requiredPermission: PERMISSIONS.MANAGE_PROJECTS
        }
      ]
    },
    {
      title: "Analytics & Reporting",
      items: [
        {
          id: "analytics",
          label: "Analytics",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          path: "/analytics",
          requiredPermission: [PERMISSIONS.VIEW_HR_ANALYTICS, PERMISSIONS.VIEW_TEAM_ANALYTICS, PERMISSIONS.VIEW_RECRUITMENT_ANALYTICS]
        },
        {
          id: "reports",
          label: "Reports",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          path: "/reports",
          requiredPermission: PERMISSIONS.GENERATE_REPORTS
        },
        {
          id: "insights",
          label: "HR Insights",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          ),
          path: "/hr-insights",
          requiredPermission: PERMISSIONS.VIEW_INSIGHTS
        }
      ]
    },
    {
      title: "Assets & Settings",
      items: [
        {
          id: "assets",
          label: "Asset Management",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          path: "/asset-management",
          requiredPermission: [PERMISSIONS.REQUEST_ASSETS, PERMISSIONS.VIEW_ALL_ASSETS, PERMISSIONS.MANAGE_ASSETS]
        },
        {
          id: "settings",
          label: "Settings",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          path: "/settings",
          requiredPermission: [PERMISSIONS.MANAGE_SETTINGS, PERMISSIONS.MANAGE_HR_SETTINGS]
        }
      ]
    }
  ];

  // Filter menu items based on user role and authentication
  const filteredMenuSections = isAuthenticated && user 
    ? filterMenuByRole(menuSections, user.role)
    : [];

  const isActiveRoute = (path) => {
    // Special handling for employee-related routes
    if (path === "/all-employees") {
      return (
        location.pathname === "/all-employees" ||
        location.pathname === "/add-employee"
      );
    }
    return location.pathname === path;
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 font-['Space_Grotesk'] flex items-center justify-center">
        <div className="text-center p-6">
          <div className="mb-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <path
                d="M44.0103 7.93084C43.0325 6.23757 41.2595 5.29014 39.4354 5.28893L39.4356 5.28845C37.6117 5.287 35.8382 4.33981 34.8607 2.64654C33.4021 0.119888 30.1715 -0.745799 27.645 0.71333L27.6445 0.713571V0.711883C26.0752 1.61615 24.0838 1.68777 22.3978 0.731656C21.6122 0.268911 20.6974 0.00341797 19.7201 0.00341797C17.765 0.00341797 16.0583 1.06563 15.1444 2.64461V2.64437C14.2313 4.2231 12.5241 5.28532 10.5693 5.28532C7.65166 5.28532 5.28692 7.6504 5.28692 10.5679V10.5687L5.28523 10.5679C5.28354 12.3784 4.35062 14.138 2.68226 15.1204C1.88775 15.5689 1.19933 16.2289 0.710083 17.0763C-0.267447 18.7698 -0.201137 20.7789 0.709601 22.3596H0.70936C1.61962 23.9398 1.68617 25.9492 0.708395 27.6425C-0.749943 30.1691 0.115222 33.3996 2.642 34.8588L2.64248 34.859L2.64127 34.8597C4.22017 35.7727 5.2821 37.48 5.2821 39.4353C5.2821 42.3529 7.64683 44.7177 10.5642 44.7177C12.5195 44.7177 14.226 45.7799 15.1399 47.3589C16.0533 48.9372 17.7604 50.0001 19.7153 50.0001C20.6928 50.0001 21.6074 49.7341 22.393 49.2716C24.0785 48.3158 26.0704 48.3874 27.6397 49.2919V49.29L27.6399 49.2907C30.1667 50.7493 33.3971 49.8834 34.8561 47.357C35.8337 45.664 37.6069 44.7165 39.4308 44.7151L39.4303 44.7146C41.2544 44.7131 43.0277 43.7657 44.005 42.0727C44.4863 41.2393 44.7146 40.3288 44.7136 39.431L44.7144 39.4315C44.7161 37.6721 45.5976 35.9596 47.1797 34.9632C48.0323 34.5147 48.7725 33.8277 49.2895 32.9318C50.2675 31.2378 50.201 29.2287 49.2902 27.6483H49.2907C48.3802 26.0681 48.3137 24.0587 49.2912 22.3652C50.7503 19.8383 49.8846 16.608 47.3576 15.1491L47.3574 15.1486L47.3583 15.1481C45.7922 14.2419 44.7349 12.5547 44.718 10.6188C44.7274 9.70562 44.4995 8.77869 44.0103 7.93084Z"
                fill="#5E17EB"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Corvex HR</h2>
          <p className="text-sm text-gray-600 mb-4">Please login to access the system</p>
          <Link 
            to="/login" 
            className="inline-block bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 font-['Space_Grotesk']">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.0103 7.93084C43.0325 6.23757 41.2595 5.29014 39.4354 5.28893L39.4356 5.28845C37.6117 5.287 35.8382 4.33981 34.8607 2.64654C33.4021 0.119888 30.1715 -0.745799 27.645 0.71333L27.6445 0.713571V0.711883C26.0752 1.61615 24.0838 1.68777 22.3978 0.731656C21.6122 0.268911 20.6974 0.00341797 19.7201 0.00341797C17.765 0.00341797 16.0583 1.06563 15.1444 2.64461V2.64437C14.2313 4.2231 12.5241 5.28532 10.5693 5.28532C7.65166 5.28532 5.28692 7.6504 5.28692 10.5679V10.5687L5.28523 10.5679C5.28354 12.3784 4.35062 14.138 2.68226 15.1204C1.88775 15.5689 1.19933 16.2289 0.710083 17.0763C-0.267447 18.7698 -0.201137 20.7789 0.709601 22.3596H0.70936C1.61962 23.9398 1.68617 25.9492 0.708395 27.6425C-0.749943 30.1691 0.115222 33.3996 2.642 34.8588L2.64248 34.859L2.64127 34.8597C4.22017 35.7727 5.2821 37.48 5.2821 39.4353C5.2821 42.3529 7.64683 44.7177 10.5642 44.7177C12.5195 44.7177 14.226 45.7799 15.1399 47.3589C16.0533 48.9372 17.7604 50.0001 19.7153 50.0001C20.6928 50.0001 21.6074 49.7341 22.393 49.2716C24.0785 48.3158 26.0704 48.3874 27.6397 49.2919V49.29L27.6399 49.2907C30.1667 50.7493 33.3971 49.8834 34.8561 47.357C35.8337 45.664 37.6069 44.7165 39.4308 44.7151L39.4303 44.7146C41.2544 44.7131 43.0277 43.7657 44.005 42.0727C44.4863 41.2393 44.7146 40.3288 44.7136 39.431L44.7144 39.4315C44.7161 37.6721 45.5976 35.9596 47.1797 34.9632C48.0323 34.5147 48.7725 33.8277 49.2895 32.9318C50.2675 31.2378 50.201 29.2287 49.2902 27.6483H49.2907C48.3802 26.0681 48.3137 24.0587 49.2912 22.3652C50.7503 19.8383 49.8846 16.608 47.3576 15.1491L47.3574 15.1486L47.3583 15.1481C45.7922 14.2419 44.7349 12.5547 44.718 10.6188C44.7274 9.70562 44.4995 8.77869 44.0103 7.93084Z"
              fill="#5E17EB"
            />
          </svg>
          <h1 className="text-xl font-bold text-black">Corvex</h1>
        </Link>
      </div>

      {/* User Info Section */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src={user?.avatar || '/api/placeholder/32/32'} 
            alt={user?.name} 
            className="w-8 h-8 rounded-full bg-gray-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="pt-4 pb-4 overflow-y-auto h-full">
        <div className="space-y-6">
          {filteredMenuSections.map((section, sectionIndex) => (
            <div key={section.title}>
              {/* Section Title */}
              <div className="px-6 py-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>

              {/* Section Items */}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = isActiveRoute(item.path);

                  return (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-6 py-3 text-sm font-medium transition-colors relative ${
                          isActive
                            ? "text-[#5E17EB] bg-purple-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5E17EB] rounded-r"></div>
                        )}

                        <span
                          className={`mr-3 ${
                            isActive ? "text-[#5E17EB]" : "text-gray-400"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;