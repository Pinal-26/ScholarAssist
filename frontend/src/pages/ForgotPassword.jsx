import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/authSplit.css";
import API_BASE_URL from "../config";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/forgot-password?email=${email}`,
        { method: "POST" }
      );

      const data = await res.text();

      if (!res.ok) {
        throw new Error(data);
      }

      alert("OTP sent to your email");

      navigate(`/reset-password?email=${email}`);

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="split-auth">

      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-left-inner">

          <h1>Forgot Password</h1>
          <p className="subtitle">
            Enter your registered email to receive a reset OTP
          </p>

          <form onSubmit={handleSubmit}>

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="sign-btn">
              Send OTP
            </button>

          </form>

          <p className="bottom-text">
            Remember your password?{" "}
            <span onClick={() => navigate("/login")}>
              Back to Login
            </span>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <h2>Reset Your Password Securely</h2>

        <div className="info-card">🔐
          <div>
            <h4>Secure Verification</h4>
            <p>OTP sent to your registered email</p>
          </div>
        </div>

        <div className="info-card">⏳
          <div>
            <h4>Time Limited</h4>
            <p>OTP valid for 5 minutes only</p>
          </div>
        </div>

        <div className="info-card">🚀
          <div>
            <h4>Quick Recovery</h4>
            <p>Reset and regain access instantly</p>
          </div>
        </div>

      </div>

    </div>
  );
}