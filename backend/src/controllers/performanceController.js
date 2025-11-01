const Employee = require('../models/Employee');

// @desc    Create performance review
// @route   POST /api/performance/reviews
// @access  Private (HR roles and managers)
const createPerformanceReview = async (req, res, next) => {
  try {
    const {
      employeeId,
      reviewType,
      reviewPeriodStart,
      reviewPeriodEnd,
      goals = [],
      competencies = [],
      comments = ''
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const reviewer = await Employee.findOne({ user: req.user.id });
    
    const review = {
      id: Date.now().toString(),
      employee: {
        id: employee._id,
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId,
        department: employee.department,
        position: employee.jobInfo.position
      },
      reviewer: {
        id: reviewer._id,
        name: `${reviewer.personalInfo.firstName} ${reviewer.personalInfo.lastName}`,
        employeeId: reviewer.employeeId
      },
      reviewType, // annual, quarterly, probation, etc.
      reviewPeriod: {
        start: new Date(reviewPeriodStart),
        end: new Date(reviewPeriodEnd)
      },
      goals: goals.map(goal => ({
        id: Date.now() + Math.random(),
        title: goal.title,
        description: goal.description,
        targetDate: goal.targetDate,
        status: goal.status || 'not_started',
        rating: goal.rating || null,
        comments: goal.comments || ''
      })),
      competencies: competencies.map(comp => ({
        id: Date.now() + Math.random(),
        name: comp.name,
        rating: comp.rating, // 1-5 scale
        comments: comp.comments || ''
      })),
      overallRating: null,
      comments,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // In a real implementation, this would be saved to a Performance collection
    // For now, we'll return the created review
    
    res.status(201).json({
      success: true,
      message: 'Performance review created successfully',
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get performance reviews
// @route   GET /api/performance/reviews
// @access  Private
const getPerformanceReviews = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      employeeId,
      reviewType,
      status,
      startDate,
      endDate
    } = req.query;

    // Mock data for demonstration
    // In a real implementation, this would query a Performance collection
    const mockReviews = [];

    res.status(200).json({
      success: true,
      count: mockReviews.length,
      total: mockReviews.length,
      page: parseInt(page),
      pages: Math.ceil(mockReviews.length / limit),
      data: mockReviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update performance review
// @route   PUT /api/performance/reviews/:id
// @access  Private (HR roles and managers)
const updatePerformanceReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // In a real implementation, this would update the review in the database
    const updatedReview = {
      id,
      ...updateData,
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      message: 'Performance review updated successfully',
      data: updatedReview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Set performance goals
// @route   POST /api/performance/goals
// @access  Private (HR roles and managers)
const setPerformanceGoals = async (req, res, next) => {
  try {
    const {
      employeeId,
      goals,
      reviewCycle,
      targetQuarter,
      targetYear
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const goalSet = {
      id: Date.now().toString(),
      employee: {
        id: employee._id,
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId
      },
      reviewCycle,
      targetQuarter,
      targetYear,
      goals: goals.map(goal => ({
        id: Date.now() + Math.random(),
        title: goal.title,
        description: goal.description,
        category: goal.category, // performance, learning, project, etc.
        priority: goal.priority, // high, medium, low
        targetDate: goal.targetDate,
        metrics: goal.metrics || [],
        status: 'not_started',
        progress: 0,
        createdAt: new Date()
      })),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Performance goals set successfully',
      data: goalSet
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update goal progress
// @route   PUT /api/performance/goals/:goalId
// @access  Private
const updateGoalProgress = async (req, res, next) => {
  try {
    const { goalId } = req.params;
    const { progress, status, comments, completedDate } = req.body;

    // In a real implementation, this would update the goal in the database
    const updatedGoal = {
      id: goalId,
      progress: progress || 0,
      status: status || 'in_progress',
      comments: comments || '',
      completedDate: completedDate || null,
      lastUpdated: new Date()
    };

    res.status(200).json({
      success: true,
      message: 'Goal progress updated successfully',
      data: updatedGoal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get performance analytics
// @route   GET /api/performance/analytics
// @access  Private (HR roles and managers)
const getPerformanceAnalytics = async (req, res, next) => {
  try {
    const { departmentId, quarter, year } = req.query;

    // Mock analytics data
    const analytics = {
      overview: {
        totalEmployees: 0,
        reviewsCompleted: 0,
        reviewsPending: 0,
        averageRating: 0,
        goalCompletionRate: 0
      },
      ratingDistribution: {
        excellent: 0, // 4.5-5.0
        good: 0,      // 3.5-4.4
        average: 0,   // 2.5-3.4
        below_average: 0, // 1.5-2.4
        poor: 0       // 1.0-1.4
      },
      departmentPerformance: [],
      topPerformers: [],
      improvementAreas: [],
      goalCategories: {
        performance: { total: 0, completed: 0 },
        learning: { total: 0, completed: 0 },
        project: { total: 0, completed: 0 },
        leadership: { total: 0, completed: 0 }
      }
    };

    res.status(200).json({
      success: true,
      message: 'Performance analytics retrieved successfully',
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employee performance dashboard
// @route   GET /api/performance/dashboard/:employeeId
// @access  Private
const getEmployeePerformanceDashboard = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

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
        message: 'Not authorized to view this performance dashboard'
      });
    }

    const dashboard = {
      employee: {
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId,
        department: employee.department,
        position: employee.jobInfo.position,
        joiningDate: employee.jobInfo.startDate
      },
      currentPeriod: {
        quarter: Math.ceil((new Date().getMonth() + 1) / 3),
        year: new Date().getFullYear()
      },
      overallRating: null,
      goals: {
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        completionRate: 0
      },
      competencies: [],
      recentReviews: [],
      upcomingDeadlines: [],
      achievements: [],
      developmentAreas: []
    };

    res.status(200).json({
      success: true,
      message: 'Performance dashboard retrieved successfully',
      data: dashboard
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit self-assessment
// @route   POST /api/performance/self-assessment
// @access  Private
const submitSelfAssessment = async (req, res, next) => {
  try {
    const {
      reviewId,
      competencyRatings,
      goalAssessments,
      achievements,
      challenges,
      developmentNeeds,
      overallComments
    } = req.body;

    const employee = await Employee.findOne({ user: req.user.id });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee profile not found'
      });
    }

    const selfAssessment = {
      id: Date.now().toString(),
      reviewId,
      employee: {
        id: employee._id,
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId
      },
      competencyRatings: competencyRatings || [],
      goalAssessments: goalAssessments || [],
      achievements: achievements || '',
      challenges: challenges || '',
      developmentNeeds: developmentNeeds || '',
      overallComments: overallComments || '',
      submittedAt: new Date()
    };

    res.status(201).json({
      success: true,
      message: 'Self-assessment submitted successfully',
      data: selfAssessment
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPerformanceReview,
  getPerformanceReviews,
  updatePerformanceReview,
  setPerformanceGoals,
  updateGoalProgress,
  getPerformanceAnalytics,
  getEmployeePerformanceDashboard,
  submitSelfAssessment
};