import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";

export default function Navbar({ searchTerm, setSearchTerm, showSearch = true }) {
  return (
    <nav className="dash-navbar">

      <div className="dash-logo">
        🎓 <span>ScholarAssist</span>
      </div>

      <div style={{ flex: 1 }}></div>

      {/* ✅ Only show search if allowed */}
      {showSearch && (
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search scholarships..."
            className="navbar-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="dash-nav-links">
        <NavLink to="/dashboard" className="dash-link">Dashboard</NavLink>
        <NavLink to="/saved" className="dash-link">Saved</NavLink>
        <NavLink to="/applications" className="dash-link">Applications</NavLink>
        <NavLink to="/profile" className="dash-link">Profile</NavLink>
      </div>

    </nav>
  );
}
