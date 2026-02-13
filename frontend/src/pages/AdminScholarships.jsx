import { useEffect, useState } from "react";
import "../styles/adminScholarships.css";

export default function AdminScholarships() {

  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/scholarships")
      .then(res => res.json())
      .then(data => setScholarships(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/scholarships/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setScholarships(scholarships.filter(s => s.id !== id));
    });
  };

  return (
    <div className="admin-scholarships-container">

      <div className="admin-scholarships-header">
        <h2>Manage Scholarships</h2>
        <p>View and manage all available scholarships</p>
      </div>

      <div className="scholarship-list">
        {scholarships.map(s => (
          <div key={s.id} className="scholarship-card">

            <div className="card-top">
              <h3>{s.title}</h3>
              <span className="category-badge">{s.category}</span>
            </div>

            <p className="description">{s.description}</p>

            <div className="details-grid">
              <p><strong>Amount:</strong> ₹{s.amount}</p>
              <p><strong>Min GPA:</strong> {s.minGpa}</p>
              <p><strong>Max Income:</strong> {s.maxIncome}</p>
            </div>

            <button
              onClick={() => handleDelete(s.id)}
              className="delete-btn"
            >
              🗑 Delete
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}