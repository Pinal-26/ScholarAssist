import { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import API_BASE_URL from "../config";

export default function AdminScholarships() {

  const [scholarships, setScholarships] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  // ================= FETCH SCHOLARSHIPS =================
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/scholarships`)
      .then(res => res.json())
      .then(data => setScholarships(data || []))
      .catch(err => console.error("Error loading scholarships:", err));
  }, []);

  // ================= SEARCH FILTER =================
  const filteredScholarships = scholarships.filter((s) => {
    if (!searchTerm.trim()) return true;

    const text = (s.title + " " + s.category).toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h1>All Scholarships</h1>
      </div>

      {/* SEARCH BAR */}
      <div style={{ margin: "20px 0", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search scholarships..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {filteredScholarships.length === 0 ? (
        <p style={{ color: "#777", textAlign: "center" }}>
          No scholarships found.
        </p>
      ) : (
        <>
          <div className="scholarship-grid">
            {filteredScholarships
              .slice(0, visibleCount)
              .map((s, index) => (
                <div
                  key={s.id ? `admin-${s.id}` : `admin-${index}`}
                  className="scholarship-card"
                >
                  <span className="tag">{s.type}</span>
                  <h4>{s.title}</h4>
                  <p className="amount">₹{s.amount}</p>
                  <p className="deadline">
                    Deadline: {s.deadline}
                  </p>

                  <p style={{ fontSize: "14px", marginTop: "10px" }}>
                    {s.description?.substring(0, 100)}...
                  </p>
                </div>
              ))}
          </div>

          {/* LOAD MORE BUTTON */}
          {visibleCount < filteredScholarships.length && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1f6f8b",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Load More Scholarships
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
}