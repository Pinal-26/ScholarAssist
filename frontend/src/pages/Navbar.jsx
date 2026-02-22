import { NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { FiLogOut } from "react-icons/fi";

export default function Navbar({ searchTerm, setSearchTerm, showSearch = true }) {

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/", { replace: true });
};


  return (
    <nav className="dash-navbar">

      <div className="dash-logo">
        🎓 <span>ScholarAssist</span>
      </div>

      <div style={{ flex: 1 }}></div>

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

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut size={20} />
        </button>
      </div>

    </nav>
  );
}
