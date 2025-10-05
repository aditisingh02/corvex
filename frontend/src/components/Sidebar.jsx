import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
      path: "/dashboard",
      isActive: true,
    },
    {
      id: "employees",
      label: "All Employees",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      path: "/all-employees",
    },
    {
      id: "departments",
      label: "All Departments",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      path: "/departments",
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      path: "/attendance",
    },
    {
      id: "payroll",
      label: "Payroll",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      path: "/payroll",
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-4z"
          />
        </svg>
      ),
      path: "/jobs",
    },
    {
      id: "candidates",
      label: "Candidates",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      path: "/candidates",
    },
    {
      id: "holidays",
      label: "Holidays",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      path: "/holidays",
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      path: "/settings",
    },
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

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

      {/* Navigation Menu */}
      <nav className="pt-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              item.id === "dashboard" || isActiveRoute(item.path);

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
      </nav>
    </div>
  );
};

export default Sidebar;
