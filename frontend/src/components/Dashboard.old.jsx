import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Calendar from "./Calendar";
import RoleSwitcher from "./RoleSwitcher";
import hrSystemData from "../data/hrSystemData";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());

  // Enhanced stats with HR system data
  const stats = [
    {
      title: "Total Employees",
      value: hrSystemData.hrMetrics.workforce.totalEmployees,
      change: "+8.1%",
      isPositive: true,
      color: "text-blue-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Active Interviews",
      value: hrSystemData.interviews.filter(i => i.status === 'Scheduled').length,
      change: "+15.2%",
      isPositive: true,
      color: "text-green-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: "Performance Score",
      value: `${hrSystemData.hrMetrics.performance.averageRating}/5.0`,
      change: "+0.3",
      isPositive: true,
      color: "text-orange-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      title: "Active Projects",
      value: hrSystemData.projects.filter(p => p.status === 'Active').length,
      change: "+4.1%",
      isPositive: true,
      color: "text-purple-600",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
  ];

  const attendanceData = [
    {
      day: "Mon",
      present: 60,
      late: 30,
      absent: 10,
    },
    {
      day: "Tue",
      present: 60,
      late: 20,
      absent: 20,
    },
    {
      day: "Wed",
      present: 48,
      late: 27,
      absent: 25,
    },
    {
      day: "Thu",
      present: 60,
      late: 30,
      absent: 10,
    },
    {
      day: "Fri",
      present: 77,
      late: 13,
      absent: 10,
    },
    {
      day: "Sat",
      present: 45,
      late: 25,
      absent: 30,
    },
    {
      day: "Sun",
      present: 47,
      late: 38,
      absent: 15,
    },
  ];

  const employees = [
    {
      id: 1,
      name: "Riya Agarwal",
      designation: "Team Lead - Design",
      type: "Office",
      checkIn: "09:07 AM",
      status: "On Time",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Kavya Reddy",
      designation: "Web Designer",
      type: "Office",
      checkIn: "10:15 AM",
      status: "Late",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Vivek Yadav",
      designation: "Medical Assistant",
      type: "Remote",
      checkIn: "10:24 AM",
      status: "Late",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Pooja Kumari",
      designation: "Marketing Coordinator",
      type: "Office",
      checkIn: "09:19 AM",
      status: "On Time",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Leslie Alexander",
      designation: "Data Analyst",
      type: "Office",
      checkIn: "09:15 AM",
      status: "On Time",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
    },
  ];

  const scheduleItems = [
    {
      time: "09:30",
      title: "UX/IX Designer",
      subtitle: "Practical Task Review",
      type: "interview",
    },
    {
      time: "10:00",
      title: "Magento Developer",
      subtitle: "Resume Review",
      type: "review",
    },
    {
      time: "01:30",
      title: "Sales Manager",
      subtitle: "Final HR Round",
      type: "interview",
    },
    {
      time: "02:30",
      title: "Front end Developer",
      subtitle: "Practical Task Review",
      type: "review",
    },
    {
      time: "16:00",
      title: "Team Lead",
      subtitle: "TL Meeting",
      type: "meeting",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Role Switcher for Demo */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <RoleSwitcher />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Stats and Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-black">
                          {stat.title}
                        </p>
                        <p className={`text-2xl font-bold mt-2 text-black`}>
                          {stat.value}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className={`p-2 rounded-lg mb-2 ${stat.color.includes('blue') ? 'bg-blue-100' : stat.color.includes('green') ? 'bg-green-100' : stat.color.includes('orange') ? 'bg-orange-100' : 'bg-purple-100'}`}>
                          <div className={stat.color}>
                            {stat.icon}
                          </div>
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            stat.isPositive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => navigate('/interview-scheduling')}
                    className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700">Schedule Interview</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/add-employee')}
                    className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="text-sm font-medium text-green-700">Add Employee</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/leave-requests')}
                    className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-medium text-purple-700">Leave Requests</span>
                  </button>
                  
                  <button 
                    onClick={() => navigate('/performance-management')}
                    className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <svg className="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-sm font-medium text-orange-700">Performance</span>
                  </button>
                </div>
              </div>

              {/* Attendance Overview Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attendance Overview
                  </h3>
                  <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>

                <div className="flex items-end justify-center space-x-6 h-80">
                  {/* Y-axis labels */}
                  <div className="flex flex-col justify-between h-64 py-2 mr-4">
                    <span className="text-xs text-gray-500">100%</span>
                    <span className="text-xs text-gray-500">80%</span>
                    <span className="text-xs text-gray-500">60%</span>
                    <span className="text-xs text-gray-500">40%</span>
                    <span className="text-xs text-gray-500">20%</span>
                    <span className="text-xs text-gray-500">0</span>
                  </div>

                  {/* Chart bars */}
                  <div className="flex items-end space-x-6 h-64">
                    {attendanceData.map((data, index) => {
                      const total = data.present + data.late + data.absent;
                      const presentHeight = (data.present / 100) * 240;
                      const lateHeight = (data.late / 100) * 240;
                      const absentHeight = (data.absent / 100) * 240;

                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-4 relative"
                            style={{ height: "240px" }}
                          >
                            {/* Present (Purple) */}
                            <div
                              className="absolute bottom-0 w-full rounded-lg"
                              style={{
                                height: `${presentHeight}px`,
                                backgroundColor: "#5E17EB",
                              }}
                            ></div>

                            {/* Late (Orange) */}
                            <div
                              className="absolute w-full rounded-lg"
                              style={{
                                height: `${lateHeight}px`,
                                bottom: `${presentHeight}px`,
                                backgroundColor: "#FEB85B",
                              }}
                            ></div>

                            {/* Absent (Pink) */}
                            <div
                              className="absolute w-full rounded-lg"
                              style={{
                                height: `${absentHeight}px`,
                                bottom: `${presentHeight + lateHeight}px`,
                                backgroundColor: "#F45B69",
                              }}
                            ></div>
                          </div>
                          <p className="text-xs font-medium text-gray-600 mt-3">
                            {data.day}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Attendance Overview Table */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attendance Overview
                  </h3>
                  <button
                    onClick={() => navigate("/attendance")}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Employee Name
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Designation
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Type
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Check In Time
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr
                          key={employee.id}
                          className="border-b border-gray-100"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img
                                src={employee.avatar}
                                alt={employee.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="font-medium text-gray-900">
                                {employee.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {employee.designation}
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {employee.type}
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {employee.checkIn}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                employee.status === "On Time"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {employee.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar and Schedule */}
            <div className="space-y-6">
              {/* Calendar */}
              <Calendar />

              {/* Recent Activities */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                  <button 
                    onClick={() => navigate('/hr-insights')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">New hire onboarded: Alice Thompson</span>
                    <span className="ml-auto text-gray-400 text-xs">2h ago</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Interview completed with Robert Chen</span>
                    <span className="ml-auto text-gray-400 text-xs">4h ago</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Performance review scheduled</span>
                    <span className="ml-auto text-gray-400 text-xs">6h ago</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Leave request approved</span>
                    <span className="ml-auto text-gray-400 text-xs">1d ago</span>
                  </div>
                </div>
              </div>

              {/* Pending Tasks */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending Tasks</h3>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    {hrSystemData.leaveRequests.filter(lr => lr.status === 'Pending').length + 2}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Review Leave Requests</p>
                      <p className="text-xs text-gray-600">{hrSystemData.leaveRequests.filter(lr => lr.status === 'Pending').length} pending</p>
                    </div>
                    <button 
                      onClick={() => navigate('/leave-requests')}
                      className="bg-yellow-600 text-white px-3 py-1 rounded text-xs hover:bg-yellow-700 transition-colors"
                    >
                      Review
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Schedule Interviews</p>
                      <p className="text-xs text-gray-600">2 candidates waiting</p>
                    </div>
                    <button 
                      onClick={() => navigate('/interview-scheduling')}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    Wednesday, 5th July 2023
                  </p>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {scheduleItems.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-xs font-medium text-gray-600 mt-1 w-12">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
