import { useNavigate } from "react-router-dom";
import "../styles/authSplit.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  // ✅ GOOGLE LOGIN HANDLER
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="auth-page">
      <div className="split-auth">

        {/* LEFT */}
        <div className="auth-left">
          <div className="auth-left-inner">

            <h1>Welcome Back</h1>
            <p className="subtitle">
              Sign in to your <b>ScholarAssist</b> account
            </p>

            <form onSubmit={handleSubmit}>
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" required />

              <div className="password-row">
                <label>Password</label>
                <span className="forgot">Forgot Password?</span>
              </div>

              <input type="password" placeholder="Enter your password" required />

              <button type="submit" className="sign-btn">
                Sign In
              </button>
            </form>

            {/* 🔹 OR Divider */}
            <div className="divider">
              <span>OR</span>
            </div>

            {/* ✅ GOOGLE LOGIN BUTTON */}
            <button className="google-btn" onClick={handleGoogleLogin}>
  <img
    className="google-logo"
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
  />
  <span>Continue with Google</span>
</button>

            <p className="bottom-text">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/register")}>
                Sign up now
              </span>
            </p>

            <p className="admin-link">
              Are you an admin?{" "}
              <span onClick={() => navigate("/admin/login")}>
                Admin Login
              </span>
            </p>

          </div>
        </div>

        {/* RIGHT (UNCHANGED) */}
        <div className="auth-right">
          <h2>Continue Your Journey</h2>

          <div className="info-card">
            🎯
            <div>
              <h4>View Eligible Scholarships</h4>
              <p>Scholarships matched to your profile</p>
            </div>
          </div>

          <div className="info-card">
            📄
            <div>
              <h4>Manage Documents</h4>
              <p>Upload once, reuse everywhere</p>
            </div>
          </div>

          <div className="info-card">
            🕒
            <div>
              <h4>Track Deadlines</h4>
              <p>Never miss important dates</p>
            </div>
          </div>

          <div className="info-card">
            🚀
            <div>
              <h4>Resume Applications</h4>
              <p>Continue where you left off</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
