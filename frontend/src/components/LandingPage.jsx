import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import heroIllustration from "../assets/hero-illustration.svg";
import servicesIllus1 from "../assets/services-illus-1.svg";
import servicesIllus2 from "../assets/services-illus-2.svg";
import servicesIllus3 from "../assets/services-illus-3.svg";
import servicesIllus4 from "../assets/services-illus-4.svg";
import servicesIllus5 from "../assets/services-illus-5.svg";
import servicesIllus6 from "../assets/services-illus-6.svg";
import ctaIllustration from "../assets/cta-illustration.svg";
import decorativeStar from "../assets/decorative-star.svg";
import decorativeCircle from "../assets/decorative-circle.svg";
import decorativeSquare from "../assets/decorative-square.svg";
import decorativeDiamond from "../assets/decorative-diamond.svg";
import starIcon from "../assets/star-icon.svg";
import contactUsIllustration from "../assets/contact-us-illustration.svg";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(1); // First item open by default

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk']">
      {/* Header */}
      <header className="p-4 sm:p-6 lg:p-8 flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl px-6 py-3 shadow-lg border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex justify-start">
                <span className="text-xl font-bold text-[#5E17EB]">Corvex</span>
              </div>
              <nav className="hidden md:flex space-x-6">
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
                  href="#contact"
                  className="text-sm font-medium text-gray-600 hover:text-[#5E17EB] transition-colors"
                >
                  Contact
                </a>
              </nav>
              <div className="flex items-center">
                <Link to="/login">
                  <Button className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
            <div className="py-12 md:py-16 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
                {/* Left Column - Text Content */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
                      Empower Your <span className="block">Workforce,</span>
                      <span className="block">
                        Simplify <span className="text-[#5E17EB]">HR.</span>
                      </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                      Corvex is your comprehensive HR management solution that
                      transforms how you handle employee data, attendance, payroll, 
                      and performance. Focus on growing your team while we handle the{" "}
                      <span className="font-semibold text-[#5E17EB]">
                        details.
                      </span>
                    </p>
                  </div>
                  <div>
                    <Link to="/login">
                      <Button
                        size="lg"
                        className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-lg font-medium transition-colors"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Column - Illustration */}
                <div className="lg:col-span-3 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-2xl lg:max-w-3xl">
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
                HR Solutions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Complete HR management tools to optimize your employee experience
                and organizational efficiency
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Employee Management */}
              <div className="bg-[#F3F3F3] rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start">
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Employee
                    </div>
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Management
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img
                    src={servicesIllus1}
                    alt="Employee Management"
                    className="w-40 h-36 object-contain"
                  />
                </div>
              </div>

              {/* Simplified Payroll & Compliance */}
              <div className="bg-[#5E17EB] text-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex flex-col items-start">
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Simplified Payroll
                    </div>
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      & Compliance
                    </div>
                  </div>
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
                  <div className="flex flex-col items-start">
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Smarter Performance
                    </div>
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Management
                    </div>
                  </div>
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
                  <div className="flex flex-col items-start">
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Centralized
                    </div>
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Employee Hub
                    </div>
                  </div>
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
                  <div className="flex flex-col items-start">
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Secure &
                    </div>
                    <div className="bg-white text-black px-4 py-2 rounded-lg text-lg font-medium">
                      Scalable
                    </div>
                  </div>
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
                  <div className="flex flex-col items-start">
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Analytics and
                    </div>
                    <div className="bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-lg font-medium">
                      Tracking
                    </div>
                  </div>
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
                    Move beyond spreadsheets and unlock the strategic insights hidden in your workforce data. Corvex provides powerful analytics to help you reduce turnover, improve engagement, and build a team that drives growth.
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

        {/* Case Studies Section */}
        <div className="py-16 bg-white" id="use-cases">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with side layout */}
            <div className="flex w-full max-w-[1440px] mx-auto px-[100px] items-start gap-10 mb-12">
              <div className="flex-shrink-0 w-64">
                <div className="inline-flex items-center px-6 py-4 bg-[#5E17EB] text-white text-3xl font-medium rounded-2xl">
                  Case Studies
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg text-black mt-2">
                  Discover How Organizations Transform Their HR Operations
                  with Our Comprehensive Solutions
                </p>
              </div>
            </div>

            {/* Case Studies Cards - Full Width */}
            <div className="bg-gray-900 rounded-3xl p-12 lg:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="text-white">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Fast-growing startup Innovatech overcame its chaotic, 
                    manual HR processes by implementing Corvex. Our platform centralized their employee data and 
                    automated workflows, creating a consistent and professional experience for new hires. This strategic 
                    shift not only streamlined their operations by 50% but also saved their HR team 15 hours of administrative work weekly, 
                    allowing them to focus on scaling the company instead of managing paperwork.


                  </p>
                  {/* <a
                    href="#"
                    className="inline-flex items-center text-[#5E17EB] font-medium hover:text-purple-400 transition-colors"
                  >
                    Learn more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a> */}
                </div>

                {/* Card 2 */}
                <div className="text-white border-l border-r border-gray-600 px-8">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Creative agency Pixel Perfect tackled low engagement by replacing clunky annual reviews with Corvex’s dynamic portfolios and feedback tools. This resulted in a 30% boost in employee engagement scores in just the first quarter and significantly improved retention of top creative talent.


                  </p>
                  {/* <a
                    href="#"
                    className="inline-flex items-center text-[#5E17EB] font-medium hover:text-purple-400 transition-colors"
                  >
                    Learn more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a> */}
                </div>

                {/* Card 3 */}
                <div className="text-white">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Mid-sized enterprise Global Connect transformed its HR strategy from reactive to 
                    data-driven using Corvex. By consolidating their siloed workforce data into our powerful 
                    analytics dashboard, their leadership gained actionable, real-time insights into key metrics.
                    This newfound clarity enabled them to identify the root causes of attrition, leading to a new
                    retention strategy that reduced employee turnover by 15% in the first year.
                  </p>
                  {/* <a
                    href="#"
                    className="inline-flex items-center text-[#5E17EB] font-medium hover:text-purple-400 transition-colors"
                  >
                    Learn more
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Working Process Section */}
        <div className="py-16 bg-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left side decorations */}
            <img
              src={decorativeStar}
              alt=""
              className="absolute top-20 left-8 w-10 h-10 opacity-30"
            />
            <img
              src={decorativeCircle}
              alt=""
              className="absolute top-40 left-16 w-14 h-14 opacity-20"
            />
            <img
              src={decorativeSquare}
              alt=""
              className="absolute top-72 left-4 w-12 h-12 opacity-25"
            />
            <img
              src={decorativeDiamond}
              alt=""
              className="absolute bottom-32 left-12 w-11 h-11 opacity-30"
            />

            {/* Right side decorations */}
            <img
              src={decorativeCircle}
              alt=""
              className="absolute top-32 right-6 w-16 h-16 opacity-25"
            />
            <img
              src={decorativeStar}
              alt=""
              className="absolute top-64 right-20 w-8 h-8 opacity-35"
            />
            <img
              src={decorativeSquare}
              alt=""
              className="absolute top-96 right-8 w-10 h-10 opacity-20"
            />
            <img
              src={decorativeDiamond}
              alt=""
              className="absolute bottom-20 right-16 w-13 h-13 opacity-30"
            />

            {/* Additional scattered elements */}
            <img
              src={decorativeStar}
              alt=""
              className="absolute top-52 right-32 w-6 h-6 opacity-15"
            />
            <img
              src={decorativeCircle}
              alt=""
              className="absolute bottom-40 left-24 w-8 h-8 opacity-20"
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <div className="mb-12 flex items-start gap-8">
              <div className="inline-flex items-center px-6 py-4 bg-[#5E17EB] text-black text-3xl font-medium rounded-2xl flex-shrink-0">
                Our Working Process
              </div>
              <div className="flex-1">
                <p className="text-lg text-black mt-2">
                  Our Process for Implementing Your HR Management Solution
                </p>
              </div>
            </div>

            {/* Accordion Items */}
            <div className="space-y-4">
              {/* Item 1 - Consultation */}
              <div
                className={`rounded-2xl border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  openAccordion === 1
                    ? "bg-[#5E17EB] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 1 ? null : 1)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold">01</span>
                    <span className="text-lg font-semibold">Consultation</span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      openAccordion === 1
                        ? "border-white bg-white text-[#5E17EB]"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {openAccordion === 1 ? "-" : "+"}
                  </div>
                </button>
                {openAccordion === 1 && (
                  <div className="px-6 pb-6">
                    <p className="text-white/90 leading-relaxed">
                      We begin by understanding your organization's HR needs,
                      current processes, and pain points. This helps us configure
                      the system to match your specific requirements and ensure
                      a smooth transition.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 2 - Research and Strategy Development */}
              <div
                className={`rounded-2xl border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  openAccordion === 2
                    ? "bg-[#5E17EB] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 2 ? null : 2)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold">02</span>
                    <span className="text-lg font-semibold">
                      System Setup and Configuration
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      openAccordion === 2
                        ? "border-white bg-white text-[#5E17EB]"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {openAccordion === 2 ? "-" : "+"}
                  </div>
                </button>
                {openAccordion === 2 && (
                  <div className="px-6 pb-6">
                    <p className="text-white/90 leading-relaxed">
                      Our team configures the HR management system according to
                      your organization's structure, policies, and workflows.
                      We ensure all modules are properly set up and integrated.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 3 - Implementation */}
              <div
                className={`rounded-2xl border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  openAccordion === 3
                    ? "bg-[#5E17EB] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 3 ? null : 3)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold">03</span>
                    <span className="text-lg font-semibold">
                      Data Migration & Training
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      openAccordion === 3
                        ? "border-white bg-white text-[#5E17EB]"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {openAccordion === 3 ? "-" : "+"}
                  </div>
                </button>
                {openAccordion === 3 && (
                  <div className="px-6 pb-6">
                    <p className="text-white/90 leading-relaxed">
                      We carefully migrate your existing HR data and provide
                      comprehensive training to your team on using the new system.
                      This ensures a smooth transition and quick adoption.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 4 - Monitoring and Optimization */}
              <div
                className={`rounded-2xl border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  openAccordion === 4
                    ? "bg-[#5E17EB] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 4 ? null : 4)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold">04</span>
                    <span className="text-lg font-semibold">
                      Monitoring and Optimization
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      openAccordion === 4
                        ? "border-white bg-white text-[#5E17EB]"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {openAccordion === 4 ? "-" : "+"}
                  </div>
                </button>
                {openAccordion === 4 && (
                  <div className="px-6 pb-6">
                    <p className="text-white/90 leading-relaxed">
                      We track system usage, monitor performance, and gather
                      feedback to ensure the HR system is meeting your needs
                      and helping achieve organizational goals.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 5 - Reporting and Communication */}
              <div
                className={`rounded-2xl border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  openAccordion === 5
                    ? "bg-[#5E17EB] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 5 ? null : 5)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold">05</span>
                    <span className="text-lg font-semibold">
                      Reporting and Communication
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      openAccordion === 5
                        ? "border-white bg-white text-[#5E17EB]"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {openAccordion === 5 ? "-" : "+"}
                  </div>
                </button>
                {openAccordion === 5 && (
                  <div className="px-6 pb-6">
                    <p className="text-white/90 leading-relaxed">
                      Access detailed HR analytics and reports through our
                      dashboard. Our support team maintains regular communication
                      to address any questions or concerns.
                    </p>
                  </div>
                )}
              </div>

              {/* Item 6 - Continual Improvement */}
              <div
                className={`rounded-2xl border-2 border-black transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                  openAccordion === 6
                    ? "bg-[#5E17EB] text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <button
                  className="w-full px-6 py-6 flex items-center justify-between text-left"
                  onClick={() =>
                    setOpenAccordion(openAccordion === 6 ? null : 6)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold">06</span>
                    <span className="text-lg font-semibold">
                      Continual Improvement
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      openAccordion === 6
                        ? "border-white bg-white text-[#5E17EB]"
                        : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {openAccordion === 6 ? "-" : "+"}
                  </div>
                </button>
                {openAccordion === 6 && (
                  <div className="px-6 pb-6">
                    <p className="text-white/90 leading-relaxed">
                      We regularly update our HR platform with new features
                      and improvements based on user feedback and evolving HR
                      best practices.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 flex items-start gap-8">
              <div className="inline-flex items-center px-6 py-4 bg-[#5E17EB] text-white text-3xl font-medium rounded-2xl flex-shrink-0">
                Team
              </div>
              <div className="flex-1">
                <p className="text-lg text-black mt-2">
                  Meet the skilled and experienced team behind our successful
                  <br />
                  digital marketing strategies
                </p>
              </div>
            </div>

            {/* Team Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                {/* Profile Icon */}
                <div className="absolute top-4 right-4">
                  <a
                    href="https://linkedin.com/in/aditi-kanagala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-[#5E17EB] rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <span className="text-white text-sm font-bold">in</span>
                  </a>
                </div>

                {/* Star Icon */}
                <div className="mb-6">
                  <img src={starIcon} alt="" className="w-16 h-16" />
                </div>

                {/* Team Member Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-black mb-1">
                    Aditi Kanagala
                  </h3>
                  <p className="text-gray-600">Frontend Architect | UI/UX Specialist</p>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  A creative developer passionate about crafting intuitive and visually compelling user interfaces.
                  Aditi specializes in translating complex design concepts into responsive, high-performance web applications using modern frameworks like React.


                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                {/* Profile Icon */}
                <div className="absolute top-4 right-4">
                  <a
                    href="https://linkedin.com/in/aditi-singh02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-[#5E17EB] rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <span className="text-white text-sm font-bold">in</span>
                  </a>
                </div>

                {/* Star Icon */}
                <div className="mb-6">
                  <img src={starIcon} alt="" className="w-16 h-16" />
                </div>

                {/* Team Member Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-black mb-1">
                    Aditi Singh
                  </h3>
                  <p className="text-gray-600"> Full-Stack Developer| UI/UX Specialist</p>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  A problem-solver at heart, Aditi architects and develops comprehensive web applications.
                  Her expertise spans from database design to API implementation, ensuring our applications are not only functional but also scalable and efficient.


                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                {/* Profile Icon */}
                <div className="absolute top-4 right-4">
                  <a
                    href="https://www.linkedin.com/in/vraj-soni2412/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-[#5E17EB] rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  >
                    <span className="text-white text-sm font-bold">in</span>
                  </a>
                </div>

                {/* Star Icon */}
                <div className="mb-6">
                  <img src={starIcon} alt="" className="w-16 h-16" />
                </div>

                {/* Team Member Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-black mb-1">
                    Vraj Soni
                  </h3>
                  <p className="text-gray-600">Full-Stack Developer | DevOps Lead</p>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  Bridging the gap between development and operations, Vraj ensures our project runs smoothly from code to deployment. 
                  He is proficient across the entire stack and specializes in building CI/CD pipelines and managing cloud infrastructure for seamless integration and delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="py-16 bg-white" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 flex items-start gap-8">
              <div className="inline-flex items-center px-6 py-4 bg-[#5E17EB] text-white text-3xl font-medium rounded-2xl flex-shrink-0">
                Contact Us
              </div>
              <div className="flex-1">
                <p className="text-lg text-black mt-2">
                  Get in Touch: Let's Discuss Your <br /> HR Management
                  Requirements
                </p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-3xl overflow-hidden">
              <div className="lg:flex lg:items-start">
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Email*
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-2">
                        Message*
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Message"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Right Side - Illustration */}
                <div className="lg:w-1/2 lg:flex lg:justify-end lg:items-center">
                  <div className="w-3/4 h-full flex justify-end items-center">
                    <img
                      src={contactUsIllustration}
                      alt="Contact Us Illustration"
                      className="w-3/4 h-auto object-contain lg:object-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
