import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
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
import AddCandidate from "./components/AddCandidate";
import ViewCandidate from "./components/ViewCandidate";
import EditCandidate from "./components/EditCandidate";
import Holidays from "./components/Holidays";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import AuthDebug from "./components/AuthDebug";
// New imports for additional features
import InterviewManagement from "./components/InterviewManagement";
import InterviewScheduling from "./components/InterviewScheduling";
import InterviewFeedback from "./components/InterviewFeedback";
import InterviewAnalytics from "./components/InterviewAnalytics";
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOTP />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/attendance" element={
            <ProtectedRoute requiredPermission="view_attendance">
              <Attendance />
            </ProtectedRoute>
          } />
          
          <Route path="/payroll" element={
            <ProtectedRoute requiredPermission="view_payroll">
              <Payroll />
            </ProtectedRoute>
          } />
          
          <Route path="/jobs" element={
            <ProtectedRoute requiredPermission="view_jobs">
              <Jobs />
            </ProtectedRoute>
          } />
          
          <Route path="/candidates" element={
            <ProtectedRoute requiredPermission="view_candidates">
              <Candidates />
            </ProtectedRoute>
          } />
          
          <Route path="/add-candidate" element={
            <ProtectedRoute requiredPermission="add_candidate">
              <AddCandidate />
            </ProtectedRoute>
          } />
          
          <Route path="/candidate/:id" element={
            <ProtectedRoute requiredPermission="view_candidate_details">
              <ViewCandidate />
            </ProtectedRoute>
          } />
          
          <Route path="/edit-candidate/:id" element={
            <ProtectedRoute requiredPermission="edit_candidate">
              <EditCandidate />
            </ProtectedRoute>
          } />
          
          <Route path="/holidays" element={
            <ProtectedRoute requiredPermission="view_holidays">
              <Holidays />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute requiredPermission="view_settings">
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="/all-employees" element={
            <ProtectedRoute requiredPermission="view_employees">
              <AllEmployees />
            </ProtectedRoute>
          } />
          
          <Route path="/add-employee" element={
            <ProtectedRoute requiredPermission="add_employee">
              <AddNewEmployee />
            </ProtectedRoute>
          } />
          
          <Route path="/employee/:employeeId" element={
            <ProtectedRoute requiredPermission="view_employee_details">
              <ViewEmployee />
            </ProtectedRoute>
          } />
          
          <Route path="/all-departments" element={
            <ProtectedRoute requiredPermission="view_departments">
              <AllDepartments />
            </ProtectedRoute>
          } />
          
          <Route path="/department/:departmentId" element={
            <ProtectedRoute requiredPermission="view_department_details">
              <ViewDepartment />
            </ProtectedRoute>
          } />
          
          {/* Interview Management Routes */}
          <Route path="/interview-management" element={
            <ProtectedRoute requiredPermission="manage_interviews">
              <InterviewManagement />
            </ProtectedRoute>
          } />
          
          <Route path="/interview-scheduling" element={
            <ProtectedRoute requiredPermission="schedule_interviews">
              <InterviewScheduling />
            </ProtectedRoute>
          } />
          
          <Route path="/interview-feedback/:interviewId" element={
            <ProtectedRoute requiredPermission="provide_interview_feedback">
              <InterviewFeedback />
            </ProtectedRoute>
          } />
          
          <Route path="/interview-analytics" element={
            <ProtectedRoute requiredPermission="view_interview_analytics">
              <InterviewAnalytics />
            </ProtectedRoute>
          } />
          
          {/* Performance Management Routes */}
          <Route path="/performance-management" element={
            <ProtectedRoute requiredPermission="manage_performance">
              <PerformanceManagement />
            </ProtectedRoute>
          } />
          
          {/* Training & Development Routes */}
          <Route path="/training-development" element={
            <ProtectedRoute requiredPermission="manage_training">
              <TrainingDevelopment />
            </ProtectedRoute>
          } />
          
          {/* Leave Management Routes */}
          <Route path="/leave-requests" element={
            <ProtectedRoute requiredPermission="view_leave_requests">
              <LeaveRequests />
            </ProtectedRoute>
          } />
          
          {/* Time & Project Management Routes */}
          <Route path="/timesheet" element={
            <ProtectedRoute requiredPermission="view_timesheet">
              <Timesheet />
            </ProtectedRoute>
          } />
          
          <Route path="/projects" element={
            <ProtectedRoute requiredPermission="view_projects">
              <Projects />
            </ProtectedRoute>
          } />
          
          {/* Analytics & Reporting Routes */}
          <Route path="/analytics" element={
            <ProtectedRoute requiredPermission="view_analytics">
              <Analytics />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute requiredPermission="generate_reports">
              <Reports />
            </ProtectedRoute>
          } />
          
          <Route path="/hr-insights" element={
            <ProtectedRoute requiredPermission="view_hr_insights">
              <HRInsights />
            </ProtectedRoute>
          } />
          
          {/* Asset Management Routes */}
          <Route path="/asset-management" element={
            <ProtectedRoute requiredPermission="manage_assets">
              <AssetManagement />
            </ProtectedRoute>
          } />
          
          {/* Learning Management Routes */}
          <Route path="/learning-management" element={
            <ProtectedRoute requiredPermission="manage_learning">
              <LearningManagement />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
