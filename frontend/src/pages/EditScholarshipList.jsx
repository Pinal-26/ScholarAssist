import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

export default function EditScholarshipList() {

  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/scholarships")
      .then(res => res.json())
      .then(data => setScholarships(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-dashboard">
      <h2 className="section-title">Edit Scholarships</h2>

      <div className="admin-grid">
        {scholarships.map(s => (
          <div key={s.id} className="admin-card">
            <h3>{s.title}</h3>
            <p>₹{s.amount}</p>

            <button
              className="admin-btn"
              onClick={() => navigate(`/admin/edit-scholarship/${s.id}`)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}