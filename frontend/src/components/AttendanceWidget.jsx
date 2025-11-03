import React, { useState, useEffect } from 'react';
import { attendanceService } from '../services/attendanceService';
import { useAuth } from '../contexts/AuthContext';

const AttendanceWidget = ({ compact = false }) => {
  const { employee } = useAuth();
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch today's attendance status
  useEffect(() => {
    console.log('AttendanceWidget mounted, fetching today attendance...');
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching today attendance...');
      const response = await attendanceService.getTodayAttendance();
      console.log('Today attendance response:', response);
      setTodayAttendance(response.data);
    } catch (err) {
      console.error('Fetch attendance error:', err);
      setError(err.message);
      setTodayAttendance(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClockIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await attendanceService.clockIn();
      await fetchTodayAttendance(); // Refresh data
    } catch (err) {
      console.error('Clock in error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await attendanceService.clockOut();
      await fetchTodayAttendance(); // Refresh data
    } catch (err) {
      console.error('Clock out error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getWorkingHours = () => {
    if (!todayAttendance?.checkIn) return '0h 0m';
    
    const checkIn = new Date(todayAttendance.checkIn);
    const checkOut = todayAttendance.checkOut ? new Date(todayAttendance.checkOut) : new Date();
    
    const diff = checkOut - checkIn;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const getAttendanceStatus = () => {
    if (!todayAttendance) return 'not-clocked-in';
    if (todayAttendance.checkIn && !todayAttendance.checkOut) return 'clocked-in';
    if (todayAttendance.checkIn && todayAttendance.checkOut) return 'clocked-out';
    return 'not-clocked-in';
  };

  const status = getAttendanceStatus();

  if (loading && !todayAttendance) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-center h-16">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <p className="ml-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Attendance</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'clocked-in' ? 'bg-green-100 text-green-800' :
            status === 'clocked-out' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status === 'clocked-in' ? 'Working' :
             status === 'clocked-out' ? 'Completed' : 'Not Started'}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-2">
          {formatTime(currentTime)}
        </div>
        
        {status === 'not-clocked-in' && (
          <button
            onClick={handleClockIn}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Clock In'}
          </button>
        )}
        
        {status === 'clocked-in' && (
          <div className="space-y-2">
            <div className="text-xs text-gray-600">
              Working: {getWorkingHours()}
            </div>
            <button
              onClick={handleClockOut}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Clock Out'}
            </button>
          </div>
        )}
        
        {status === 'clocked-out' && (
          <div className="text-xs text-gray-600">
            Worked: {getWorkingHours()}
          </div>
        )}
        
        {error && (
          <div className="text-xs text-red-600 mt-2">{error}</div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-4 w-4 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-xs text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'clocked-in' ? 'bg-green-100 text-green-800' :
          status === 'clocked-out' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status === 'clocked-in' ? 'Currently Working' :
           status === 'clocked-out' ? 'Day Completed' : 'Not Clocked In'}
        </div>
      </div>

      {/* Current Time Display */}
      <div className="text-center mb-6">
        <div className="text-3xl font-mono font-bold text-gray-900 mb-1">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-gray-500">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Clock In/Out Buttons */}
      <div className="flex gap-3 mb-6">
        {status === 'not-clocked-in' && (
          <button
            onClick={handleClockIn}
            disabled={loading}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {loading ? 'Clocking In...' : 'Clock In'}
          </button>
        )}
        
        {status === 'clocked-in' && (
          <button
            onClick={handleClockOut}
            disabled={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {loading ? 'Clocking Out...' : 'Clock Out'}
          </button>
        )}
      </div>

      {/* Today's Summary */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Today's Summary</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Clock In</div>
            <div className="text-lg font-semibold text-gray-900">
              {todayAttendance?.checkIn ? formatTime(todayAttendance.checkIn) : '--:--'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Clock Out</div>
            <div className="text-lg font-semibold text-gray-900">
              {todayAttendance?.checkOut ? formatTime(todayAttendance.checkOut) : '--:--'}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500">Working Hours</div>
          <div className="text-xl font-bold text-blue-600">
            {getWorkingHours()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceWidget;