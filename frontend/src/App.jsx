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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
<Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admindashboard" element={<AdminDashboard />} />
<Route path="/saved" element={<Saved />} />
<Route
          path="/scholarship/:id"
          element={<ScholarshipDetails />}
        />
<Route path="/applications" element={<Applications />} />

    </Routes>
  );
}
