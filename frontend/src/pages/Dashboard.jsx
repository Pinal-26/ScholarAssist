import { NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import scholarships from "../data/scholarships";

export default function Dashboard() {
  const navigate = useNavigate();

  // ================= USER =================
  const user = JSON.parse(localStorage.getItem("user"));

  // ================= PROFILE =================
  const [profile, setProfile] = useState(null);

  // ================= ELIGIBLE SCHOLARSHIPS =================

  // ---------- Load profile ----------
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:8080/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Profile fetch error:", err));
  }, [user]);

  // ---------- Load eligible scholarships AFTER redirect ----------
  // ================= ELIGIBLE SCHOLARSHIPS =================
const [eligibleScholarships, setEligibleScholarships] = useState([]);

useEffect(() => {
  const isSaved = localStorage.getItem("profileSaved");
  const ids = JSON.parse(
    localStorage.getItem("eligibleScholarships") || "[]"
  );

  if (isSaved === "true" && ids.length > 0) {
    setEligibleScholarships(
      scholarships.filter(s => ids.includes(s.id))
    );
  } else {
    setEligibleScholarships([]); // EMPTY by default
  }
}, []);

// ===== PROFILE COMPLETION LOGIC (MATCHES PROFILE PAGE) =====
let profileCompletion = 0;

if (profile) {
  const requiredFields = [
    profile.firstName,
    profile.lastName,
    profile.phone,

    profile.street,
    profile.city,
    profile.state,
    profile.pincode,

    profile.institution,
    profile.course,
    profile.graduationYear,

    profile.parentIncome,
    profile.caste,
    profile.locality
  ];

  const filled = requiredFields.filter(
    v => v !== null && v !== ""
  ).length;

  profileCompletion = Math.round(
    (filled / requiredFields.length) * 100
  );
}
  // ================= PROFILE COMPLETION =================
  // const profileCompletion =
  //   profile &&
  //   profile.gpa &&
  //   profile.course &&
  //   profile.parentIncome &&
  //   profile.caste &&
  //   profile.locality
  //     ? 100
  //     : 0;

  return (
    <>
      {/* ================= DASHBOARD NAVBAR ================= */}
      <nav className="dash-navbar">
        <div className="dash-logo">
          🎓 <span>ScholarAssist</span>
        </div>

        <div className="dash-nav-links">
          <NavLink to="/dashboard" className="dash-link">Dashboard</NavLink>
          <NavLink to="/saved" className="dash-link">Saved</NavLink>
          <NavLink to="/applications" className="dash-link">Applications</NavLink>
          <NavLink to="/profile" className="dash-link">Profile</NavLink>
        </div>
      </nav>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="dashboard-container">

        {/* ================= HEADER ================= */}
        <div className="dashboard-header">
          <h1>Welcome back, {user ? user.name : "User"}!</h1>
          <p>Discover scholarships tailored to your profile</p>
        </div>

        {/* ================= STATS ================= */}
        <div className="stats-grid">
          <div className="stat-card">
            <p>Available</p>
            <h3>{scholarships.length}</h3>
          </div>

          <div className="stat-card">
            <p>Saved</p>
            <h3>0</h3>
          </div>

          <div className="stat-card">
            <p>Applications</p>
            <h3>3</h3>
          </div>

          <div className="stat-card">
            <p>Profile</p>
            <h3>{profileCompletion}%</h3>

            {profileCompletion < 100 && (
              <button
                className="complete-profile-btn"
                onClick={() => navigate("/profile")}
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {/* ================= ELIGIBLE SCHOLARSHIPS ================= */}
        <h3 className="section-title">Eligible Scholarships</h3>

        {eligibleScholarships.length === 0 ? (
          <p style={{ color: "#777", marginBottom: "30px" }}>
            Complete your profile and click <b>Save Changes</b> to see eligible scholarships.
          </p>
        ) : (
          <div className="scholarship-grid">
            {eligibleScholarships.map(s => (
              <div key={s.id} className="scholarship-card">
                <span className="tag">{s.category}</span>
                <h4>{s.title}</h4>
                <p className="amount">₹{s.amount}</p>
                <p className="deadline">Deadline: {s.deadline}</p>
                <button>View Details</button>
              </div>
            ))}
          </div>
        )}

        {/* ================= TOTAL AVAILABLE SCHOLARSHIPS ================= */}
        <h3 className="section-title">Total Available Scholarships</h3>

        <div className="scholarship-grid">
          {scholarships.map(s => (
            <div key={s.id} className="scholarship-card">
              <span className="tag">{s.category}</span>
              <h4>{s.title}</h4>
              <p className="amount">₹{s.amount}</p>
              <p className="deadline">Deadline: {s.deadline}</p>
              <button>View Details</button>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
