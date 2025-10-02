import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white px-4 sm:px-6 lg:px-16">
      <div className="max-w-8xl mx-auto">
        <div className="bg-gray-900 text-white rounded-t-3xl p-8 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Corvex</h3>
                <div className="space-y-4">
                  <div className="inline-flex items-center px-2 bg-[#5E17EB] text-white text-xl font-medium rounded-lg">
                    Contact us:
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-300 text-sm">
                      Email: info@corvex.com
                    </p>
                    <p className="text-gray-300 text-sm">Phone: 0000000000</p>
                    <p className="text-gray-300 text-sm">Address: KJSCE</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">About us</h4>
              <div className="space-y-3">
                <a
                  href="#services"
                  className="block text-gray-300 hover:text-white transition-colors text-sm hover:underline"
                >
                  Services
                </a>
                <a
                  href="#use-cases"
                  className="block text-gray-300 hover:text-white transition-colors text-sm hover:underline"
                >
                  Use Cases
                </a>
                <a
                  href="#blog"
                  className="block text-gray-300 hover:text-white transition-colors text-sm hover:underline"
                >
                  Blog
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Services</h4>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                  Effortless Onboarding
                </p>
                <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                  Payroll & Compliance
                </p>
                <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                  Performance Management
                </p>
                <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                  Employee Hub
                </p>
                <p className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">
                  Analytics & Tracking
                </p>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                  />
                  <button className="w-full bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2025 Corvex. All Rights Reserved.
                </p>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors underline hover:no-underline"
                >
                  MIT License
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-[#5E17EB] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-white text-sm font-bold">in</span>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-[#5E17EB] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-white text-sm font-bold">f</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-[#5E17EB] rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <span className="text-white text-sm font-bold">𝕏</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
