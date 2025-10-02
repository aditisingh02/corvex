import { Button } from "./ui/button";
import { useState } from "react";
import heroIllustration from "../assets/hero-illustration.svg";
import servicesIllus1 from "../assets/services-illus-1.svg";
import servicesIllus2 from "../assets/services-illus-2.svg";
import servicesIllus3 from "../assets/services-illus-3.svg";
import servicesIllus4 from "../assets/services-illus-4.svg";
import servicesIllus5 from "../assets/services-illus-5.svg";
import servicesIllus6 from "../assets/services-illus-6.svg";
import ctaIllustration from "../assets/cta-illustration.svg";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk']">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex justify-between items-center py-4">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="text-2xl font-bold text-[#5E17EB]">Corvex</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#about"
                className="text-sm font-medium text-gray-600 hover:text-[#5E17EB] transition-colors"
              >
                About us
              </a>
              <a
                href="#services"
                className="text-sm font-medium text-gray-600 hover:text-[#5E17EB] transition-colors"
              >
                Services
              </a>
              <a
                href="#use-cases"
                className="text-sm font-medium text-gray-600 hover:text-[#5E17EB] transition-colors"
              >
                Use Cases
              </a>
              <a
                href="#blog"
                className="text-sm font-medium text-gray-600 hover:text-[#5E17EB] transition-colors"
              >
                Blog
              </a>
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Button
                variant="outline"
                className="mr-3 px-6 py-2 rounded-full border-[#5E17EB] text-[#5E17EB] hover:bg-[#5E17EB] hover:text-white transition-colors"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            <div className="py-12 md:py-16 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                      Manage Your <span className="block">People,</span>
                      <span className="block">
                        Not <span className="text-[#5E17EB]">Paperwork.</span>
                      </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                      Corvex is the all-in-one HR management platform that
                      streamlines employee onboarding, payroll, performance, and
                      compliance so your team can focus on what really matters:{" "}
                      <span className="font-semibold text-[#5E17EB]">
                        people.
                      </span>
                    </p>
                  </div>
                  <div>
                    <Button
                      size="lg"
                      className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-8 py-3 rounded-lg font-medium transition-colors"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>

                {/* Right Column - Illustration */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-md lg:max-w-lg">
                    <img
                      src={heroIllustration}
                      alt="HR Management Illustration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div
          id="services"
          className="min-h-screen bg-gray-50 flex items-center py-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Our Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive HR solutions designed to streamline your workforce
                management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Effortless Onboarding */}
              <div className="bg-[#F3F3F3] rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start mb-12">
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Effortless
                    </div>
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Onboarding
                    </div>
                  </div>
                  <button className="flex items-center text-[#5E17EB] font-medium hover:text-[#4A0EC9] transition-colors">
                    <span className="mr-2">→</span>
                    Learn more
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={servicesIllus1}
                    alt="Effortless Onboarding"
                    className="w-40 h-36 object-contain"
                  />
                </div>
              </div>

              {/* Simplified Payroll & Compliance */}
              <div className="bg-[#5E17EB] text-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start mb-12">
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Simplified Payroll
                    </div>
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      & Compliance
                    </div>
                  </div>
                  <button className="flex items-center text-white font-medium hover:text-gray-200 transition-colors">
                    <span className="mr-2">→</span>
                    Learn more
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={servicesIllus2}
                    alt="Simplified Payroll & Compliance"
                    className="w-40 h-36 object-contain"
                  />
                </div>
              </div>

              {/* Smarter Performance Management */}
              <div className="bg-gray-900 text-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start mb-12">
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Smarter Performance
                    </div>
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Management
                    </div>
                  </div>
                  <button className="flex items-center text-white font-medium hover:text-gray-200 transition-colors">
                    <span className="mr-2">→</span>
                    Learn more
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={servicesIllus3}
                    alt="Smarter Performance Management"
                    className="w-40 h-36 object-contain"
                  />
                </div>
              </div>

              {/* Centralized Employee Hub */}
              <div className="bg-[#F3F3F3] rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start mb-12">
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Centralized
                    </div>
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Employee Hub
                    </div>
                  </div>
                  <button className="flex items-center text-[#5E17EB] font-medium hover:text-[#4A0EC9] transition-colors">
                    <span className="mr-2">→</span>
                    Learn more
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={servicesIllus4}
                    alt="Centralized Employee Hub"
                    className="w-40 h-36 object-contain"
                  />
                </div>
              </div>

              {/* Secure & Scalable */}
              <div className="bg-[#5E17EB] text-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start mb-12">
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Secure &
                    </div>
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Scalable
                    </div>
                  </div>
                  <button className="flex items-center text-white font-medium hover:text-gray-200 transition-colors">
                    <span className="mr-2">→</span>
                    Learn more
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={servicesIllus5}
                    alt="Secure & Scalable"
                    className="w-40 h-36 object-contain"
                  />
                </div>
              </div>

              {/* Analytics and Tracking */}
              <div className="bg-gray-900 text-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start mb-12">
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Analytics and
                    </div>
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Tracking
                    </div>
                  </div>
                  <button className="flex items-center text-white font-medium hover:text-gray-200 transition-colors">
                    <span className="mr-2">→</span>
                    Learn more
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={servicesIllus6}
                    alt="Analytics and Tracking"
                    className="w-40 h-36 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Let's make things happen Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-100 rounded-2xl p-8 lg:p-12">
              <div className="lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-1/2 lg:pr-8">
                  <h2 className="text-3xl font-bold text-black mb-6">
                    Let's make things happen
                  </h2>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt eveniet quidem deserunt placeat! Nam dolorem autem
                    soluta aspernatur commodi sint, cum officiis facere
                    voluptatibus vitae officia esse, illo tempore veritatis.
                  </p>
                  <button className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    Get your free proposal
                  </button>
                </div>
                <div className="lg:w-1/2 lg:flex lg:justify-center lg:items-center mt-8 lg:mt-0">
                  <div className="relative">
                    <img
                      src={ctaIllustration}
                      alt="Let's make things happen illustration"
                      className="w-60 h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-blue-200">
                Start your free trial today.
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button size="lg" variant="secondary">
                  Get Started
                </Button>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-center text-sm text-gray-500">
              Built with MERN Stack
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 Corvex HR Management System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
