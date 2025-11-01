import React, { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoUsers, setShowDemoUsers] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      window.location.href = from; // Force full page redirect to ensure context updates
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Test123!'); // Use the real password we created
    setShowDemoUsers(false);
  };

  // Demo users for testing
  const demoUsers = [
    { email: 'test@corvex.com', name: 'Test Employee', role: 'employee' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-['Space_Grotesk']">
      {/* Left Side - Illustration/Empty Area */}
      <div className="hidden lg:flex lg:w-3/5 bg-white">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* Role-based access illustration */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl h-[600px] flex items-center justify-center p-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Role-Based HR System</h3>
                  <p className="text-gray-600">Access features based on your role and permissions</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-purple-600">Super Admin</div>
                    <div className="text-xs text-gray-500">Full system access</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-blue-600">HR Manager</div>
                    <div className="text-xs text-gray-500">Employee management</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-green-600">Manager</div>
                    <div className="text-xs text-gray-500">Team oversight</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-orange-600">Employee</div>
                    <div className="text-xs text-gray-500">Personal dashboard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-start p-8 lg:pl-16">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Welcome */}
          <div className="space-y-6">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44.0103 7.93084C43.0325 6.23757 41.2595 5.29014 39.4354 5.28893L39.4356 5.28845C37.6117 5.287 35.8382 4.33981 34.8607 2.64654C33.4021 0.119888 30.1715 -0.745799 27.645 0.71333L27.6445 0.713571V0.711883C26.0752 1.61615 24.0838 1.68777 22.3978 0.731656C21.6122 0.268911 20.6974 0.00341797 19.7201 0.00341797C17.765 0.00341797 16.0583 1.06563 15.1444 2.64461V2.64437C14.2313 4.2231 12.5241 5.28532 10.5693 5.28532C7.65166 5.28532 5.28692 7.6504 5.28692 10.5679V10.5687L5.28523 10.5679C5.28354 12.3784 4.35062 14.138 2.68226 15.1204C1.88775 15.5689 1.19933 16.2289 0.710083 17.0763C-0.267447 18.7698 -0.201137 20.7789 0.709601 22.3596H0.70936C1.61962 23.9398 1.68617 25.9492 0.708395 27.6425C-0.749943 30.1691 0.115222 33.3996 2.642 34.8588L2.64248 34.859L2.64127 34.8597C4.22017 35.7727 5.2821 37.48 5.2821 39.4353C5.2821 42.3529 7.64683 44.7177 10.5642 44.7177C12.5195 44.7177 14.226 45.7799 15.1399 47.3589C16.0533 48.9372 17.7604 50.0001 19.7153 50.0001C20.6928 50.0001 21.6074 49.7341 22.393 49.2716C24.0785 48.3158 26.0704 48.3874 27.6397 49.2919V49.29L27.6399 49.2907C30.1667 50.7493 33.3971 49.8834 34.8561 47.357C35.8337 45.664 37.6069 44.7165 39.4308 44.7151L39.4303 44.7146C41.2544 44.7131 43.0277 43.7657 44.005 42.0727C44.4863 41.2393 44.7146 40.3288 44.7136 39.431L44.7144 39.4315C44.7161 37.6721 45.5976 35.9596 47.1797 34.9632C48.0323 34.5147 48.7725 33.8277 49.2895 32.9318C50.2675 31.2378 50.201 29.2287 49.2902 27.6483H49.2907C48.3802 26.0681 48.3137 24.0587 49.2912 22.3652C50.7503 19.8383 49.8846 16.608 47.3576 15.1491L47.3574 15.1486L47.3583 15.1481C45.7922 14.2419 44.7349 12.5547 44.718 10.6188C44.7274 9.70562 44.4995 8.77869 44.0103 7.93084Z"
                  fill="#5E17EB"
                />
              </svg>
              <h1 className="text-2xl font-bold text-black">Corvex</h1>
            </Link>
            <div>
              <h2 className="text-xl font-medium text-black">Welcome 👋</h2>
              <p className="text-gray-500 text-sm mt-1">Please login with your role</p>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-3 text-sm text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5E17EB] hover:bg-[#4A0EC9] text-white py-3 px-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          {/* Demo Users Section */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-50 text-gray-500">Try Different Roles</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowDemoUsers(!showDemoUsers)}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E17EB] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Demo Login Options
              <svg 
                className={`w-4 h-4 ml-2 transition-transform ${showDemoUsers ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDemoUsers && (
              <div className="space-y-2 bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Choose a role to test:</h4>
                {demoUsers.map((demoUser) => (
                  <button
                    key={demoUser.email}
                    onClick={() => handleDemoLogin(demoUser.email)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 group-hover:text-[#5E17EB]">
                          {demoUser.name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize mt-1">
                          {demoUser.role.replace('_', ' ')}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{demoUser.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#5E17EB] hover:text-[#4A0EC9] font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;