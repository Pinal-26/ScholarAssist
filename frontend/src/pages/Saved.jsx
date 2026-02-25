import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import API_BASE_URL from "../config";

export default function Saved() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [savedIds, setSavedIds] = useState([]);
  const [allScholarships, setAllScholarships] = useState([]);

  // ✅ Load saved IDs ONLY ONCE
  useEffect(() => {
  if (!user) return;

  fetch(`${API_BASE_URL}/api/saved/${user.id}`)
    .then(res => res.json())
    .then(data => {
const ids = data.map(item => Number(item.scholarshipId));
      setSavedIds(ids);
    });

}, []);

  // ✅ Fetch scholarships ONLY ONCE
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/scholarships`);
        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setAllScholarships(data);
      } catch (err) {
        console.error("Backend error:", err);
      }
    };

    fetchAll();
  }, []); // 🔥 empty dependency

  // Filter saved locally (no useEffect needed)
  const savedScholarships = allScholarships.filter((s) =>
    savedIds.includes(Number(s.id))
  );

  const toggleSave = async (scholarshipId) => {
  if (!user) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/saved/${user.id}/${scholarshipId}`,
      {
        method: "DELETE",
        credentials: "include"
      }
    );

    if (!res.ok) throw new Error("Failed to remove");

    // remove locally for instant UI update
    setSavedIds(prev =>
      prev.filter(id => id !== Number(scholarshipId))
    );

  } catch (err) {
    console.error("Remove error:", err);
  }
};
  return (
    <>
      <Navbar showSearch={false} />

      <div className="dashboard-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="section-title">Saved Scholarships</h2>
          <button onClick={() => navigate(-1)}>← Back</button>
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

                <span className="tag">{s.type}</span>
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