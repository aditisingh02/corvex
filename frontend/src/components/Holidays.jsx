import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Holidays = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [showAddHolidayModal, setShowAddHolidayModal] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
  });

  // Sample holidays data with current year dates
  const holidaysData = [
    {
      id: 1,
      date: "January 01, 2025",
      day: "Wednesday",
      name: "New Year",
      dateObj: new Date("2025-01-01"),
    },
    {
      id: 2,
      date: "February 14, 2025",
      day: "Friday",
      name: "Valentine's Day",
      dateObj: new Date("2025-02-14"),
    },
    {
      id: 3,
      date: "March 08, 2025",
      day: "Saturday",
      name: "International Women's Day",
      dateObj: new Date("2025-03-08"),
    },
    {
      id: 4,
      date: "April 01, 2025",
      day: "Tuesday",
      name: "April Fool's Day",
      dateObj: new Date("2025-04-01"),
    },
    {
      id: 5,
      date: "May 01, 2025",
      day: "Thursday",
      name: "International Workers' Day",
      dateObj: new Date("2025-05-01"),
    },
    {
      id: 6,
      date: "July 04, 2025",
      day: "Friday",
      name: "Independence Day",
      dateObj: new Date("2025-07-04"),
    },
    {
      id: 7,
      date: "August 15, 2025",
      day: "Friday",
      name: "Independence Day (India)",
      dateObj: new Date("2025-08-15"),
    },
    {
      id: 8,
      date: "October 31, 2025",
      day: "Friday",
      name: "Halloween",
      dateObj: new Date("2025-10-31"),
    },
    {
      id: 9,
      date: "November 28, 2025",
      day: "Friday",
      name: "Thanksgiving Day",
      dateObj: new Date("2025-11-28"),
    },
    {
      id: 10,
      date: "December 25, 2025",
      day: "Thursday",
      name: "Christmas Day",
      dateObj: new Date("2025-12-25"),
    },
    {
      id: 11,
      date: "December 31, 2025",
      day: "Wednesday",
      name: "New Year's Eve",
      dateObj: new Date("2025-12-31"),
    },
  ];

  // Get current date for comparison
  const currentDate = new Date();
  const today = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Filter holidays based on search and active filter
  const filteredHolidays = holidaysData.filter((holiday) => {
    const matchesSearch =
      holiday.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      holiday.date.toLowerCase().includes(searchQuery.toLowerCase());

    // Compare holiday date with current date
    const holidayDate = new Date(
      holiday.dateObj.getFullYear(),
      holiday.dateObj.getMonth(),
      holiday.dateObj.getDate()
    );
    const isUpcoming = holidayDate >= today;
    const matchesFilter =
      activeFilter === "upcoming" ? isUpcoming : !isUpcoming;

    return matchesSearch && matchesFilter;
  });

  // Form handling functions
  const handleAddHoliday = () => {
    setShowAddHolidayModal(true);
  };

  const handleCloseModal = () => {
    setShowAddHolidayModal(false);
    setNewHoliday({
      name: "",
      date: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitHoliday = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("New holiday data:", newHoliday);
    // For now, just close the modal
    handleCloseModal();
  };

  const getFilterButtonClass = (filter) => {
    return activeFilter === filter
      ? "bg-[#5E17EB] text-white"
      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
  };

  return (
    <div className="flex h-screen bg-gray-50 font-['Space_Grotesk']">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Holidays</h1>
                <p className="text-gray-600 mt-2">All Holidays Lists</p>
              </div>
              <button
                onClick={handleAddHoliday}
                className="bg-[#5E17EB] hover:bg-[#4A0EC9] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>Add New Holiday</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveFilter("upcoming")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${getFilterButtonClass(
                      "upcoming"
                    )}`}
                  >
                    • Upcoming
                  </button>
                  <button
                    onClick={() => setActiveFilter("past")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${getFilterButtonClass(
                      "past"
                    )}`}
                  >
                    Past Holidays
                  </button>
                </div>
              </div>
            </div>

            {/* Holidays Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700">
                  <div>Date</div>
                  <div>Day</div>
                  <div>Holiday Name</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {filteredHolidays.length > 0 ? (
                  filteredHolidays.map((holiday) => (
                    <div
                      key={holiday.id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-3 gap-4 items-center">
                        {/* Date */}
                        <div>
                          <p className="text-gray-900 text-sm font-medium">
                            {holiday.date}
                          </p>
                        </div>

                        {/* Day */}
                        <div>
                          <p className="text-gray-600 text-sm">{holiday.day}</p>
                        </div>

                        {/* Holiday Name */}
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              activeFilter === "upcoming"
                                ? "text-[#5E17EB]"
                                : "text-gray-900"
                            }`}
                          >
                            {holiday.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-2 9a2 2 0 002 2h4a2 2 0 002-2l-2-9m-6 0h6"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No holidays found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add New Holiday Modal */}
      {showAddHolidayModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Add New Holiday
            </h2>

            <form onSubmit={handleSubmitHoliday} className="space-y-4">
              {/* Holiday Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Holiday Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newHoliday.name}
                  onChange={handleInputChange}
                  placeholder="Enter holiday name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                />
              </div>

              {/* Select Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={newHoliday.date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  required
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#5E17EB] text-white rounded-lg hover:bg-[#4A0EC9] transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holidays;
