// Comprehensive HR system mock data
export const hrSystemData = {
  // Interview candidates and management
  candidates: [
    {
      id: 'CND001',
      name: 'Alice Thompson',
      email: 'alice.thompson@email.com',
      phone: '+1 234-567-8901',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      experience: '5 years',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      resumeUrl: '#',
      appliedDate: '2024-01-10',
      source: 'LinkedIn',
      status: 'Interview Scheduled',
      expectedSalary: '$85,000',
      notes: 'Strong technical background with excellent communication skills',
      interviews: [
        {
          id: 'INT001',
          type: 'Technical Screening',
          interviewer: 'John Smith',
          date: '2024-01-15',
          time: '10:00 AM',
          duration: '60 minutes',
          status: 'Scheduled',
          feedback: null
        }
      ]
    },
    {
      id: 'CND002',
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '+1 234-567-8902',
      position: 'Product Manager',
      department: 'Product',
      experience: '7 years',
      skills: ['Product Strategy', 'Data Analysis', 'Agile', 'User Research'],
      resumeUrl: '#',
      appliedDate: '2024-01-08',
      source: 'Company Website',
      status: 'Under Review',
      expectedSalary: '$95,000',
      notes: 'Excellent product sense with strong analytical skills'
    },
    {
      id: 'CND003',
      name: 'Sarah Martinez',
      email: 'sarah.martinez@email.com',
      phone: '+1 234-567-8903',
      position: 'UX Designer',
      department: 'Design',
      experience: '4 years',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      resumeUrl: '#',
      appliedDate: '2024-01-12',
      source: 'Employee Referral',
      status: 'Offer Extended',
      expectedSalary: '$70,000',
      notes: 'Creative designer with strong user-centered design approach'
    }
  ],

  // Interview data
  interviews: [
    {
      id: 'INT001',
      candidateId: 'CND001',
      candidateName: 'Alice Thompson',
      position: 'Senior Frontend Developer',
      type: 'Technical Screening',
      interviewer: 'John Smith',
      interviewerRole: 'Senior Developer',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '60 minutes',
      status: 'Scheduled',
      format: 'Video Call',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      feedback: null,
      rating: null,
      notes: ''
    },
    {
      id: 'INT002',
      candidateId: 'CND002',
      candidateName: 'Robert Chen',
      position: 'Product Manager',
      type: 'HR Screening',
      interviewer: 'Lisa Wong',
      interviewerRole: 'HR Manager',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '45 minutes',
      status: 'Completed',
      format: 'In Person',
      feedback: 'Excellent communication skills and relevant experience',
      rating: 4.5,
      notes: 'Strong candidate, proceed to next round'
    }
  ],

  // Performance reviews and ratings
  performanceReviews: [
    {
      id: 'PR001',
      employeeId: '34535131',
      employeeName: 'Priya Sharma',
      reviewPeriod: 'Q4 2023',
      reviewDate: '2024-01-10',
      reviewer: 'Rajesh Kumar',
      overallRating: 4.2,
      categories: {
        technical: 4.5,
        communication: 4.0,
        teamwork: 4.3,
        leadership: 3.8,
        problemSolving: 4.4
      },
      strengths: [
        'Excellent design skills',
        'Strong attention to detail',
        'Collaborative team player'
      ],
      improvements: [
        'Public speaking confidence',
        'Project management skills'
      ],
      goals: [
        'Complete UX certification',
        'Lead a major design project',
        'Mentor junior designers'
      ],
      comments: 'Priya has shown exceptional growth in her design capabilities and is ready for increased responsibilities.'
    },
    {
      id: 'PR002',
      employeeId: '09746406',
      employeeName: 'Arjun Patel',
      reviewPeriod: 'Q4 2023',
      reviewDate: '2024-01-12',
      reviewer: 'Tech Lead',
      overallRating: 4.0,
      categories: {
        technical: 4.2,
        communication: 3.8,
        teamwork: 4.1,
        leadership: 3.5,
        problemSolving: 4.3
      },
      strengths: [
        'Strong PHP development skills',
        'Quick learner',
        'Reliable delivery'
      ],
      improvements: [
        'Cross-team communication',
        'Documentation practices'
      ],
      goals: [
        'Learn React framework',
        'Improve code review process',
        'Contribute to architecture decisions'
      ],
      comments: 'Arjun is a solid developer with room for growth in communication and leadership.'
    }
  ],

  // Training courses and programs
  trainingPrograms: [
    {
      id: 'TRN001',
      title: 'Leadership Development Program',
      description: 'Comprehensive leadership training for managers and senior staff',
      category: 'Leadership',
      instructor: 'Michael Chen',
      duration: '6 weeks',
      format: 'Hybrid',
      capacity: 20,
      enrolled: 15,
      startDate: '2024-02-01',
      endDate: '2024-03-15',
      schedule: 'Tuesdays & Thursdays, 2:00 PM - 4:00 PM',
      prerequisites: 'Minimum 2 years management experience',
      learningObjectives: [
        'Develop effective leadership strategies',
        'Improve team communication',
        'Master conflict resolution',
        'Build high-performing teams'
      ],
      materials: [
        'Leadership Handbook',
        'Case Study Collection',
        'Online Assessment Tools'
      ],
      cost: '$1,200',
      status: 'Open for Registration'
    },
    {
      id: 'TRN002',
      title: 'Advanced React Development',
      description: 'Deep dive into React hooks, state management, and performance optimization',
      category: 'Technical',
      instructor: 'Sarah Johnson',
      duration: '4 weeks',
      format: 'Online',
      capacity: 25,
      enrolled: 22,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      schedule: 'Self-paced with weekly check-ins',
      prerequisites: 'Basic React knowledge required',
      learningObjectives: [
        'Master React hooks and context',
        'Implement advanced state management',
        'Optimize component performance',
        'Build scalable applications'
      ],
      materials: [
        'Video Lectures',
        'Coding Exercises',
        'Project Templates'
      ],
      cost: '$800',
      status: 'In Progress'
    }
  ],

  // Leave requests and time-off data
  leaveRequests: [
    {
      id: 'LV001',
      employeeId: '34535131',
      employeeName: 'Priya Sharma',
      type: 'Annual Leave',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      totalDays: 6,
      reason: 'Family vacation',
      appliedDate: '2024-01-10',
      status: 'Approved',
      approvedBy: 'Rajesh Kumar',
      approvalDate: '2024-01-12',
      comments: 'Enjoy your vacation!'
    },
    {
      id: 'LV002',
      employeeId: '09746406',
      employeeName: 'Arjun Patel',
      type: 'Sick Leave',
      startDate: '2024-01-18',
      endDate: '2024-01-19',
      totalDays: 2,
      reason: 'Medical appointment',
      appliedDate: '2024-01-17',
      status: 'Pending',
      approvedBy: null,
      approvalDate: null,
      comments: 'Medical certificate required'
    }
  ],

  // Project data for time tracking
  projects: [
    {
      id: 'PRJ001',
      name: 'E-commerce Platform Redesign',
      description: 'Complete redesign of the company e-commerce platform',
      client: 'Internal',
      manager: 'Sarah Johnson',
      status: 'Active',
      priority: 'High',
      startDate: '2024-01-01',
      endDate: '2024-04-30',
      budget: '$150,000',
      spent: '$75,000',
      progress: 65,
      team: [
        { id: '34535131', name: 'Priya Sharma', role: 'Lead Designer', allocation: 80 },
        { id: '09746406', name: 'Arjun Patel', role: 'Frontend Developer', allocation: 100 },
        { id: '12345678', name: 'John Smith', role: 'Backend Developer', allocation: 75 }
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      milestones: [
        { name: 'Design Phase', date: '2024-02-01', status: 'Completed' },
        { name: 'Development Phase 1', date: '2024-03-01', status: 'In Progress' },
        { name: 'Testing Phase', date: '2024-04-01', status: 'Pending' },
        { name: 'Deployment', date: '2024-04-30', status: 'Pending' }
      ]
    },
    {
      id: 'PRJ002',
      name: 'Mobile App Development',
      description: 'Native mobile application for customer engagement',
      client: 'ABC Corporation',
      manager: 'Mike Davis',
      status: 'Active',
      priority: 'Medium',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      budget: '$200,000',
      spent: '$45,000',
      progress: 30,
      team: [
        { id: '87654321', name: 'Emily Chen', role: 'Mobile Developer', allocation: 100 },
        { id: '11223344', name: 'David Miller', role: 'UI/UX Designer', allocation: 60 }
      ],
      technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      milestones: [
        { name: 'Requirements Gathering', date: '2024-02-01', status: 'Completed' },
        { name: 'UI/UX Design', date: '2024-02-20', status: 'In Progress' },
        { name: 'Core Development', date: '2024-04-01', status: 'Pending' },
        { name: 'Testing & Deployment', date: '2024-05-15', status: 'Pending' }
      ]
    }
  ],

  // Timesheet data
  timesheets: [
    {
      id: 'TS001',
      employeeId: '34535131',
      employeeName: 'Priya Sharma',
      weekEnding: '2024-01-19',
      entries: [
        { day: 'Monday', project: 'PRJ001', hours: 8, description: 'UI mockups for product pages' },
        { day: 'Tuesday', project: 'PRJ001', hours: 7.5, description: 'User research and analysis' },
        { day: 'Wednesday', project: 'PRJ001', hours: 8, description: 'Wireframe creation' },
        { day: 'Thursday', project: 'PRJ002', hours: 4, description: 'Mobile UI consultation' },
        { day: 'Thursday', project: 'PRJ001', hours: 4, description: 'Design system updates' },
        { day: 'Friday', project: 'PRJ001', hours: 8, description: 'Prototype development' }
      ],
      totalHours: 39.5,
      status: 'Submitted',
      submittedDate: '2024-01-19'
    }
  ],

  // Company assets
  assets: [
    {
      id: 'AST001',
      name: 'MacBook Pro 16"',
      category: 'Laptop',
      brand: 'Apple',
      model: 'M3 Pro',
      serialNumber: 'MBP2024001',
      purchaseDate: '2024-01-01',
      warrantyExpiry: '2027-01-01',
      value: '$2,999',
      assignedTo: '34535131',
      assigneeName: 'Priya Sharma',
      department: 'Design',
      status: 'In Use',
      condition: 'Excellent',
      location: 'Bangalore Office',
      vendor: 'Apple Store',
      invoiceNumber: 'INV-2024-001'
    },
    {
      id: 'AST002',
      name: 'Dell UltraSharp Monitor',
      category: 'Monitor',
      brand: 'Dell',
      model: 'U2723QE',
      serialNumber: 'DM27001',
      purchaseDate: '2024-01-05',
      warrantyExpiry: '2026-01-05',
      value: '$599',
      assignedTo: '09746406',
      assigneeName: 'Arjun Patel',
      department: 'Development',
      status: 'In Use',
      condition: 'Good',
      location: 'Bangalore Office',
      vendor: 'Dell Technologies',
      invoiceNumber: 'INV-2024-002'
    }
  ],

  // HR insights and analytics data
  hrMetrics: {
    workforce: {
      totalEmployees: 247,
      newHires: {
        thisMonth: 8,
        lastMonth: 12,
        thisYear: 45
      },
      attrition: {
        thisMonth: 3,
        lastMonth: 5,
        thisYear: 18,
        rate: 7.3
      },
      demographics: {
        ageGroups: {
          '20-25': 45,
          '26-30': 89,
          '31-35': 67,
          '36-40': 32,
          '40+': 14
        },
        gender: {
          male: 128,
          female: 114,
          other: 5
        },
        departments: {
          Engineering: 89,
          Design: 34,
          Marketing: 28,
          Sales: 45,
          HR: 12,
          Finance: 15,
          Operations: 24
        }
      }
    },
    performance: {
      averageRating: 4.1,
      distributionByRating: {
        '5.0': 23,
        '4.5-4.9': 67,
        '4.0-4.4': 89,
        '3.5-3.9': 45,
        '3.0-3.4': 18,
        'Below 3.0': 5
      },
      goalsCompletion: 78,
      trainingCompletion: 85
    },
    recruitment: {
      openPositions: 23,
      candidatesInPipeline: 156,
      averageTimeToHire: 32,
      offerAcceptanceRate: 87,
      sourceEffectiveness: {
        'LinkedIn': 35,
        'Company Website': 28,
        'Employee Referral': 45,
        'Job Boards': 23,
        'Recruitment Agencies': 15
      }
    }
  }
};

export default hrSystemData;