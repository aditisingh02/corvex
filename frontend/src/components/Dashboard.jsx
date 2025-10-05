import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Calendar from "./Calendar";

const Dashboard = () => {
  const [currentDate] = useState(new Date());

  // Sample data for the dashboard
  const stats = [
    {
      title: "Total Employees",
      value: "560",
      change: "+8.1%",
      isPositive: true,
      color: "text-blue-600",
    },
    {
      title: "Total Applicant",
      value: "1050",
      change: "+3.1%",
      isPositive: true,
      color: "text-green-600",
    },
    {
      title: "Today Attendance",
      value: "470",
      change: "-2.4%",
      isPositive: false,
      color: "text-orange-600",
    },
    {
      title: "Total Projects",
      value: "280",
      change: "+4.1%",
      isPositive: true,
      color: "text-purple-600",
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
      name: "Jennie Watson",
      designation: "Team Lead - Design",
      type: "Office",
      checkIn: "09:07 AM",
      status: "On Time",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b619?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Darlene Robertson",
      designation: "Web Designer",
      type: "Office",
      checkIn: "10:15 AM",
      status: "Late",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Jacob Jones",
      designation: "Medical Assistant",
      type: "Remote",
      checkIn: "10:24 AM",
      status: "Late",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Kathryn Murphy",
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
                      <div
                        className={`text-sm font-medium ${
                          stat.isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
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
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
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
