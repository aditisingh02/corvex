// Utility functions for transforming employee data between frontend and MongoDB backend

/**
 * Transform form data to MongoDB employee structure
 * @param {Object} formData - Form data from frontend
 * @returns {Object} - Structured data for MongoDB
 */
export const transformFormDataToEmployee = (formData) => {
  const transformedData = {
    userInfo: {
      email: formData.emailAddress,
      password: 'TempPassword123!', // Should be changed on first login
      role: 'employee'
    },
    // No employeeId - let backend auto-generate it completely
    personalInfo: {
      firstName: formData.firstName?.trim(),
      lastName: formData.lastName?.trim(),
      phone: formData.mobileNumber,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus || 'single',
      nationality: formData.nationality,
      emergencyContact: {
        name: formData.emergencyContactName || 'Emergency Contact',
        relationship: formData.emergencyContactRelationship || 'Family',
        phone: formData.emergencyContactPhone || formData.mobileNumber
      },
      address: {
        street: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.pinCode,
        country: 'USA' // Default country
      }
    },
    jobInfo: {
      department: formData.department,
      position: formData.designation,
      level: formData.level || 'junior',
      hireDate: formData.joiningDate,
      employmentType: formData.employmentType,
      workLocation: formData.workLocation
    },
    compensation: {
      salary: {
        amount: parseFloat(formData.salary) || 0,
        currency: 'USD',
        frequency: 'yearly'
      }
    },
    status: 'active'
  };
  
  console.log('Transformed employee data:', transformedData);
  return transformedData;
};

/**
 * Transform MongoDB employee data for frontend display
 * @param {Object} employee - Employee data from MongoDB
 * @returns {Object} - Formatted data for frontend
 */
export const transformEmployeeForDisplay = (employee) => {
  if (!employee) return null;

  return {
    ...employee,
    fullName: `${employee.personalInfo?.firstName || ''} ${employee.personalInfo?.lastName || ''}`.trim(),
    displayEmail: employee.user?.email || employee.personalInfo?.email || 'N/A',
    displayPhone: employee.personalInfo?.phone || 'N/A',
    displayDepartment: employee.jobInfo?.department?.name || 'N/A',
    displayPosition: employee.jobInfo?.position || 'N/A',
    displaySalary: employee.compensation?.salary?.amount 
      ? `${employee.compensation.salary.currency || '$'}${employee.compensation.salary.amount.toLocaleString()}`
      : 'N/A',
    displayJoinDate: employee.jobInfo?.hireDate 
      ? new Date(employee.jobInfo.hireDate).toLocaleDateString() 
      : 'N/A',
    displayStatus: employee.status ? employee.status.replace('_', ' ').toUpperCase() : 'ACTIVE',
    displayAddress: employee.personalInfo?.address 
      ? formatAddress(employee.personalInfo.address)
      : 'N/A'
  };
};

/**
 * Format address object to string
 * @param {Object} address - Address object
 * @returns {string} - Formatted address string
 */
export const formatAddress = (address) => {
  if (!address) return 'N/A';
  
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode
  ].filter(Boolean);
  
  return parts.length > 0 ? parts.join(', ') : 'N/A';
};

/**
 * Validate employee data before submission
 * @param {Object} formData - Form data to validate
 * @returns {Object} - Validation result with errors
 */
export const validateEmployeeFormData = (formData) => {
  const errors = [];

  // Personal Information Validation
  if (!formData.firstName?.trim()) {
    errors.push('First name is required');
  }
  if (!formData.lastName?.trim()) {
    errors.push('Last name is required');
  }
  if (!formData.emailAddress?.trim()) {
    errors.push('Email address is required');
  } else if (!isValidEmail(formData.emailAddress)) {
    errors.push('Please enter a valid email address');
  }
  if (!formData.mobileNumber?.trim()) {
    errors.push('Mobile number is required');
  }
  if (!formData.dateOfBirth) {
    errors.push('Date of birth is required');
  }
  if (!formData.gender) {
    errors.push('Gender is required');
  }
  if (!formData.nationality) {
    errors.push('Nationality is required');
  }

  // Job Information Validation
  if (!formData.department) {
    errors.push('Department is required');
  }
  if (!formData.designation?.trim()) {
    errors.push('Designation/Position is required');
  }
  if (!formData.joiningDate) {
    errors.push('Joining date is required');
  }
  if (!formData.employmentType) {
    errors.push('Employment type is required');
  }
  if (!formData.workLocation) {
    errors.push('Work location is required');
  }
  if (!formData.salary || parseFloat(formData.salary) <= 0) {
    errors.push('Valid salary amount is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Format status for display
 * @param {string} status - Status from database
 * @returns {string} - Formatted status
 */
export const formatStatus = (status) => {
  if (!status) return 'ACTIVE';
  return status.replace('_', ' ').toUpperCase();
};

/**
 * Get status color class for UI
 * @param {string} status - Status value
 * @returns {string} - CSS class string
 */
export const getStatusColorClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'inactive':
      return 'bg-red-100 text-red-800';
    case 'on_leave':
      return 'bg-yellow-100 text-yellow-800';
    case 'terminated':
      return 'bg-gray-100 text-gray-800';
    case 'suspended':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-green-100 text-green-800';
  }
};

/**
 * Parse and format salary for display
 * @param {Object} salaryObj - Salary object from database
 * @returns {string} - Formatted salary string
 */
export const formatSalary = (salaryObj) => {
  if (!salaryObj || !salaryObj.amount) return 'N/A';
  
  const { amount, currency = 'USD', frequency = 'yearly' } = salaryObj;
  const currencySymbol = currency === 'USD' ? '$' : currency;
  
  return `${currencySymbol}${amount.toLocaleString()} ${frequency}`;
};

/**
 * Calculate age from date of birth
 * @param {string|Date} dateOfBirth - Date of birth
 * @returns {number|null} - Age in years
 */
export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Calculate years of service
 * @param {string|Date} hireDate - Hire date
 * @returns {number|null} - Years of service
 */
export const calculateYearsOfService = (hireDate) => {
  if (!hireDate) return null;
  
  const today = new Date();
  const hire = new Date(hireDate);
  const years = Math.floor((today - hire) / (365.25 * 24 * 60 * 60 * 1000));
  
  return Math.max(0, years);
};

export default {
  transformFormDataToEmployee,
  transformEmployeeForDisplay,
  formatAddress,
  validateEmployeeFormData,
  isValidEmail,
  formatStatus,
  getStatusColorClass,
  formatSalary,
  calculateAge,
  calculateYearsOfService
};