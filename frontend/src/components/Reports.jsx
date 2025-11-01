import React, { useState } from 'react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('employee');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [format, setFormat] = useState('pdf');

  const reportTypes = [
    {
      id: 'employee',
      name: 'Employee Reports',
      description: 'Comprehensive employee data and statistics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'recruitment',
      name: 'Recruitment Reports',
      description: 'Hiring pipeline and recruitment analytics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-4z" />
        </svg>
      )
    },
    {
      id: 'performance',
      name: 'Performance Reports',
      description: 'Employee performance and review data',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'attendance',
      name: 'Attendance Reports',
      description: 'Time tracking and attendance analytics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'payroll',
      name: 'Payroll Reports',
      description: 'Salary and compensation analytics',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'training',
      name: 'Training Reports',
      description: 'Learning and development progress',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  const employeeReports = [
    { name: 'Employee Directory', description: 'Complete list of all employees with contact information' },
    { name: 'Organizational Chart', description: 'Hierarchical structure of the organization' },
    { name: 'Department Wise Analysis', description: 'Employee distribution across departments' },
    { name: 'New Hires Report', description: 'Recently joined employees and onboarding status' },
    { name: 'Employee Turnover', description: 'Attrition analysis and exit interview data' },
    { name: 'Birthday & Anniversary Report', description: 'Upcoming birthdays and work anniversaries' }
  ];

  const recruitmentReports = [
    { name: 'Recruitment Pipeline', description: 'Current status of all open positions' },
    { name: 'Source Effectiveness', description: 'Performance analysis of recruitment channels' },
    { name: 'Time to Hire Analysis', description: 'Average time taken to fill positions' },
    { name: 'Interview Feedback Summary', description: 'Consolidated interview feedback and decisions' },
    { name: 'Offer Acceptance Rate', description: 'Analysis of offer acceptance and rejection patterns' },
    { name: 'Candidate Experience Report', description: 'Feedback from candidates about the hiring process' }
  ];

  const performanceReports = [
    { name: 'Performance Review Summary', description: 'Consolidated performance ratings and feedback' },
    { name: 'Goal Achievement Report', description: 'Progress tracking of employee goals and objectives' },
    { name: 'Top Performers Report', description: 'Identification of high-performing employees' },
    { name: '360-Degree Feedback', description: 'Multi-source feedback compilation' },
    { name: 'Performance Improvement Plans', description: 'Employees under performance improvement' },
    { name: 'Skill Gap Analysis', description: 'Identification of skill gaps across teams' }
  ];

  const attendanceReports = [
    { name: 'Monthly Attendance Summary', description: 'Attendance patterns and statistics' },
    { name: 'Leave Balance Report', description: 'Current leave balances for all employees' },
    { name: 'Overtime Analysis', description: 'Overtime hours and compensation tracking' },
    { name: 'Remote Work Report', description: 'Work from home patterns and productivity' },
    { name: 'Late Arrivals & Early Departures', description: 'Time adherence analysis' },
    { name: 'Holiday Calendar Report', description: 'Planned holidays and their impact' }
  ];

  const payrollReports = [
    { name: 'Salary Summary', description: 'Comprehensive salary and compensation overview' },
    { name: 'Bonus & Incentives', description: 'Bonus distributions and incentive programs' },
    { name: 'Tax Deductions Report', description: 'Tax withholdings and deductions summary' },
    { name: 'Benefits Utilization', description: 'Employee benefits usage and costs' },
    { name: 'Payroll Cost Analysis', description: 'Department-wise payroll cost breakdown' },
    { name: 'Salary Benchmarking', description: 'Comparison with industry standards' }
  ];

  const trainingReports = [
    { name: 'Training Completion Report', description: 'Progress tracking of all training programs' },
    { name: 'Certification Status', description: 'Employee certifications and renewal dates' },
    { name: 'Training ROI Analysis', description: 'Return on investment for training programs' },
    { name: 'Skill Development Progress', description: 'Individual skill improvement tracking' },
    { name: 'Training Calendar', description: 'Scheduled and upcoming training sessions' },
    { name: 'Training Feedback Summary', description: 'Employee feedback on training programs' }
  ];

  const getReportsList = () => {
    switch (selectedReport) {
      case 'employee': return employeeReports;
      case 'recruitment': return recruitmentReports;
      case 'performance': return performanceReports;
      case 'attendance': return attendanceReports;
      case 'payroll': return payrollReports;
      case 'training': return trainingReports;
      default: return employeeReports;
    }
  };

  const handleGenerateReport = (reportName) => {
    alert(`Generating ${reportName} for ${dateRange} in ${format.toUpperCase()} format...`);
  };

  const ReportCard = ({ report }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
          <p className="text-gray-600 text-sm">{report.description}</p>
        </div>
        <button
          onClick={() => handleGenerateReport(report.name)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Generate
        </button>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Last generated: 2 days ago</span>
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-700">Preview</button>
          <button className="text-green-600 hover:text-green-700">Schedule</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-['Space_Grotesk']">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Reports</h1>
        <p className="text-gray-600">Generate comprehensive reports for all HR functions</p>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedReport(type.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedReport === type.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">{type.icon}</div>
              <h3 className="font-medium text-sm">{type.name}</h3>
            </div>
          </button>
        ))}
      </div>

      {/* Report Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisQuarter">This Quarter</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="thisYear">This Year</option>
              <option value="lastYear">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
            <select 
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
              <option value="word">Word Document</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium">
              Generate All Reports
            </button>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {reportTypes.find(type => type.id === selectedReport)?.name} Available
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getReportsList().map((report, index) => (
            <ReportCard key={index} report={report} />
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Scheduled Reports</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
            Add Schedule
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Monthly Employee Report</h3>
              <p className="text-sm text-gray-600">Generates on the 1st of every month</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-green-600 font-medium">Active</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
              <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Weekly Attendance Summary</h3>
              <p className="text-sm text-gray-600">Generates every Friday at 5:00 PM</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-green-600 font-medium">Active</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
              <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900">Quarterly Performance Review</h3>
              <p className="text-sm text-gray-600">Generates at the end of each quarter</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-yellow-600 font-medium">Paused</span>
              <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
              <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;