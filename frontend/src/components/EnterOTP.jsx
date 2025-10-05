import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const EnterOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const email = location.state?.email || "robertfox@example.com";

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-['Space_Grotesk']">
      {/* Left Side - Illustration/Empty Area */}
      <div className="hidden lg:flex lg:w-3/5 bg-white">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* You can add an illustration here */}
            <div className="bg-gray-100 rounded-3xl h-[600px] flex items-center justify-center">
              <span className="text-gray-400 text-lg">Illustration Area</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Enter OTP Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-start p-8 lg:pl-16">
        <div className="w-full max-w-md space-y-8">
          {/* Back Button */}
          <div className="flex items-center space-x-2">
            <Link
              to="/forgot-password"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </Link>
          </div>

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
              <h2 className="text-xl font-medium text-black">Enter OTP</h2>
              <p className="text-gray-500 text-sm mt-1">
                We have share a code of your registered email address{" "}
                <span className="text-gray-700">{email}</span>
              </p>
            </div>
          </div>

          {/* OTP Form */}
          <form className="space-y-6">
            {/* OTP Input Fields */}
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#5E17EB] focus:border-[#5E17EB] transition-colors"
                />
              ))}
            </div>

            {/* Verify Button */}
            <Button
              type="submit"
              className="w-full bg-[#5E17EB] hover:bg-[#4A0EC9] text-white py-3 px-4 rounded-xl font-medium transition-colors"
            >
              Verify
            </Button>
          </form>

          {/* Resend OTP Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="text-[#5E17EB] hover:text-[#4A0EC9] font-medium transition-colors"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOTP;
