import { useNavigate } from "react-router-dom";
import "../styles/authSplit.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admindashboard");
  };

  return (
    <div className="auth-page">
      <div className="split-auth">

        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-inner">

            <h1>Admin Login</h1>
            <p className="subtitle">
              Access the <b>ScholarAssist</b> admin panel
            </p>

            <form onSubmit={handleSubmit}>
              <label>Admin Email</label>
              <input type="email" placeholder="Enter admin email" required />

              <label>Password</label>
              <input type="password" placeholder="Enter password" required />

              <button type="submit" className="sign-btn">
                Login as Admin
              </button>
            </form>

            <p className="bottom-text">
              <span onClick={() => navigate("/login")}>
                ← Back to User Login
              </span>
            </p>

          </div>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          <h2>Admin Control Panel</h2>

          <div className="info-card">
            🛠️
            <div>
              <h4>Manage Scholarships</h4>
              <p>Add, update, and remove scholarships</p>
            </div>
          </div>

          <div className="info-card">
            📊
            <div>
              <h4>View Analytics</h4>
              <p>Track applications and user activity</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
