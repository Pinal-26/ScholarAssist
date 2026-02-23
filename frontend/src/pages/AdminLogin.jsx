import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/authSplit.css";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Clear old admin session on load
  useEffect(() => {
    localStorage.removeItem("admin");
  }, []);

  // ================= ADMIN LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:8080/api/users/admin-login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Admin login failed");
      }

      // Save admin
      localStorage.setItem("admin", JSON.stringify(data));

      alert("Admin Login Successful 🎉");

      // Redirect to Admin Dashboard
      navigate("/admindashboard");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="split-auth">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="auth-left-inner">

            <h1>Admin Access</h1>
            <p className="subtitle">
              Sign in to <b>ScholarAssist Admin Panel</b>
            </p>

            <form onSubmit={handleSubmit}>

              <label>Admin Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button type="submit" className="sign-btn">
                Login as Admin
              </button>

            </form>

            {/* Back to User Login */}
            <p className="bottom-text">
              Not an Admin?{" "}
              <span onClick={() => navigate("/login")}>
                Back to User Login
              </span>
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          <h2>Admin Control Center</h2>

          <div className="info-card">👥
            <div>
              <h4>Manage Users</h4>
              <p>View and control all registered users</p>
            </div>
          </div>

          <div className="info-card">🎓
            <div>
              <h4>Manage Scholarships</h4>
              <p>Add, update and remove scholarships</p>
            </div>
          </div>

          <div className="info-card">📊
            <div>
              <h4>Application Monitoring</h4>
              <p>Track all student applications</p>
            </div>
          </div>

          <div className="info-card">🔒
            <div>
              <h4>System Control</h4>
              <p>Maintain platform security & settings</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}