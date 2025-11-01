import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear specific field error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (!agreeToTerms) {
      errors.terms = "You must agree to the terms and conditions";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const registrationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role
      };
      
      const response = await authService.register(registrationData);
      
      if (response.success) {
        // Show success message and redirect to dashboard
        alert("Registration successful! Welcome to Corvex HR System.");
        navigate("/dashboard");
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-['Space_Grotesk']">
      {/* Left Side - Illustration/Branding */}
      <div className="hidden lg:flex lg:w-3/5 bg-white">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="bg-gradient-to-br from-[#5E17EB] to-[#4A0EC9] rounded-3xl h-[600px] flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-4xl font-bold mb-4">Join Corvex HR</h2>
                <p className="text-xl opacity-90">
                  Start your journey with our comprehensive HR management system
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Comprehensive Employee Management</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Advanced Analytics & Reporting</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="text-sm">Streamlined Payroll Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - SignUp Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-start p-8 lg:pl-16">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Welcome */}
          <div className="space-y-6">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-[#5E17EB] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Corvex</span>
            </Link>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join our HR management system today
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* SignUp Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className={`w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-colors ${
                    validationErrors.firstName 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-[#5E17EB] focus:border-[#5E17EB]'
                  }`}
                  required
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className={`w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-colors ${
                    validationErrors.lastName 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-[#5E17EB] focus:border-[#5E17EB]'
                  }`}
                  required
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@company.com"
                className={`w-full px-4 py-3 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-colors ${
                  validationErrors.email 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-[#5E17EB] focus:border-[#5E17EB]'
                }`}
                required
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
              >
                <option value="employee">Employee</option>
                <option value="recruiter">Recruiter</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Select your role. Additional permissions can be granted by HR administrators.
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-colors ${
                    validationErrors.password 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-[#5E17EB] focus:border-[#5E17EB]'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
              <div className="mt-1 text-xs text-gray-500">
                Must contain at least 6 characters with uppercase, lowercase, and number
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  className={`w-full px-4 py-3 pr-12 border rounded-xl bg-white focus:outline-none focus:ring-2 transition-colors ${
                    validationErrors.confirmPassword 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-[#5E17EB] focus:border-[#5E17EB]'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 text-[#5E17EB] border-gray-300 rounded focus:ring-[#5E17EB] focus:ring-2 mt-0.5"
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 text-sm text-gray-600"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-[#5E17EB] hover:text-[#4A0EC9] transition-colors underline"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-[#5E17EB] hover:text-[#4A0EC9] transition-colors underline"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {validationErrors.terms && (
                <p className="text-sm text-red-600">{validationErrors.terms}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5E17EB] hover:bg-[#4A0EC9] text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#5E17EB] hover:text-[#4A0EC9] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs text-gray-500">
            <p>
              By creating an account, you acknowledge that you have read and understood our{" "}
              <a href="#" className="text-[#5E17EB] hover:text-[#4A0EC9] transition-colors">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
