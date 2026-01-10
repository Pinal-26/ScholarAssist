import { useNavigate } from "react-router-dom";
import "../styles/authSplit.css";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
const [formData, setFormData] = useState({
  name: "",
  email: "",
  college: "",
  course: "",
  password: ""
});

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Registration failed");
    }

    alert("Account created successfully");
    navigate("/login");
  } catch (err) {
    alert(err.message);
  }
};


  // ✅ GOOGLE REGISTER HANDLER
  const handleGoogleRegister = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="split-auth">
      {/* LEFT */}
      <div className="auth-left">
        <h1>Create Account</h1>
        <p className="subtitle">
          Join <b>ScholarAssist</b> and unlock scholarship opportunities
        </p>

        {/* ✅ GOOGLE REGISTER BUTTON */}
        <button className="google-btn" onClick={handleGoogleRegister}>
          <img
            className="google-logo"
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          <span>Continue with Google</span>
        </button>

        {/* OR divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        <form onSubmit={handleSubmit}>
  <label>Full Name</label>
  <input
    type="text"
    name="name"
    placeholder="Enter your full name"
    required
    onChange={(e) =>
      setFormData({ ...formData, name: e.target.value })
    }
  />

  <label>Email Address</label>
  <input
    type="email"
    name="email"
    placeholder="Enter your college email"
    required
    onChange={(e) =>
      setFormData({ ...formData, email: e.target.value })
    }
  />

  <label>College / University</label>
  <input
    type="text"
    name="college"
    placeholder="Your institution name"
    required
    onChange={(e) =>
      setFormData({ ...formData, college: e.target.value })
    }
  />

  <label>Course / Branch</label>
  <input
    type="text"
    name="course"
    placeholder="Your course or branch"
    required
    onChange={(e) =>
      setFormData({ ...formData, course: e.target.value })
    }
  />

  <label>Password</label>
  <input
    type="password"
    name="password"
    placeholder="Create a password"
    required
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
          <span onClick={() => navigate("/login")}>Sign in</span>
        </p>
      </div>

      {/* RIGHT */}
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
