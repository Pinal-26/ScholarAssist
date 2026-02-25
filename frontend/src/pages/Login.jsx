import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../styles/authSplit.css";
import API_BASE_URL from "../config";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // Clear old session on load
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  // ================= NORMAL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // If email not verified
      if (!data.emailVerified) {
        navigate(`/verify-otp?email=${formData.email}`);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();

      const res = await fetch(
        `${API_BASE_URL}/api/users/firebase-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Google authentication failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);

      if (data.role === "ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOADING DIALOG =================
  const LoadingDialog = () => {
    if (!loading) return null;

    return (
      <div className="loading-overlay">
        <div className="loading-box">
          <div className="spinner"></div>
          <h3>✨ Signing You In...</h3>
          <p>Our server is preparing your dashboard.</p>
          <small>Please wait patiently 🤍</small>
        </div>
      </div>
    );
  };

  return (
    <>
      <LoadingDialog />

      <div className="auth-page">
        <div className="split-auth">

          {/* LEFT SIDE */}
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={loading}
                />

                <div className="password-row">
                  <label>Password</label>
                  <span
                    className="forgot"
                    onClick={() => !loading && navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </span>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={loading}
                />

                <button
                  type="submit"
                  className="sign-btn"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Sign In"}
                </button>

              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <button
                className="google-btn"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <img
                  className="google-logo"
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                />
                <span>
                  {loading ? "Signing in..." : "Continue with Google"}
                </span>
              </button>

              <p className="bottom-text">
                Don’t have an account?{" "}
                <span onClick={() => !loading && navigate("/register")}>
                  Sign up now
                </span>
              </p>

              <p className="bottom-text">
                Are you an Admin?{" "}
                <span
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => !loading && navigate("/admin/login")}
                >
                  Login here
                </span>
              </p>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="auth-right">
            <h2>Continue Your Journey</h2>

            <div className="info-card">🎯
              <div>
                <h4>View Eligible Scholarships</h4>
                <p>Scholarships matched to your profile</p>
              </div>
            </div>

            <div className="info-card">📄
              <div>
                <h4>Manage Documents</h4>
                <p>Upload once, reuse everywhere</p>
              </div>
            </div>

            <div className="info-card">🕒
              <div>
                <h4>Track Deadlines</h4>
                <p>Never miss important dates</p>
              </div>
            </div>

            <div className="info-card">🚀
              <div>
                <h4>Resume Applications</h4>
                <p>Continue where you left off</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}