const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Employee = require('./src/models/Employee');
const Attendance = require('./src/models/Attendance');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for attendance seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const getRandomTime = (baseHour, minuteVariation = 30) => {
  const date = new Date();
  date.setHours(baseHour, Math.floor(Math.random() * minuteVariation), 0, 0);
  return date;
};

const getRandomStatus = () => {
  const statuses = ['present', 'late', 'present', 'present', 'present']; // Weighted towards present
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const seedAttendance = async () => {
  try {
    // Clear existing attendance data
    await Attendance.deleteMany({});
    console.log('📤 Cleared existing attendance data...');

    // Get all active employees
    const employees = await Employee.find({ status: 'active' });
    console.log(`👥 Found ${employees.length} employees`);

    const attendanceRecords = [];
    
    // Generate attendance for the last 30 days
    const today = new Date();
    const daysToGenerate = 30;

    for (let dayOffset = 0; dayOffset < daysToGenerate; dayOffset++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - dayOffset);
      
      // Skip weekends
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        continue;
      }

      for (const employee of employees) {
        // 95% chance of having attendance record (some days off)
        if (Math.random() < 0.95) {
          const status = getRandomStatus();
          
          // Set check-in time based on status
          const checkInDate = new Date(currentDate);
          let checkInHour = 9; // Standard start time
          
          if (status === 'late') {
            checkInHour = 9 + Math.random() * 2; // 9-11 AM for late arrivals
          } else {
            checkInHour = 8.5 + Math.random() * 1; // 8:30-9:30 AM for on-time
          }
          
          checkInDate.setHours(
            Math.floor(checkInHour),
            Math.floor((checkInHour % 1) * 60),
            0,
            0
          );

          // Set check-out time (8-9 hours after check-in)
          const checkOutDate = new Date(checkInDate);
          const workingHours = 8 + Math.random(); // 8-9 hours
          checkOutDate.setTime(checkInDate.getTime() + (workingHours * 60 * 60 * 1000));

          // Calculate actual working hours
          const actualWorkingHours = (checkOutDate - checkInDate) / (1000 * 60 * 60);

          const attendanceRecord = {
            employee: employee._id,
            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
            checkIn: {
              time: checkInDate,
              location: {
                type: 'Point',
                coordinates: [-74.006, 40.7128] // NYC coordinates
              },
              method: Math.random() > 0.5 ? 'web' : 'mobile'
            },
            checkOut: {
              time: checkOutDate,
              location: {
                type: 'Point',
                coordinates: [-74.006, 40.7128]
              },
              method: Math.random() > 0.5 ? 'web' : 'mobile'
            },
            breaks: [
              {
                startTime: new Date(checkInDate.getTime() + (4 * 60 * 60 * 1000)), // 4 hours after start
                endTime: new Date(checkInDate.getTime() + (4.5 * 60 * 60 * 1000)), // 30 min lunch
                type: 'lunch',
                duration: 30
              }
            ],
            workingHours: actualWorkingHours - 0.5, // Subtract lunch break
            overtime: Math.max(0, actualWorkingHours - 8.5),
            status: status,
            lateArrival: status === 'late',
            earlyDeparture: false,
            isManualEntry: false
          };

          attendanceRecords.push(attendanceRecord);
        }
      }
    }

    // Add today's attendance for some employees (partial day)
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    // Add partial attendance for today for some employees
    for (let i = 0; i < Math.min(3, employees.length); i++) {
      const employee = employees[i];
      const checkInTime = new Date();
      checkInTime.setHours(9, Math.floor(Math.random() * 30), 0, 0);
      
      const todayAttendance = {
        employee: employee._id,
        date: todayDate,
        checkIn: {
          time: checkInTime,
          location: {
            type: 'Point',
            coordinates: [-74.006, 40.7128]
          },
          method: 'web'
        },
        checkOut: {
          time: null // Not checked out yet
        },
        breaks: [],
        workingHours: 0,
        overtime: 0,
        status: 'present',
        lateArrival: false,
        earlyDeparture: false,
        isManualEntry: false
      };
      
      attendanceRecords.push(todayAttendance);
    }

    // Insert all attendance records
    await Attendance.insertMany(attendanceRecords);
    
    console.log(`✅ Created ${attendanceRecords.length} attendance records`);
    console.log('🎉 Attendance seeding completed!');

  } catch (error) {
    console.error('Attendance seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding
const runAttendanceSeed = async () => {
  await connectDB();
  await seedAttendance();
};

runAttendanceSeed();