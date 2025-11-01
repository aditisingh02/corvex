import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const TrainingDevelopment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("courses");

  // Mock training data
  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      description: "Deep dive into React hooks, context, and performance optimization",
      category: "Technical",
      level: "Advanced",
      duration: "8 hours",
      instructor: "John Smith",
      enrolledCount: 24,
      completionRate: 78,
      rating: 4.5,
      status: "active",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Leadership Fundamentals",
      description: "Essential leadership skills for team management and communication",
      category: "Leadership",
      level: "Intermediate",
      duration: "12 hours",
      instructor: "Sarah Davis",
      enrolledCount: 18,
      completionRate: 85,
      rating: 4.7,
      status: "active",
      thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Data Privacy & Security",
      description: "Understanding GDPR, data protection, and cybersecurity best practices",
      category: "Compliance",
      level: "Beginner",
      duration: "4 hours",
      instructor: "Mike Wilson",
      enrolledCount: 45,
      completionRate: 92,
      rating: 4.3,
      status: "active",
      thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop"
    }
  ];

  const employeeProgress = [
    {
      id: 1,
      employeeName: "Sarah Johnson",
      department: "Engineering",
      coursesEnrolled: 3,
      coursesCompleted: 2,
      totalHours: 24,
      lastActivity: "2025-11-01",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face",
      currentCourse: "Advanced React Development",
      progress: 75
    },
    {
      id: 2,
      employeeName: "Michael Chen",
      department: "Engineering",
      coursesEnrolled: 2,
      coursesCompleted: 1,
      totalHours: 16,
      lastActivity: "2025-10-28",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      currentCourse: "Leadership Fundamentals",
      progress: 45
    },
    {
      id: 3,
      employeeName: "Emily Davis",
      department: "Design",
      coursesEnrolled: 4,
      coursesCompleted: 3,
      totalHours: 32,
      lastActivity: "2025-11-02",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      currentCourse: "UX Design Mastery",
      progress: 90
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      category: "Cloud Computing",
      provider: "Amazon Web Services",
      validityPeriod: "3 years",
      cost: "$150",
      difficulty: "Advanced",
      description: "Validates technical expertise in designing distributed systems on AWS"
    },
    {
      id: 2,
      name: "Project Management Professional (PMP)",
      category: "Project Management",
      provider: "Project Management Institute",
      validityPeriod: "3 years",
      cost: "$405",
      difficulty: "Advanced",
      description: "Globally recognized certification for project management professionals"
    },
    {
      id: 3,
      name: "Google UX Design Certificate",
      category: "Design",
      provider: "Google",
      validityPeriod: "Lifetime",
      cost: "$49/month",
      difficulty: "Beginner",
      description: "Comprehensive UX design program covering user research, wireframing, and prototyping"
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Technical":
        return "bg-blue-100 text-blue-800";
      case "Leadership":
        return "bg-purple-100 text-purple-800";
      case "Compliance":
        return "bg-orange-100 text-orange-800";
      case "Design":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return <div className="flex items-center">{stars}</div>;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Training & Development</h1>
                  <p className="text-gray-600 mt-2">Manage employee learning and professional development</p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Training Reports
                  </button>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg hover:bg-[#4A0E99] transition-colors">
                    Create Course
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Courses</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-green-100">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Learners</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-yellow-100">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">84%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Certifications Earned</p>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "courses"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Courses
                  </button>
                  <button
                    onClick={() => setActiveTab("progress")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "progress"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Employee Progress
                  </button>
                  <button
                    onClick={() => setActiveTab("certifications")}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "certifications"
                        ? "border-[#5E17EB] text-[#5E17EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Certifications
                  </button>
                </nav>
              </div>
            </div>

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(course.category)}`}>
                          {course.category}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                          {course.level}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>Duration: {course.duration}</span>
                        <span>Instructor: {course.instructor}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{course.enrolledCount} enrolled</span>
                        <div className="flex items-center space-x-1">
                          <StarRating rating={course.rating} />
                          <span>({course.rating})</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Completion Rate</span>
                          <span>{course.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#5E17EB] h-2 rounded-full"
                            style={{ width: `${course.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-[#5E17EB] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#4A0E99] transition-colors">
                          View Course
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add New Course Card */}
                <div className="bg-white rounded-lg shadow border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8">
                  <div className="p-4 rounded-full bg-gray-100 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Course</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Create a new training course for your team
                  </p>
                  <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#4A0E99] transition-colors">
                    Create Course
                  </button>
                </div>
              </div>
            )}

            {/* Employee Progress Tab */}
            {activeTab === "progress" && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">Employee Learning Progress</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Courses Enrolled
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Completed
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Hours
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progress
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Activity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {employeeProgress.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={employee.avatar}
                                alt={employee.employeeName}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {employee.employeeName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {employee.department}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.coursesEnrolled}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.coursesCompleted}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.totalHours}h
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {employee.currentCourse}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-[#5E17EB] h-2 rounded-full"
                                  style={{ width: `${employee.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{employee.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {employee.lastActivity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === "certifications" && (
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(cert.category)}`}>
                            {cert.category}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(cert.difficulty)}`}>
                            {cert.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>Provider: {cert.provider}</span>
                          <span>Validity: {cert.validityPeriod}</span>
                          <span>Cost: {cert.cost}</span>
                        </div>
                      </div>
                      <div className="ml-6">
                        <button className="bg-[#5E17EB] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#4A0E99] transition-colors">
                          Request Certification
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrainingDevelopment;