const Employee = require('../models/Employee');

// @desc    Create training program
// @route   POST /api/training/programs
// @access  Private (HR roles)
const createTrainingProgram = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      duration,
      maxParticipants,
      startDate,
      endDate,
      instructor,
      materials = [],
      prerequisites = [],
      objectives = []
    } = req.body;

    const creator = await Employee.findOne({ user: req.user.id });

    const program = {
      id: Date.now().toString(),
      title,
      description,
      category, // technical, soft-skills, leadership, compliance, etc.
      duration, // in hours
      maxParticipants,
      currentParticipants: 0,
      schedule: {
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      },
      instructor: {
        name: instructor.name,
        email: instructor.email,
        bio: instructor.bio || ''
      },
      materials: materials.map(material => ({
        id: Date.now() + Math.random(),
        title: material.title,
        type: material.type, // document, video, quiz, etc.
        url: material.url || '',
        isRequired: material.isRequired || false
      })),
      prerequisites,
      objectives,
      status: 'active', // active, completed, cancelled
      participants: [],
      assessments: [],
      createdBy: {
        id: creator._id,
        name: `${creator.personalInfo.firstName} ${creator.personalInfo.lastName}`
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Training program created successfully',
      data: program
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get training programs
// @route   GET /api/training/programs
// @access  Private
const getTrainingPrograms = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      search
    } = req.query;

    // Mock data for demonstration
    const mockPrograms = [];

    res.status(200).json({
      success: true,
      count: mockPrograms.length,
      total: mockPrograms.length,
      page: parseInt(page),
      pages: Math.ceil(mockPrograms.length / limit),
      data: mockPrograms
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll in training program
// @route   POST /api/training/enroll/:programId
// @access  Private
const enrollInProgram = async (req, res, next) => {
  try {
    const { programId } = req.params;
    const { employeeId } = req.body;

    let targetEmployeeId;
    
    if (employeeId && ['super_admin', 'hr_manager', 'hr_coordinator', 'manager'].includes(req.user.role)) {
      targetEmployeeId = employeeId;
    } else {
      const employee = await Employee.findOne({ user: req.user.id });
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee profile not found'
        });
      }
      targetEmployeeId = employee._id;
    }

    const employee = await Employee.findById(targetEmployeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const enrollment = {
      id: Date.now().toString(),
      programId,
      employee: {
        id: employee._id,
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId,
        department: employee.department
      },
      enrollmentDate: new Date(),
      status: 'enrolled', // enrolled, in_progress, completed, dropped
      progress: 0,
      completionDate: null,
      certificateIssued: false,
      assessmentScores: []
    };

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in training program',
      data: enrollment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update training progress
// @route   PUT /api/training/progress/:enrollmentId
// @access  Private
const updateTrainingProgress = async (req, res, next) => {
  try {
    const { enrollmentId } = req.params;
    const { progress, completedMaterials, assessmentScore } = req.body;

    const updatedProgress = {
      enrollmentId,
      progress: Math.min(progress || 0, 100),
      completedMaterials: completedMaterials || [],
      assessmentScore: assessmentScore || null,
      lastUpdated: new Date(),
      status: progress >= 100 ? 'completed' : 'in_progress',
      completionDate: progress >= 100 ? new Date() : null
    };

    res.status(200).json({
      success: true,
      message: 'Training progress updated successfully',
      data: updatedProgress
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employee training history
// @route   GET /api/training/history/:employeeId
// @access  Private
const getTrainingHistory = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { status, category } = req.query;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check authorization
    const requestingEmployee = await Employee.findOne({ user: req.user.id });
    const canView = ['super_admin', 'hr_manager', 'hr_coordinator', 'manager'].includes(req.user.role) ||
                   (requestingEmployee && requestingEmployee._id.toString() === employeeId);

    if (!canView) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this training history'
      });
    }

    // Mock training history
    const trainingHistory = {
      employee: {
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId,
        department: employee.department
      },
      summary: {
        totalEnrollments: 0,
        completedPrograms: 0,
        inProgressPrograms: 0,
        totalHoursCompleted: 0,
        certificationsEarned: 0
      },
      enrollments: []
    };

    res.status(200).json({
      success: true,
      message: 'Training history retrieved successfully',
      data: trainingHistory
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create training assessment
// @route   POST /api/training/assessments
// @access  Private (HR roles)
const createTrainingAssessment = async (req, res, next) => {
  try {
    const {
      programId,
      title,
      description,
      questions,
      passingScore,
      timeLimit,
      attempts
    } = req.body;

    const creator = await Employee.findOne({ user: req.user.id });

    const assessment = {
      id: Date.now().toString(),
      programId,
      title,
      description,
      questions: questions.map(q => ({
        id: Date.now() + Math.random(),
        question: q.question,
        type: q.type, // multiple_choice, true_false, short_answer
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        points: q.points || 1
      })),
      settings: {
        passingScore: passingScore || 70,
        timeLimit: timeLimit || 60, // minutes
        maxAttempts: attempts || 3,
        shuffleQuestions: true
      },
      createdBy: {
        id: creator._id,
        name: `${creator.personalInfo.firstName} ${creator.personalInfo.lastName}`
      },
      createdAt: new Date(),
      isActive: true
    };

    res.status(201).json({
      success: true,
      message: 'Training assessment created successfully',
      data: assessment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit assessment attempt
// @route   POST /api/training/assessments/:assessmentId/submit
// @access  Private
const submitAssessment = async (req, res, next) => {
  try {
    const { assessmentId } = req.params;
    const { answers, timeSpent } = req.body;

    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    // Mock assessment submission
    const submission = {
      id: Date.now().toString(),
      assessmentId,
      employee: {
        id: employee._id,
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId
      },
      answers,
      timeSpent, // in minutes
      score: 0, // Would be calculated based on correct answers
      passed: false,
      submittedAt: new Date(),
      attemptNumber: 1
    };

    res.status(201).json({
      success: true,
      message: 'Assessment submitted successfully',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get training analytics
// @route   GET /api/training/analytics
// @access  Private (HR roles)
const getTrainingAnalytics = async (req, res, next) => {
  try {
    const { departmentId, startDate, endDate } = req.query;

    const analytics = {
      overview: {
        totalPrograms: 0,
        activePrograms: 0,
        totalEnrollments: 0,
        completionRate: 0,
        averageScore: 0
      },
      programPopularity: [],
      departmentParticipation: [],
      completionTrends: [],
      topPerformers: [],
      categoryBreakdown: {
        technical: { enrollments: 0, completions: 0 },
        leadership: { enrollments: 0, completions: 0 },
        compliance: { enrollments: 0, completions: 0 },
        soft_skills: { enrollments: 0, completions: 0 }
      }
    };

    res.status(200).json({
      success: true,
      message: 'Training analytics retrieved successfully',
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Issue certificate
// @route   POST /api/training/certificates
// @access  Private (HR roles)
const issueCertificate = async (req, res, next) => {
  try {
    const { enrollmentId, templateId } = req.body;

    const issuer = await Employee.findOne({ user: req.user.id });

    const certificate = {
      id: Date.now().toString(),
      enrollmentId,
      certificateNumber: `CERT-${Date.now()}`,
      templateId: templateId || 'default',
      issuedBy: {
        id: issuer._id,
        name: `${issuer.personalInfo.firstName} ${issuer.personalInfo.lastName}`,
        title: issuer.jobInfo.position
      },
      issuedAt: new Date(),
      validUntil: null, // Some certificates may have expiry
      status: 'active'
    };

    res.status(201).json({
      success: true,
      message: 'Certificate issued successfully',
      data: certificate
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTrainingProgram,
  getTrainingPrograms,
  enrollInProgram,
  updateTrainingProgress,
  getTrainingHistory,
  createTrainingAssessment,
  submitAssessment,
  getTrainingAnalytics,
  issueCertificate
};