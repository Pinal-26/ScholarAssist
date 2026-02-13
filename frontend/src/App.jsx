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
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admindashboard" element={<AdminDashboard />} />
<Route path="/saved" element={<Saved />} />
<Route path="/admin/scholarships" element={<AdminScholarships />} />
<Route path="/admin/students" element={<AdminStudents />} />

<Route
          path="/scholarship/:id"
          element={<ScholarshipDetails />}
        />
<Route path="/applications" element={<Applications />} />

    </Routes>
  );
}
