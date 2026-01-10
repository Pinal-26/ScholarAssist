import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";
import scholarships from "../data/scholarships";
import { useEffect, useState } from "react";

export default function Saved() {
  const [savedIds, setSavedIds] = useState(() => {
    return JSON.parse(localStorage.getItem("savedScholarships")) || [];
  });

  const [savedScholarships, setSavedScholarships] = useState([]);

  useEffect(() => {
    const filtered = scholarships.filter(s =>
      savedIds.includes(s.id)
    );
    setSavedScholarships(filtered);
  }, [savedIds]);

  const toggleSave = (id) => {
    const updated = savedIds.filter(sid => sid !== id);
    setSavedIds(updated);
    localStorage.setItem("savedScholarships", JSON.stringify(updated));
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
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

      {/* ================= CONTENT ================= */}
      <div className="dashboard-container">
        <h2 className="section-title">Saved Scholarships</h2>

        {savedScholarships.length === 0 ? (
          <p style={{ color: "#777" }}>
            You haven’t saved any scholarships yet ⭐
          </p>
        ) : (
          <div className="scholarship-grid">
            {savedScholarships.map(s => (
              <div key={s.id} className="scholarship-card">
                <span
                  className="bookmark"
                  onClick={() => toggleSave(s.id)}
                  title="Remove from saved"
                >
                  🔖
                </span>

                <span className="tag">{s.category}</span>
                <h4>{s.title}</h4>
                <p className="amount">₹{s.amount}</p>
                <p className="deadline">Deadline: {s.deadline}</p>
                <button>View Details</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
