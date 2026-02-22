import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../styles/authSplit.css";

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  // ================= NORMAL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

     if (!data.emailVerified) {
  navigate(`/verify-otp?email=${formData.email}`);
  return;
}

      localStorage.setItem("user", JSON.stringify(data));

      alert("Login successful");

      if (data.role === "ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  // ================= FIREBASE GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
  try {

    // 1️⃣ Firebase popup
    const result = await signInWithPopup(auth, provider);
    const firebaseUser = result.user;

    // 2️⃣ Get Firebase ID token
    const token = await firebaseUser.getIdToken();

    // 3️⃣ Send token to backend
    const res = await fetch(
      "http://localhost:8080/api/users/firebase-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      }
    );

   let data = null;

if (res.headers.get("content-length") !== "0") {
  data = await res.json();
}

if (!res.ok) {
  throw new Error(data?.message || "Google authentication failed");
}

    if (!res.ok) {
      throw new Error(data?.message || "Google authentication failed");
    }

    // 4️⃣ Save user
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", token);

    alert("Google Login Successful 🎉");

    if (data.role === "ADMIN") {
      navigate("/admindashboard");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  return (
    <div className="auth-page">
      <div className="split-auth">

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
              />

              <div className="password-row">
                <label>Password</label>
<span 
  className="forgot" 
  onClick={() => navigate("/forgot-password")}
>
  Forgot Password?
</span>                </div>

              <input
                type="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button type="submit" className="sign-btn">
                Sign In
              </button>

            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* 🔥 FIREBASE GOOGLE LOGIN */}
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

          </div>
        </div>

        {/* RIGHT SIDE unchanged */}
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
  );
}