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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
