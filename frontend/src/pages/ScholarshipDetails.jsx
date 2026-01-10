import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/scholarships/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Scholarship not found");
        }
        return res.json();
      })
      .then(data => {
        setScholarship(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading scholarship details...</p>;
  }

  if (!scholarship) {
    return <p style={{ padding: "20px" }}>Scholarship not found.</p>;
  }

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

      {/* ================= DETAILS ================= */}
      <div className="dashboard-container">
        <h2 className="section-title">{scholarship.title}</h2>

        <div className="scholarship-card" style={{ maxWidth: "800px" }}>
          <span className="tag">{scholarship.category}</span>

          <p><b>Provider:</b> {scholarship.provider}</p>
          <p><b>Amount:</b> ₹{scholarship.amount}</p>
          <p><b>Deadline:</b> {scholarship.deadline}</p>

          <hr />

          <h4>Description</h4>
          <p>{scholarship.description}</p>

          <h4>Eligibility</h4>
          <p>{scholarship.eligibility}</p>

          <div style={{ marginTop: "20px" }}>
            <a
              href={scholarship.applyLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Apply Now</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
