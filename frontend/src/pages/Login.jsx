import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/authSplit.css";
import { useEffect } from "react";
export default function Login() {
    const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
useEffect(() => {
  localStorage.removeItem("user");
}, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      throw new Error("Invalid email or password");
    }
const user = await res.json();
localStorage.removeItem("profileSaved");
localStorage.removeItem("eligibleScholarships");
// ✅ overwrite old user
localStorage.setItem("user", JSON.stringify(user));


    alert("Login successful");
    navigate("/dashboard");
  } catch (err) {
    alert(err.message);
  }
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
  <input
    type="email"
    placeholder="Enter your email"
    required
    onChange={(e) =>
      setFormData({ ...formData, email: e.target.value })
    }
  />

  <div className="password-row">
    <label>Password</label>
    <span className="forgot">Forgot Password?</span>
  </div>

  <input
    type="password"
    placeholder="Enter your password"
    required
    onChange={(e) =>
      setFormData({ ...formData, password: e.target.value })
    }
  />

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
