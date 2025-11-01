import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const LearningManagement = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 'CRS001',
      title: 'JavaScript Advanced Concepts',
      category: 'Technical',
      instructor: 'Dr. Sarah Wilson',
      duration: '8 hours',
      difficulty: 'Advanced',
      enrolled: 24,
      completed: 18,
      rating: 4.8,
      progress: 75,
      status: 'Active',
      description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.',
      startDate: '2024-01-10',
      endDate: '2024-02-10'
    },
    {
      id: 'CRS002',
      title: 'Leadership Fundamentals',
      category: 'Leadership',
      instructor: 'Michael Chen',
      duration: '12 hours',
      difficulty: 'Intermediate',
      enrolled: 32,
      completed: 28,
      rating: 4.6,
      progress: 87,
      status: 'Active',
      description: 'Essential leadership skills for managing teams and driving organizational success.',
      startDate: '2024-01-05',
      endDate: '2024-02-15'
    },
    {
      id: 'CRS003',
      title: 'Data Security & Privacy',
      category: 'Compliance',
      instructor: 'Jennifer Adams',
      duration: '6 hours',
      difficulty: 'Beginner',
      enrolled: 45,
      completed: 42,
      rating: 4.9,
      progress: 93,
      status: 'Active',
      description: 'Comprehensive training on data protection regulations and security best practices.',
      startDate: '2024-01-01',
      endDate: '2024-01-31'
    },
    {
      id: 'CRS004',
      title: 'React Development Bootcamp',
      category: 'Technical',
      instructor: 'Alex Thompson',
      duration: '20 hours',
      difficulty: 'Advanced',
      enrolled: 16,
      completed: 8,
      rating: 4.7,
      progress: 50,
      status: 'Active',
      description: 'Intensive bootcamp covering React hooks, state management, and modern development practices.',
      startDate: '2024-01-15',
      endDate: '2024-03-15'
    },
    {
      id: 'CRS005',
      title: 'Customer Service Excellence',
      category: 'Soft Skills',
      instructor: 'Lisa Wong',
      duration: '4 hours',
      difficulty: 'Beginner',
      enrolled: 28,
      completed: 25,
      rating: 4.5,
      progress: 89,
      status: 'Completed',
      description: 'Best practices for delivering exceptional customer service and handling difficult situations.',
      startDate: '2023-12-01',
      endDate: '2023-12-31'
    }
  ];

  const certifications = [
    {
      id: 'CERT001',
      name: 'AWS Solutions Architect',
      category: 'Cloud Computing',
      provider: 'Amazon Web Services',
      validUntil: '2025-06-15',
      employees: [
        { name: 'John Smith', obtainedDate: '2023-06-15', status: 'Valid' },
        { name: 'Sarah Johnson', obtainedDate: '2023-08-20', status: 'Valid' },
        { name: 'Mike Davis', obtainedDate: '2022-06-15', status: 'Expired' }
      ]
    },
    {
      id: 'CERT002',
      name: 'Project Management Professional (PMP)',
      category: 'Project Management',
      provider: 'PMI',
      validUntil: '2025-03-10',
      employees: [
        { name: 'Emily Chen', obtainedDate: '2022-03-10', status: 'Valid' },
        { name: 'David Miller', obtainedDate: '2023-01-15', status: 'Valid' }
      ]
    },
    {
      id: 'CERT003',
      name: 'Certified Information Security Manager (CISM)',
      category: 'Cybersecurity',
      provider: 'ISACA',
      validUntil: '2024-12-01',
      employees: [
        { name: 'Alex Thompson', obtainedDate: '2021-12-01', status: 'Expiring Soon' }
      ]
    }
  ];

  const learningPaths = [
    {
      id: 'PATH001',
      title: 'Full Stack Developer Track',
      description: 'Complete path from frontend to backend development',
      courses: ['JavaScript Advanced Concepts', 'React Development Bootcamp', 'Node.js Fundamentals', 'Database Design'],
      duration: '16 weeks',
      enrolled: 12,
      difficulty: 'Advanced'
    },
    {
      id: 'PATH002',
      title: 'Leadership Development Program',
      description: 'Comprehensive leadership training for managers',
      courses: ['Leadership Fundamentals', 'Team Management', 'Strategic Thinking', 'Performance Management'],
      duration: '12 weeks',
      enrolled: 8,
      difficulty: 'Intermediate'
    },
    {
      id: 'PATH003',
      title: 'Digital Marketing Specialist',
      description: 'Master digital marketing strategies and tools',
      courses: ['SEO Fundamentals', 'Social Media Marketing', 'Google Analytics', 'Content Strategy'],
      duration: '10 weeks',
      enrolled: 15,
      difficulty: 'Beginner'
    }
  ];

  const categories = ['all', 'Technical', 'Leadership', 'Compliance', 'Soft Skills', 'Marketing'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCertStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCourses = courses.filter(course => 
    selectedCategory === 'all' || course.category === selectedCategory
  );

  const CourseCard = ({ course }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{course.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>👨‍🏫 {course.instructor}</span>
            <span>⏱️ {course.duration}</span>
            <span>⭐ {course.rating}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
            {course.status}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <span>{course.completed}/{course.enrolled} completed</span>
        </div>
        <div className="space-x-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Management System</h1>
            <p className="text-gray-600">Manage employee training, courses, and certifications</p>
          </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.status === 'Active').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completions</p>
              <p className="text-2xl font-bold text-gray-900">{courses.reduce((sum, c) => sum + c.completed, 0)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Certifications</p>
              <p className="text-2xl font-bold text-gray-900">{certifications.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Learning Paths</p>
              <p className="text-2xl font-bold text-gray-900">{learningPaths.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'certifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => setActiveTab('paths')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'paths'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Learning Paths
            </button>
          </nav>
        </div>

        {activeTab === 'courses' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Create Course
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Employee Certifications</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Add Certification
              </button>
            </div>

            <div className="space-y-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{cert.name}</h4>
                      <p className="text-gray-600">{cert.category} • {cert.provider}</p>
                      <p className="text-sm text-gray-500">Valid until: {cert.validUntil}</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Employee</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Obtained Date</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cert.employees.map((emp, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 text-sm text-gray-900">{emp.name}</td>
                            <td className="py-2 text-sm text-gray-600">{emp.obtainedDate}</td>
                            <td className="py-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCertStatusColor(emp.status)}`}>
                                {emp.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Learning Paths</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Create Learning Path
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <div key={path.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{path.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>⏱️ {path.duration}</span>
                      <span>👥 {path.enrolled} enrolled</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(path.difficulty)}`}>
                      {path.difficulty}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Included Courses:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {path.courses.map((course, index) => (
                        <li key={index}>• {course}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                      View Path
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
        </main>
      </div>
    </div>
  );
};

export default LearningManagement;