import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import EnterOTP from "./components/EnterOTP";
import Dashboard from "./components/Dashboard";
import AllEmployees from "./components/AllEmployees";
import AddNewEmployee from "./components/AddNewEmployee";
import ViewEmployee from "./components/ViewEmployee";
import AllDepartments from "./components/AllDepartments";
import ViewDepartment from "./components/ViewDepartment";
import Attendance from "./components/Attendance";
import Payroll from "./components/Payroll";
import Jobs from "./components/Jobs";
import Candidates from "./components/Candidates";
import Holidays from "./components/Holidays";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
// New imports for additional features
import InterviewManagement from "./components/InterviewManagement";
import InterviewScheduling from "./components/InterviewScheduling";
import InterviewFeedback from "./components/InterviewFeedback";
import InterviewAnalytics from "./components/InterviewAnalytics";
import Onboarding from "./components/Onboarding";
import Offboarding from "./components/Offboarding";
import PerformanceManagement from "./components/PerformanceManagement";
import TrainingDevelopment from "./components/TrainingDevelopment";
import LeaveRequests from "./components/LeaveRequests";
import Timesheet from "./components/Timesheet";
import Projects from "./components/Projects";
import Analytics from "./components/Analytics";
import Reports from "./components/Reports";
import HRInsights from "./components/HRInsights";
import AssetManagement from "./components/AssetManagement";
import LearningManagement from "./components/LearningManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/all-employees" element={<AllEmployees />} />
        <Route path="/add-employee" element={<AddNewEmployee />} />
        <Route path="/employee/:employeeId" element={<ViewEmployee />} />
        <Route path="/all-departments" element={<AllDepartments />} />
        <Route path="/department/:departmentId" element={<ViewDepartment />} />
        
        {/* Interview Management Routes */}
        <Route path="/interview-management" element={<InterviewManagement />} />
        <Route path="/interview-scheduling" element={<InterviewScheduling />} />
        <Route path="/interview-feedback/:interviewId" element={<InterviewFeedback />} />
        <Route path="/interview-analytics" element={<InterviewAnalytics />} />
        
        {/* Employee Lifecycle Routes */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/offboarding" element={<Offboarding />} />
        
        {/* Performance Management Routes */}
        <Route path="/performance-management" element={<PerformanceManagement />} />
        
        {/* Training & Development Routes */}
        <Route path="/training-development" element={<TrainingDevelopment />} />
        
        {/* Leave Management Routes */}
        <Route path="/leave-requests" element={<LeaveRequests />} />
        
        {/* Time & Project Management Routes */}
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/projects" element={<Projects />} />
        
        {/* Analytics & Reporting Routes */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/hr-insights" element={<HRInsights />} />
        
        {/* Asset Management Routes */}
        <Route path="/asset-management" element={<AssetManagement />} />
        
        {/* Learning Management Routes */}
        <Route path="/learning-management" element={<LearningManagement />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
