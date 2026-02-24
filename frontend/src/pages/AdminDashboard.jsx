import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalScholarships: 0,
    totalApplied: 0,
    totalApproved: 0
  });
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [lastSync, setLastSync] = useState(
  localStorage.getItem("lastSync") || null
);

useEffect(() => {
  if (message) {
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [message]);

const handleImport = async () => {
  try {
    setLoading(true);
    setMessage("");

    const response = await fetch(
      "http://localhost:8080/api/admin/import",
      {
        method: "POST"
      }
    );
    const now = new Date().toLocaleString();
    setLastSync(now);
    localStorage.setItem("lastSync", now);
    const data = await response.text();

    setMessage(data);
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    setMessage("Import failed");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin || admin.role !== "ADMIN") {
    navigate("/admin-login");
    return;
  }

  fetch("http://localhost:8080/api/admin/stats")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch stats");
      }
      return res.json();
    })
    .then(data => {
      setStats(data); // no need to manually map
    })
    .catch(err => {
      console.error("Error fetching stats:", err);
    });

}, [navigate]);

  const handleLogout = () => {
  localStorage.removeItem("admin");
  navigate("/admin/login", { replace: true });
};

  return (
    <div className="admin-dashboard">

  {/* HEADER */}
  <div className="admin-header">
    <h1>ScholarAssist Admin</h1>
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </div>

  {/* STATISTICS SECTION */}
  <h2 className="section-title">Statistics Overview</h2>

  <div className="stats-grid">
    <div className="stat-card">
      <h3>Total Users</h3>
      <p>{stats.totalUsers}</p>
    </div>

    <div className="stat-card">
      <h3>Total Scholarships</h3>
      <p>{stats.totalScholarships}</p>
    </div>

    <div className="stat-card">
      <h3>Total Applications</h3>
      <p>{stats.totalApplied}</p>
    </div>

    <div className="stat-card">
      <h3>Scholarships Approved</h3>
      <p>{stats.totalApproved}</p>
    </div>
  </div>

  {/* SCHOLARSHIP MANAGEMENT */}
  <div className="section-header">
  <h2 className="section-title">Scholarship Management</h2>

  <div className="sync-area">
    <button
      className="sync-btn"
      onClick={handleImport}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Syncing...
        </>
      ) : (
        "Sync Scholarships"
      )}
    </button>

    {lastSync && (
      <span className="last-sync">
  ⏱ Last synced: {lastSync}
</span>
    )}
  </div>
</div>
<div className="admin-grid">
  <div
    className="admin-card"
    onClick={() => navigate("/admin/scholarships")}
  >
    View All Scholarships
  </div>

  <div
    className="admin-card"
    onClick={() => navigate("/admin/add-scholarship")}
  >
    Add Scholarship
  </div>

  <div
    className="admin-card"
    onClick={() => navigate("/admin/edit-scholarships")}
  >
    Edit Scholarship
  </div>
</div>

{message && (
  <div className="toast-success">
    {message}
  </div>
)}
  {/* STUDENT MANAGEMENT */}
  <h2 className="section-title">Student Management</h2>

  <div className="admin-grid">
    <div className="admin-card" onClick={() => navigate("/admin/students")}>
      View All Students
    </div>

    <div className="admin-card" onClick={() => navigate("/admin/applications-status")}>
  View By Scholarship Status
</div>

    <div className="admin-card" onClick={() => navigate("/admin/remove-user")}>
      Remove Suspicious User
    </div>
  </div>

  {/* ANALYTICS */}
  <h2 className="section-title">Analytics</h2>

  <div className="admin-grid">
    <div className="admin-card" onClick={() => navigate("/admin/usability-graph")}>
      Website Usability Graph
    </div>

    <div className="admin-card" onClick={() => navigate("/admin/response-time")}>
      Response Time Graph
    </div>
  </div>

</div>
  );
}