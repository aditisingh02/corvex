const Employee = require('../models/Employee');

// @desc    Calculate payroll for employee
// @route   POST /api/payroll/calculate
// @access  Private (HR roles)
const calculatePayroll = async (req, res, next) => {
  try {
    const {
      employeeId,
      payPeriodStart,
      payPeriodEnd,
      bonuses = [],
      deductions = [],
      overtime = 0
    } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    const salary = employee.jobInfo.salary;
    const payType = employee.jobInfo.payType || 'monthly';

    // Calculate base pay
    let basePay = 0;
    if (payType === 'monthly') {
      basePay = salary;
    } else if (payType === 'hourly') {
      // Assume 160 hours per month for hourly employees
      const hoursWorked = 160; // This should come from attendance data
      basePay = salary * hoursWorked;
    } else if (payType === 'annual') {
      basePay = salary / 12;
    }

    // Calculate overtime pay (1.5x regular rate)
    const overtimePay = payType === 'hourly' ? (salary * 1.5 * overtime) : 0;

    // Calculate total bonuses
    const totalBonuses = bonuses.reduce((sum, bonus) => sum + (bonus.amount || 0), 0);

    // Calculate total deductions
    const totalDeductions = deductions.reduce((sum, deduction) => sum + (deduction.amount || 0), 0);

    // Calculate taxes (simplified - should integrate with tax calculation service)
    const federalTaxRate = 0.12; // 12%
    const stateTaxRate = 0.05; // 5%
    const socialSecurityRate = 0.062; // 6.2%
    const medicareRate = 0.0145; // 1.45%

    const grossPay = basePay + overtimePay + totalBonuses;
    
    const federalTax = grossPay * federalTaxRate;
    const stateTax = grossPay * stateTaxRate;
    const socialSecurity = grossPay * socialSecurityRate;
    const medicare = grossPay * medicareRate;
    
    const totalTaxes = federalTax + stateTax + socialSecurity + medicare;
    const netPay = grossPay - totalTaxes - totalDeductions;

    const payrollData = {
      employee: {
        id: employee._id,
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId,
        department: employee.department
      },
      payPeriod: {
        start: new Date(payPeriodStart),
        end: new Date(payPeriodEnd)
      },
      earnings: {
        basePay,
        overtime: overtimePay,
        bonuses: totalBonuses,
        grossPay
      },
      deductions: {
        federalTax,
        stateTax,
        socialSecurity,
        medicare,
        other: totalDeductions,
        totalTaxes,
        totalDeductions: totalTaxes + totalDeductions
      },
      netPay,
      bonusDetails: bonuses,
      deductionDetails: deductions,
      calculatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      message: 'Payroll calculated successfully',
      data: payrollData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payroll history
// @route   GET /api/payroll/history
// @access  Private
const getPayrollHistory = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      employeeId,
      startDate,
      endDate
    } = req.query;

    let filter = {};

    // If not admin/hr, only show own payroll
    if (!['super_admin', 'hr_manager', 'hr_coordinator'].includes(req.user.role)) {
      const employee = await Employee.findOne({ user: req.user.id });
      if (employee) {
        filter.employeeId = employee._id;
      }
    } else if (employeeId) {
      filter.employeeId = employeeId;
    }

    // Note: This is a simplified implementation
    // In a real application, you would store payroll records in a separate collection
    // For now, we'll return mock data based on the filter
    
    const mockPayrollData = [];
    
    res.status(200).json({
      success: true,
      message: 'Payroll history retrieved successfully',
      count: mockPayrollData.length,
      total: mockPayrollData.length,
      page: parseInt(page),
      pages: Math.ceil(mockPayrollData.length / limit),
      data: mockPayrollData
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate payslip
// @route   GET /api/payroll/payslip/:employeeId
// @access  Private (HR roles and own payslip)
const generatePayslip = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { payPeriodStart, payPeriodEnd } = req.query;

    const employee = await Employee.findById(employeeId)
      .populate('department', 'name');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check if user can view this payslip
    const requestingEmployee = await Employee.findOne({ user: req.user.id });
    const canView = ['super_admin', 'hr_manager', 'hr_coordinator'].includes(req.user.role) ||
                   (requestingEmployee && requestingEmployee._id.toString() === employeeId);

    if (!canView) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this payslip'
      });
    }

    // This would typically fetch from a payroll records collection
    // For now, we'll generate a sample payslip
    const payslip = {
      employee: {
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId,
        department: employee.department.name,
        position: employee.jobInfo.position,
        joiningDate: employee.jobInfo.startDate
      },
      company: {
        name: 'Corvex HR System',
        address: '123 Business St, City, State 12345'
      },
      payPeriod: {
        start: payPeriodStart || new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: payPeriodEnd || new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
      },
      earnings: {
        basicSalary: employee.jobInfo.salary,
        allowances: 0,
        overtime: 0,
        bonus: 0,
        gross: employee.jobInfo.salary
      },
      deductions: {
        tax: employee.jobInfo.salary * 0.12,
        providentFund: employee.jobInfo.salary * 0.12,
        insurance: 100,
        other: 0,
        total: (employee.jobInfo.salary * 0.24) + 100
      },
      netSalary: employee.jobInfo.salary - ((employee.jobInfo.salary * 0.24) + 100),
      generatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      message: 'Payslip generated successfully',
      data: payslip
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payroll summary
// @route   GET /api/payroll/summary
// @access  Private (HR roles)
const getPayrollSummary = async (req, res, next) => {
  try {
    const { month, year, departmentId } = req.query;
    
    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();

    let filter = {};
    if (departmentId) {
      filter.department = departmentId;
    }

    const employees = await Employee.find(filter)
      .populate('department', 'name');

    const summary = {
      period: `${currentMonth}/${currentYear}`,
      totalEmployees: employees.length,
      totalGrossPay: 0,
      totalDeductions: 0,
      totalNetPay: 0,
      departmentBreakdown: {},
      payrollBreakdown: employees.map(employee => {
        const grossPay = employee.jobInfo.salary;
        const deductions = grossPay * 0.24 + 100; // Simplified calculation
        const netPay = grossPay - deductions;

        return {
          employeeId: employee.employeeId,
          name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
          department: employee.department?.name || 'No Department',
          grossPay,
          deductions,
          netPay
        };
      })
    };

    // Calculate totals
    summary.payrollBreakdown.forEach(emp => {
      summary.totalGrossPay += emp.grossPay;
      summary.totalDeductions += emp.deductions;
      summary.totalNetPay += emp.netPay;

      // Department breakdown
      const dept = emp.department;
      if (!summary.departmentBreakdown[dept]) {
        summary.departmentBreakdown[dept] = {
          employees: 0,
          grossPay: 0,
          netPay: 0
        };
      }
      summary.departmentBreakdown[dept].employees++;
      summary.departmentBreakdown[dept].grossPay += emp.grossPay;
      summary.departmentBreakdown[dept].netPay += emp.netPay;
    });

    res.status(200).json({
      success: true,
      message: 'Payroll summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get salary structure
// @route   GET /api/payroll/salary-structure/:employeeId
// @access  Private (HR roles and own structure)
const getSalaryStructure = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId)
      .populate('department', 'name');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Check authorization
    const requestingEmployee = await Employee.findOne({ user: req.user.id });
    const canView = ['super_admin', 'hr_manager', 'hr_coordinator'].includes(req.user.role) ||
                   (requestingEmployee && requestingEmployee._id.toString() === employeeId);

    if (!canView) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this salary structure'
      });
    }

    const baseSalary = employee.jobInfo.salary;
    
    const salaryStructure = {
      employee: {
        name: `${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`,
        employeeId: employee.employeeId,
        department: employee.department?.name,
        position: employee.jobInfo.position,
        payType: employee.jobInfo.payType || 'monthly'
      },
      components: {
        basic: baseSalary * 0.6, // 60% basic
        hra: baseSalary * 0.2,   // 20% HRA
        conveyance: baseSalary * 0.1, // 10% conveyance
        medical: baseSalary * 0.05,   // 5% medical
        other: baseSalary * 0.05      // 5% other allowances
      },
      deductions: {
        providentFund: baseSalary * 0.12, // 12% PF
        professionalTax: 200,
        tax: baseSalary * 0.12 // Simplified tax calculation
      },
      gross: baseSalary,
      totalDeductions: (baseSalary * 0.24) + 200,
      netSalary: baseSalary - ((baseSalary * 0.24) + 200)
    };

    res.status(200).json({
      success: true,
      message: 'Salary structure retrieved successfully',
      data: salaryStructure
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  calculatePayroll,
  getPayrollHistory,
  generatePayslip,
  getPayrollSummary,
  getSalaryStructure
};