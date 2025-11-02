const Interview = require('../models/Interview');
const Candidate = require('../models/Candidate');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

// Create a new candidate
const createCandidate = async (req, res) => {
  try {
    const candidateData = req.body;
    
    // Check if candidate with email already exists
    const existingCandidate = await Candidate.findOne({ 
      'personalInfo.email': candidateData.personalInfo.email 
    });
    
    if (existingCandidate) {
      return res.status(400).json({
        success: false,
        message: 'Candidate with this email already exists'
      });
    }

    const candidate = new Candidate(candidateData);
    await candidate.save();

    await candidate.populate('applicationInfo.department');
    
    res.status(201).json({
      success: true,
      message: 'Candidate created successfully',
      data: candidate
    });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating candidate',
      error: error.message
    });
  }
};

// Get all candidates with filtering
const getAllCandidates = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      position,
      department,
      stage,
      status,
      search
    } = req.query;

    const filter = {};
    
    if (position) filter['applicationInfo.position'] = new RegExp(position, 'i');
    if (department) filter['applicationInfo.department'] = department;
    if (stage) filter.interviewStage = stage;
    if (status) filter.status = status;
    
    if (search) {
      filter.$or = [
        { 'personalInfo.firstName': new RegExp(search, 'i') },
        { 'personalInfo.lastName': new RegExp(search, 'i') },
        { 'personalInfo.email': new RegExp(search, 'i') },
        { 'applicationInfo.position': new RegExp(search, 'i') }
      ];
    }

    const candidates = await Candidate.find(filter)
      .populate('applicationInfo.department')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Candidate.countDocuments(filter);

    res.json({
      success: true,
      data: candidates,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching candidates',
      error: error.message
    });
  }
};

// Get candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const candidate = await Candidate.findById(id)
      .populate('applicationInfo.department')
      .populate('notes.addedBy', 'personalInfo.firstName personalInfo.lastName');

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      data: candidate
    });
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching candidate',
      error: error.message
    });
  }
};

// Update candidate
const updateCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('applicationInfo.department');

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      message: 'Candidate updated successfully',
      data: candidate
    });
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating candidate',
      error: error.message
    });
  }
};

// Delete candidate
const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if candidate has any scheduled interviews
    const hasInterviews = await Interview.findOne({ candidate: id, status: { $in: ['scheduled', 'in_progress'] } });
    
    if (hasInterviews) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete candidate with scheduled interviews'
      });
    }

    const candidate = await Candidate.findByIdAndDelete(id);

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    res.json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting candidate',
      error: error.message
    });
  }
};

// Schedule an interview
const scheduleInterview = async (req, res) => {
  try {
    const interviewData = req.body;
    
    // Validate that candidate exists
    const candidate = await Candidate.findById(interviewData.candidate);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    // Validate that interviewer exists
    const interviewer = await Employee.findById(interviewData.interviewer);
    if (!interviewer) {
      return res.status(404).json({
        success: false,
        message: 'Interviewer not found'
      });
    }

    // Check for scheduling conflicts
    const conflictingInterview = await Interview.findOne({
      interviewer: interviewData.interviewer,
      'scheduling.date': interviewData.scheduling.date,
      status: { $in: ['scheduled', 'in_progress'] },
      _id: { $ne: interviewData._id } // Exclude current interview if updating
    });

    if (conflictingInterview) {
      // Check for time overlap
      const newStart = new Date(`${interviewData.scheduling.date} ${interviewData.scheduling.time}`);
      const newEnd = new Date(newStart.getTime() + interviewData.scheduling.duration * 60000);
      
      const existingStart = new Date(`${conflictingInterview.scheduling.date} ${conflictingInterview.scheduling.time}`);
      const existingEnd = new Date(existingStart.getTime() + conflictingInterview.scheduling.duration * 60000);
      
      if ((newStart >= existingStart && newStart < existingEnd) || 
          (newEnd > existingStart && newEnd <= existingEnd) ||
          (newStart <= existingStart && newEnd >= existingEnd)) {
        return res.status(400).json({
          success: false,
          message: 'Interviewer has a conflicting interview at this time'
        });
      }
    }

    const interview = new Interview({
      ...interviewData,
      scheduledBy: req.user.id
    });
    
    await interview.save();
    
    await interview.populate([
      { path: 'candidate' },
      { path: 'interviewer' },
      { path: 'interviewDetails.department' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Interview scheduled successfully',
      data: interview
    });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({
      success: false,
      message: 'Error scheduling interview',
      error: error.message
    });
  }
};

// Get all interviews with filtering
const getAllInterviews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      stage,
      interviewer,
      candidate,
      department,
      startDate,
      endDate,
      upcoming = false
    } = req.query;

    const filter = {};
    
    if (status) filter.status = status;
    if (stage) filter['interviewDetails.stage'] = stage;
    if (interviewer) filter.interviewer = interviewer;
    if (candidate) filter.candidate = candidate;
    if (department) filter['interviewDetails.department'] = department;
    
    if (startDate && endDate) {
      filter['scheduling.date'] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    if (upcoming === 'true') {
      filter['scheduling.date'] = { $gte: new Date() };
      filter.status = { $in: ['scheduled', 'rescheduled'] };
    }

    const interviews = await Interview.find(filter)
      .populate('candidate')
      .populate('interviewer')
      .populate('interviewDetails.department')
      .populate('scheduledBy', 'personalInfo.firstName personalInfo.lastName')
      .sort({ 'scheduling.date': 1, 'scheduling.time': 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Interview.countDocuments(filter);

    res.json({
      success: true,
      data: interviews,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching interviews',
      error: error.message
    });
  }
};

// Get interview by ID
const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const interview = await Interview.findById(id)
      .populate('candidate')
      .populate('interviewer')
      .populate('interviewDetails.department')
      .populate('scheduledBy', 'personalInfo.firstName personalInfo.lastName')
      .populate('notes.addedBy', 'personalInfo.firstName personalInfo.lastName')
      .populate('feedback.submittedBy', 'personalInfo.firstName personalInfo.lastName');

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    res.json({
      success: true,
      data: interview
    });
  } catch (error) {
    console.error('Error fetching interview:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching interview',
      error: error.message
    });
  }
};

// Update interview
const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const interview = await Interview.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate([
      { path: 'candidate' },
      { path: 'interviewer' },
      { path: 'interviewDetails.department' }
    ]);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    res.json({
      success: true,
      message: 'Interview updated successfully',
      data: interview
    });
  } catch (error) {
    console.error('Error updating interview:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating interview',
      error: error.message
    });
  }
};

// Reschedule interview
const rescheduleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime, reason } = req.body;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    await interview.reschedule(newDate, newTime, reason, req.user.id);
    
    await interview.populate([
      { path: 'candidate' },
      { path: 'interviewer' },
      { path: 'interviewDetails.department' }
    ]);

    res.json({
      success: true,
      message: 'Interview rescheduled successfully',
      data: interview
    });
  } catch (error) {
    console.error('Error rescheduling interview:', error);
    res.status(500).json({
      success: false,
      message: 'Error rescheduling interview',
      error: error.message
    });
  }
};

// Cancel interview
const cancelInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    await interview.cancel(reason, req.user.id);

    res.json({
      success: true,
      message: 'Interview cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling interview:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling interview',
      error: error.message
    });
  }
};

// Add interview feedback
const addInterviewFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedbackData = req.body;

    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    await interview.addFeedback(feedbackData, req.user.id);
    
    await interview.populate([
      { path: 'candidate' },
      { path: 'interviewer' },
      { path: 'interviewDetails.department' }
    ]);

    res.json({
      success: true,
      message: 'Feedback added successfully',
      data: interview
    });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding feedback',
      error: error.message
    });
  }
};

// Get interview statistics
const getInterviewStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    const statistics = await Interview.getStatistics(start, end);
    
    // Get stage-wise statistics
    const stageStats = await Interview.aggregate([
      {
        $match: {
          'scheduling.date': { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: '$interviewDetails.stage',
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          averageRating: { $avg: '$feedback.overallRating' }
        }
      }
    ]);

    // Get upcoming interviews count
    const upcomingCount = await Interview.countDocuments({
      'scheduling.date': { $gte: new Date() },
      status: { $in: ['scheduled', 'rescheduled'] }
    });

    res.json({
      success: true,
      data: {
        overview: statistics,
        stages: stageStats,
        upcomingInterviews: upcomingCount
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// Get available interviewers
const getAvailableInterviewers = async (req, res) => {
  try {
    const { date, time, duration = 60 } = req.query;
    
    if (!date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Date and time are required'
      });
    }

    // Get all employees who can be interviewers
    const allInterviewers = await Employee.find({
      status: 'active',
      'jobInfo.position': { $in: ['Tech Lead', 'Senior Developer', 'Manager', 'HR Manager', 'Director'] }
    });

    // Find busy interviewers at the given time
    const busyInterviewers = await Interview.find({
      'scheduling.date': new Date(date),
      status: { $in: ['scheduled', 'in_progress'] }
    }).distinct('interviewer');

    // Filter out busy interviewers with time conflicts
    const availableInterviewers = [];
    const requestedStart = new Date(`${date} ${time}`);
    const requestedEnd = new Date(requestedStart.getTime() + duration * 60000);

    for (const interviewer of allInterviewers) {
      const conflicts = await Interview.find({
        interviewer: interviewer._id,
        'scheduling.date': new Date(date),
        status: { $in: ['scheduled', 'in_progress'] }
      });

      let hasConflict = false;
      for (const conflict of conflicts) {
        const existingStart = new Date(`${date} ${conflict.scheduling.time}`);
        const existingEnd = new Date(existingStart.getTime() + conflict.scheduling.duration * 60000);
        
        if ((requestedStart >= existingStart && requestedStart < existingEnd) || 
            (requestedEnd > existingStart && requestedEnd <= existingEnd) ||
            (requestedStart <= existingStart && requestedEnd >= existingEnd)) {
          hasConflict = true;
          break;
        }
      }

      if (!hasConflict) {
        availableInterviewers.push(interviewer);
      }
    }

    res.json({
      success: true,
      data: availableInterviewers
    });
  } catch (error) {
    console.error('Error fetching available interviewers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available interviewers',
      error: error.message
    });
  }
};

module.exports = {
  // Candidate operations
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
  
  // Interview operations
  scheduleInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  rescheduleInterview,
  cancelInterview,
  addInterviewFeedback,
  getInterviewStatistics,
  getAvailableInterviewers
};