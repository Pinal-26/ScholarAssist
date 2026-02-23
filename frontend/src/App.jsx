import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Saved from "./pages/Saved";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Applications from "./pages/Applications";
import AdminScholarships from "./pages/AdminScholarships";
import AdminStudents from "./pages/AdminStudents";
import ProtectedRoute from "./pages/ProtectedRoute";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddScholarship from "./pages/AddScholarship";
import EditScholarshipList from "./pages/EditScholarshipList";
import EditScholarship from "./pages/EditScholarship";
import ViewStudents from "./pages/ViewStudents";
import WebsiteUsabilityGraph from "./pages/WebsiteUsabilityGraph";
import ResponseTimeGraph from "./pages/ResponseTimeGraph";
import AdminApplicationsByStatus from "./pages/AdminApplicationsByStatus";
export default function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/admin/add-scholarship" element={<AddScholarship />} />
      <Route path="/admin/edit-scholarships" element={<EditScholarshipList />} />
<Route path="/admin/edit-scholarship/:id" element={<EditScholarship />} />
<Route path="/admin/students" element={<ViewStudents />} />
<Route path="/admin/usability-graph" element={<WebsiteUsabilityGraph />} />
<Route path="/admin/response-time" element={<ResponseTimeGraph />} />
<Route path="/admin/applications-status" element={<AdminApplicationsByStatus />} />
      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved"
        element={
          <ProtectedRoute>
            <Saved />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes (Optional: secure later) */}
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/admin/scholarships" element={<AdminScholarships />} />
      <Route path="/admin/students" element={<AdminStudents />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
