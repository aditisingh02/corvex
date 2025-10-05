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
import AllDepartments from "./components/AllDepartments";
import ViewDepartment from "./components/ViewDepartment";
import Attendance from "./components/Attendance";
import Payroll from "./components/Payroll";

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
        <Route path="/all-employees" element={<AllEmployees />} />
        <Route path="/add-employee" element={<AddNewEmployee />} />
        <Route path="/all-departments" element={<AllDepartments />} />
        <Route path="/department/:departmentId" element={<ViewDepartment />} />
      </Routes>
    </Router>
  );
}

export default App;
