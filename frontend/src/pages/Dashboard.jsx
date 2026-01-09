import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import scholarships from "../data/scholarships";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    fetch(`http://localhost:8080/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Profile fetch error:", err));
  }, []);
  console.log("PROFILE FROM API:", profile);

  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
  const stored = localStorage.getItem("user");
  
  return stored ? JSON.parse(stored) : null;
});




// Dummy profile completion (you can change later)
const profileCompletion = 0;

  return (
    <>
      {/* ================= DASHBOARD NAVBAR ================= */}
      <nav className="dash-navbar">
        <div className="dash-logo">
          🎓 <span>ScholarAssist</span>
        </div>

        <div className="dash-nav-links">
          <NavLink to="/dashboard" className="dash-link">
            Dashboard
          </NavLink>

          <NavLink to="/saved" className="dash-link">
            Saved
          </NavLink>

          <NavLink to="/applications" className="dash-link">
            Applications
          </NavLink>

          <NavLink to="/profile" className="dash-link">
            Profile
          </NavLink>
        </div>
      </nav>

      {/* ================= DASHBOARD CONTENT ================= */}
      <div className="dashboard-container">
        {/* ================= HEADER ================= */}
        <div className="dashboard-header">
          <h1>
          Welcome back, {user ? user.name : "User"}!
        </h1>
          <p>Discover scholarships tailored to your profile</p>
        </div>

        {/* ================= STATS ================= */}
        <div className="stats-grid">
          <div className="stat-card">
            <p>Available</p>
            <h3>6</h3>
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

        {/* ================= SEARCH ================= */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search scholarships by name, provider, or tag..."
          />
          <select>
            <option>All Categories</option>
            <option>Technology</option>
            <option>Business</option>
            <option>Arts</option>
          </select>
        </div>

        {/* ================= SCHOLARSHIPS ================= */}
        <h3 className="section-title">Recommended for You</h3>

        <div className="scholarship-grid">
          {/* Card 1 */}
          <div className="scholarship-card">
            <span className="tag">Technology</span>
            <h4>Tech Excellence Scholarship</h4>
            <p className="provider">Tech Foundation</p>
            <p className="amount">$5,000</p>
            <p className="deadline">Deadline: 30/06/2024</p>
            <button>View Details</button>
          </div>

          {/* Card 2 */}
          <div className="scholarship-card">
            <span className="tag">Leadership</span>
            <h4>Future Leaders Grant</h4>
            <p className="provider">Leadership Institute</p>
            <p className="amount">$10,000</p>
            <p className="deadline">Deadline: 15/05/2024</p>
            <button>View Details</button>
          </div>

          {/* Card 3 */}
          <div className="scholarship-card">
            <span className="tag">STEM</span>
            <h4>Women in STEM Award</h4>
            <p className="provider">STEM Advancement Fund</p>
            <p className="amount">$7,500</p>
            <p className="deadline">Deadline: 20/07/2024</p>
            <button>View Details</button>
          </div>

          {/* Card 4 */}
          <div className="scholarship-card">
            <span className="tag">Community</span>
            <h4>Community Impact Scholarship</h4>
            <p className="provider">Community Foundation</p>
            <p className="amount">$3,000</p>
            <p className="deadline">Deadline: 10/08/2024</p>
            <button>View Details</button>
          </div>

          {/* Card 5 */}
          <div className="scholarship-card">
            <span className="tag">Business</span>
            <h4>Business Innovators Grant</h4>
            <p className="provider">Entrepreneur Network</p>
            <p className="amount">$6,000</p>
            <p className="deadline">Deadline: 06/07/2024</p>
            <button>View Details</button>
          </div>

          {/* Card 6 */}
          <div className="scholarship-card">
            <span className="tag">Arts</span>
            <h4>Arts & Creativity Award</h4>
            <p className="provider">Arts Council</p>
            <p className="amount">$4,500</p>
            <p className="deadline">Deadline: 25/07/2024</p>
            <button>View Details</button>
          </div>
        </div>
      </div>
    </>
  );
}
