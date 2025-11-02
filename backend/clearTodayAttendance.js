const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Attendance = require('./src/models/Attendance');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for clearing today\'s data...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const clearTodayAttendance = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    console.log('Clearing attendance records for today:', today.toDateString());
    
    const result = await Attendance.deleteMany({
      date: {
        $gte: today,
        $lt: tomorrow
      }
    });

    console.log(`Deleted ${result.deletedCount} attendance records for today`);
    console.log('Now you can test fresh attendance marking!');

  } catch (error) {
    console.error('Error clearing today\'s attendance:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run clearing
const runClear = async () => {
  await connectDB();
  await clearTodayAttendance();
};

runClear();