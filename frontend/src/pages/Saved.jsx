import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Saved() {
  const navigate = useNavigate();

  const [savedIds, setSavedIds] = useState(() => {
    return JSON.parse(localStorage.getItem("savedScholarships")) || [];
  });

  const [savedScholarships, setSavedScholarships] = useState([]);

  // ===== FETCH SAVED SCHOLARSHIPS FROM BACKEND =====
  useEffect(() => {
    if (savedIds.length === 0) {
      setSavedScholarships([]);
      return;
    }

    fetch("http://localhost:8080/api/scholarships")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(s =>
          savedIds.includes(s.id)
        );
        setSavedScholarships(filtered);
      })
      .catch(err => console.error("Saved fetch error:", err));
  }, [savedIds]);

  const toggleSave = (id) => {
    const updated = savedIds.filter(sid => sid !== id);
    setSavedIds(updated);
    localStorage.setItem("savedScholarships", JSON.stringify(updated));
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar showSearch={false} />

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

                <button
                  onClick={() => navigate(`/scholarship/${s.id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
