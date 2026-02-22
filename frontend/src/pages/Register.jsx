import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import "../styles/authSplit.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    course: "",
    password: ""
  });

  // ================= NORMAL REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.text();

      if (!res.ok) {
        throw new Error(data);
      }

      alert("Registration successful! Please verify your email.");

      navigate(`/verify-otp?email=${formData.email}`);

    } catch (err) {
      alert(err.message);
    }
  };

  // ================= GOOGLE REGISTER =================
  const handleGoogleRegister = async () => {
    try {
      // 1️⃣ Open Google popup
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // 2️⃣ Get Firebase ID Token
      const token = await firebaseUser.getIdToken();

      // 3️⃣ Send token to backend
      const res = await fetch(
        "http://localhost:8080/api/users/firebase-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Google authentication failed");
      }

      // 4️⃣ Save user + token
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token);

      alert("Google Registration Successful 🎉");

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="split-auth">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>Create Account</h1>
        <p className="subtitle">
          Join <b>ScholarAssist</b> and unlock scholarship opportunities
        </p>

        {/* GOOGLE BUTTON */}
        <button className="google-btn" onClick={handleGoogleRegister}>
          <img
            className="google-logo"
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          <span>Continue with Google</span>
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* NORMAL REGISTER FORM */}
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your college email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label>College / University</label>
          <input
            type="text"
            placeholder="Your institution name"
            required
            value={formData.college}
            onChange={(e) =>
              setFormData({ ...formData, college: e.target.value })
            }
          />

          <label>Course / Branch</label>
          <input
            type="text"
            placeholder="Your course or branch"
            required
            value={formData.course}
            onChange={(e) =>
              setFormData({ ...formData, course: e.target.value })
            }
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button type="submit" className="sign-btn">
            Create Account
          </button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <h2>Why Join ScholarAssist?</h2>

        <div className="info-card">
          🎓
          <div>
            <h4>Personalized Scholarships</h4>
            <p>Get recommendations based on your profile</p>
          </div>
        </div>

        <div className="info-card">
          📊
          <div>
            <h4>Track Progress</h4>
            <p>Monitor applications and deadlines easily</p>
          </div>
        </div>

        <div className="info-card">
          🔔
          <div>
            <h4>Instant Alerts</h4>
            <p>Receive updates for new opportunities</p>
          </div>
        </div>

        <div className="info-card">
          🚀
          <div>
            <h4>Boost Your Career</h4>
            <p>Build a strong academic & professional profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}