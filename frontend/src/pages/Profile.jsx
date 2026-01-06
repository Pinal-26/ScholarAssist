import { NavLink } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  return (
    <>
      {/* ================= DASHBOARD NAVBAR ================= */}
      <nav className="dash-navbar">
        <div className="dash-logo">
          Scholar<span>Assist</span>
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

      {/* ================= PROFILE PAGE ================= */}
      <div className="profile-container">
        <h2>Profile Settings</h2>
        <p className="subtitle">
          Manage your personal information and preferences
        </p>

        {/* ================= PERSONAL INFO ================= */}
        <div className="profile-card">
          <h3>Personal Information</h3>

          <div className="form-grid">
            <div>
              <label>First Name</label>
              <input type="text" placeholder="John" />
            </div>

            <div>
              <label>Last Name</label>
              <input type="text" placeholder="Doe" />
            </div>

            <div>
              <label>Email</label>
              <input type="email" placeholder="john@example.com" />
            </div>

            <div>
              <label>Phone</label>
              <input type="text" placeholder="+91 98765 43210" />
            </div>
          </div>
        </div>

        {/* ================= ADDRESS ================= */}
        <div className="profile-card">
          <h3>Address</h3>

          <div className="form-grid">
            <div>
              <label>Street Address</label>
              <input type="text" placeholder="123 Main Street" />
            </div>

            <div>
              <label>City</label>
              <input type="text" placeholder="Ahmedabad" />
            </div>

            <div>
              <label>State</label>
              <input type="text" placeholder="Gujarat" />
            </div>

            <div>
              <label>Pincode</label>
              <input type="text" placeholder="380001" />
            </div>
          </div>
        </div>

        {/* ================= ACADEMIC INFO ================= */}
        <div className="profile-card">
          <h3>Academic Information</h3>

          <div className="form-grid">
            <div>
              <label>Institution</label>
              <input type="text" placeholder="ABC University" />
            </div>

            <div>
              <label>Course</label>
              <input type="text" placeholder="B.Tech Computer Science" />
            </div>

            <div>
              <label>GPA</label>
              <input type="text" placeholder="8.4" />
            </div>

            <div>
              <label>Graduation Year</label>
              <input type="text" placeholder="2026" />
            </div>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="profile-actions">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </>
  );
}
