import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-['Space_Grotesk']">
      <div className="text-center px-6">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-[#5E17EB] rounded-full mb-6">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <p className="text-gray-500 text-sm">
            The page you requested might have been moved, deleted, or doesn't
            exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/dashboard"
            className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-8 py-3 rounded-xl font-medium transition-colors inline-flex items-center space-x-2"
          >
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
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
              />
            </svg>
            <span>Go to Dashboard</span>
          </Link>

          <Link
            to="/"
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-medium transition-colors inline-flex items-center space-x-2"
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0h3m0 0h3m0 0a1 1 0 001-1V10M9 21v-6a1 1 0 011-1h4a1 1 0 011 1v6"
              />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help?
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
            <Link
              to="/all-employees"
              className="text-[#5E17EB] hover:text-[#4A0EC9] transition-colors flex items-center space-x-1"
            >
              <span>View Employees</span>
            </Link>
            <Link
              to="/all-departments"
              className="text-[#5E17EB] hover:text-[#4A0EC9] transition-colors flex items-center space-x-1"
            >
              <span>View Departments</span>
            </Link>
            <Link
              to="/attendance"
              className="text-[#5E17EB] hover:text-[#4A0EC9] transition-colors flex items-center space-x-1"
            >
              <span>Check Attendance</span>
            </Link>
            <Link
              to="/payroll"
              className="text-[#5E17EB] hover:text-[#4A0EC9] transition-colors flex items-center space-x-1"
            >
              <span>View Payroll</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
