import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Saved() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const savedKey = user
    ? `savedScholarships_${user.id}`
    : "savedScholarships_guest";

  const [savedIds, setSavedIds] = useState([]);
  const [savedScholarships, setSavedScholarships] = useState([]);

  // ================= LOAD SAVED IDS =================
  useEffect(() => {
    if (!user) return;

    const saved = JSON.parse(localStorage.getItem(savedKey)) || [];
    setSavedIds(saved);
  }, [savedKey, user]);

  // ================= FETCH SAVED SCHOLARSHIPS =================
  useEffect(() => {
    if (savedIds.length === 0) {
      setSavedScholarships([]);
      return;
    }

    const fetchSaved = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/scholarships");
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const filtered = data.filter((s) => savedIds.includes(s.id));

        setSavedScholarships(filtered);
      } catch (error) {
        console.error("Saved fetch error:", error);
      }
    };

    fetchSaved();
  }, [savedIds]);

  // ================= REMOVE FROM SAVED =================
  const toggleSave = (id) => {
    const updated = savedIds.filter((sid) => sid !== id);

    setSavedIds(updated);
    localStorage.setItem(savedKey, JSON.stringify(updated));
  };

  return (
    <>
      <Navbar showSearch={false} />

      <div className="dashboard-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="section-title">Saved Scholarships</h2>

          {/* Back Button */}
          <button onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {savedScholarships.length === 0 ? (
          <p style={{ color: "#777" }}>
            You haven’t saved any scholarships yet ⭐
          </p>
        ) : (
          <div className="scholarship-grid">
            {savedScholarships.map((s) => (
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

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => navigate(`/scholarship/${s.id}`)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
