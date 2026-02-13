import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {

  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState("");

  // ===============================
  // 🔐 ADMIN PROTECTION
  // ===============================
 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("AdminDashboard user:", user);

  if (!user || user.role?.toUpperCase() !== "ADMIN") {
    navigate("/login");
  }
}, [navigate]);


  // ===============================
  // 📊 FETCH DASHBOARD STATS
  // ===============================
  useEffect(() => {

    fetch("http://localhost:8080/api/admin/stats")
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });

    fetch("http://localhost:8080/api/admin/status")
      .then(res => res.text())
      .then(data => setSystemStatus(data))
      .catch(err => console.error(err));

  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Dashboard...</h2>;
  }

  return (
    <div className="admin-container">

      {/* HEADER */}
      <header className="admin-header">
        <div className="header-left">
          <h1>ScholarAssist Admin</h1>
          <p className="subtitle">Smart Scholarship Management Platform</p>
        </div>

        <div className="admin-profile">
          <div className="profile-info">
            <span className="profile-name">Administrator</span>
            <span className="profile-role">System Admin</span>
          </div>
          <div className="profile-avatar">SA</div>
        </div>
      </header>

      {/* SYSTEM OVERVIEW */}
      <section className="overview-section">
        <h3 className="section-title">System Overview</h3>

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <h3>{stats?.totalStudents || 0}</h3>
              <p>Registered Students</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-content">
              <h3>{stats?.totalScholarships || 0}</h3>
              <p>Scholarships Listed</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <h3>{stats?.totalApplications || 0}</h3>
              <p>Total Applications</p>
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>{stats?.totalSuccess || 0}</h3>
              <p>Students Got Scholarship</p>
            </div>
          </div>

        </div>
      </section>

      {/* MAIN DASHBOARD */}
      <section className="dashboard-main">

        {/* LEFT COLUMN */}
        <div className="dashboard-column">

          <div className="dashboard-card">
            <div className="card-header">
              <h4>Admin Controls</h4>
              <span className="status-badge active">
                Active
              </span>
            </div>

            <p className="card-description">
              Manage scholarships, users and applications manually.
            </p>

            <button
              className="btn-primary"
              onClick={() => navigate("/admin/add-scholarship")}
            >
              ➕ Add Scholarship
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-column">

          <div className="dashboard-card">
            <h4>System Status</h4>

            <div className="status-grid">
              <div className="status-item active">
                ✅ {systemStatus || "Backend Running"}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
