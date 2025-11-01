const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./src/models/User');
const Employee = require('./src/models/Employee');
const Department = require('./src/models/Department');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Department.deleteMany({});
    
    console.log('📤 Cleared existing data...');

    // Create Departments
    const departments = await Department.insertMany([
      {
        name: 'Human Resources',
        code: 'HR',
        description: 'Human Resources Department',
        location: 'Building A, Floor 2',
        budget: { annual: 500000, spent: 0 }
      },
      {
        name: 'Engineering',
        code: 'ENG',
        description: 'Software Engineering Department',
        location: 'Building B, Floor 3-5',
        budget: { annual: 2000000, spent: 0 }
      },
      {
        name: 'Marketing',
        code: 'MKT',
        description: 'Marketing and Sales Department',
        location: 'Building A, Floor 3',
        budget: { annual: 800000, spent: 0 }
      },
      {
        name: 'Finance',
        code: 'FIN',
        description: 'Finance and Accounting Department',
        location: 'Building A, Floor 1',
        budget: { annual: 600000, spent: 0 }
      },
      {
        name: 'Operations',
        code: 'OPS',
        description: 'Operations and Logistics Department',
        location: 'Building C, Floor 1-2',
        budget: { annual: 1200000, spent: 0 }
      }
    ]);

    console.log('🏢 Created departments...');

    // Create Users and Employees
    const userData = [
      // Super Admin
      {
        email: 'admin@corvex.com',
        password: 'Admin123!',
        role: 'super_admin',
        personalInfo: {
          firstName: 'System',
          lastName: 'Administrator',
          dateOfBirth: new Date('1985-01-15'),
          gender: 'prefer_not_to_say',
          nationality: 'US',
          phone: '+1-555-0001',
          emergencyContact: {
            name: 'Emergency Admin',
            relationship: 'Company',
            phone: '+1-555-0000'
          }
        },
        jobInfo: {
          department: departments[0]._id, // HR
          position: 'System Administrator',
          level: 'executive',
          hireDate: new Date('2020-01-01'),
          employmentType: 'full_time',
          workLocation: 'office'
        },
        compensation: {
          salary: { amount: 150000, currency: 'USD', frequency: 'yearly' }
        }
      },
      // HR Manager
      {
        email: 'hr.manager@corvex.com',
        password: 'HRManager123!',
        role: 'hr_manager',
        personalInfo: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          dateOfBirth: new Date('1988-03-22'),
          gender: 'female',
          nationality: 'US',
          phone: '+1-555-0002',
          emergencyContact: {
            name: 'Michael Johnson',
            relationship: 'Spouse',
            phone: '+1-555-0102'
          }
        },
        jobInfo: {
          department: departments[0]._id, // HR
          position: 'HR Manager',
          level: 'manager',
          hireDate: new Date('2021-02-15'),
          employmentType: 'full_time',
          workLocation: 'office'
        },
        compensation: {
          salary: { amount: 95000, currency: 'USD', frequency: 'yearly' }
        }
      },
      // HR Coordinator
      {
        email: 'hr.coordinator@corvex.com',
        password: 'HRCoord123!',
        role: 'hr_coordinator',
        personalInfo: {
          firstName: 'Mike',
          lastName: 'Chen',
          dateOfBirth: new Date('1992-07-10'),
          gender: 'male',
          nationality: 'US',
          phone: '+1-555-0003',
          emergencyContact: {
            name: 'Lisa Chen',
            relationship: 'Sister',
            phone: '+1-555-0103'
          }
        },
        jobInfo: {
          department: departments[0]._id, // HR
          position: 'HR Coordinator',
          level: 'mid',
          hireDate: new Date('2022-05-01'),
          employmentType: 'full_time',
          workLocation: 'hybrid'
        },
        compensation: {
          salary: { amount: 65000, currency: 'USD', frequency: 'yearly' }
        }
      },
      // Engineering Manager
      {
        email: 'manager@corvex.com',
        password: 'Manager123!',
        role: 'manager',
        personalInfo: {
          firstName: 'Emily',
          lastName: 'Davis',
          dateOfBirth: new Date('1986-11-05'),
          gender: 'female',
          nationality: 'US',
          phone: '+1-555-0004',
          emergencyContact: {
            name: 'James Davis',
            relationship: 'Spouse',
            phone: '+1-555-0104'
          }
        },
        jobInfo: {
          department: departments[1]._id, // Engineering
          position: 'Engineering Manager',
          level: 'manager',
          hireDate: new Date('2020-08-15'),
          employmentType: 'full_time',
          workLocation: 'office'
        },
        compensation: {
          salary: { amount: 125000, currency: 'USD', frequency: 'yearly' }
        }
      },
      // Software Engineer
      {
        email: 'employee@corvex.com',
        password: 'Employee123!',
        role: 'employee',
        personalInfo: {
          firstName: 'John',
          lastName: 'Smith',
          dateOfBirth: new Date('1995-04-18'),
          gender: 'male',
          nationality: 'US',
          phone: '+1-555-0005',
          emergencyContact: {
            name: 'Mary Smith',
            relationship: 'Mother',
            phone: '+1-555-0105'
          }
        },
        jobInfo: {
          department: departments[1]._id, // Engineering
          position: 'Software Engineer',
          level: 'mid',
          hireDate: new Date('2023-01-10'),
          employmentType: 'full_time',
          workLocation: 'remote'
        },
        compensation: {
          salary: { amount: 85000, currency: 'USD', frequency: 'yearly' }
        }
      },
      // Recruiter
      {
        email: 'recruiter@corvex.com',
        password: 'Recruiter123!',
        role: 'recruiter',
        personalInfo: {
          firstName: 'Lisa',
          lastName: 'Wilson',
          dateOfBirth: new Date('1990-12-03'),
          gender: 'female',
          nationality: 'US',
          phone: '+1-555-0006',
          emergencyContact: {
            name: 'Robert Wilson',
            relationship: 'Father',
            phone: '+1-555-0106'
          }
        },
        jobInfo: {
          department: departments[0]._id, // HR
          position: 'Senior Recruiter',
          level: 'senior',
          hireDate: new Date('2022-03-20'),
          employmentType: 'full_time',
          workLocation: 'hybrid'
        },
        compensation: {
          salary: { amount: 75000, currency: 'USD', frequency: 'yearly' }
        }
      },
      // Marketing Manager
      {
        email: 'marketing.manager@corvex.com',
        password: 'Marketing123!',
        role: 'manager',
        personalInfo: {
          firstName: 'Alex',
          lastName: 'Rodriguez',
          dateOfBirth: new Date('1989-06-25'),
          gender: 'male',
          nationality: 'US',
          phone: '+1-555-0007',
          emergencyContact: {
            name: 'Maria Rodriguez',
            relationship: 'Spouse',
            phone: '+1-555-0107'
          }
        },
        jobInfo: {
          department: departments[2]._id, // Marketing
          position: 'Marketing Manager',
          level: 'manager',
          hireDate: new Date('2021-09-01'),
          employmentType: 'full_time',
          workLocation: 'office'
        },
        compensation: {
          salary: { amount: 90000, currency: 'USD', frequency: 'yearly' }
        }
      },
      // Finance Manager
      {
        email: 'finance.manager@corvex.com',
        password: 'Finance123!',
        role: 'manager',
        personalInfo: {
          firstName: 'David',
          lastName: 'Thompson',
          dateOfBirth: new Date('1983-09-12'),
          gender: 'male',
          nationality: 'US',
          phone: '+1-555-0008',
          emergencyContact: {
            name: 'Jennifer Thompson',
            relationship: 'Spouse',
            phone: '+1-555-0108'
          }
        },
        jobInfo: {
          department: departments[3]._id, // Finance
          position: 'Finance Manager',
          level: 'manager',
          hireDate: new Date('2019-11-15'),
          employmentType: 'full_time',
          workLocation: 'office'
        },
        compensation: {
          salary: { amount: 110000, currency: 'USD', frequency: 'yearly' }
        }
      }
    ];

    // Create users and employees
    let employeeCounter = 1;
    for (const data of userData) {
      // Create user
      const user = await User.create({
        email: data.email,
        password: data.password,
        role: data.role,
        isActive: true,
        isEmailVerified: true
      });

      // Create employee profile
      const employee = await Employee.create({
        user: user._id,
        employeeId: `EMP${new Date().getFullYear()}${String(employeeCounter).padStart(4, '0')}`,
        personalInfo: data.personalInfo,
        jobInfo: data.jobInfo,
        compensation: data.compensation,
        status: 'active'
      });

      employeeCounter++;
      console.log(`👤 Created user: ${data.email} (${data.role}) - ${employee.employeeId}`);
    }

    // Update department employee counts
    for (const dept of departments) {
      const employeeCount = await Employee.countDocuments({ 
        'jobInfo.department': dept._id,
        status: 'active'
      });
      await Department.findByIdAndUpdate(dept._id, { employeeCount });
    }

    console.log('🎉 Database seeding completed!');
    console.log('\n📋 Created Accounts:');
    console.log('================================');
    userData.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}`);
      console.log(`Role: ${user.role}`);
      console.log(`Name: ${user.personalInfo.firstName} ${user.personalInfo.lastName}`);
      console.log('---');
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run seeding
const runSeed = async () => {
  await connectDB();
  await seedDatabase();
};

runSeed();