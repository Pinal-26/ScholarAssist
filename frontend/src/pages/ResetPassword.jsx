import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/authSplit.css";

export default function ResetPassword() {

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`,
        { method: "POST" }
      );

      const data = await res.text();

      if (!res.ok) {
        throw new Error(data);
      }

      alert("Password reset successful 🎉");

      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="split-auth">

      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-left-inner">

          <h1>Reset Password</h1>
          <p className="subtitle">
            Enter the OTP sent to <b>{email}</b>
          </p>

          <form onSubmit={handleSubmit}>

            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button type="submit" className="sign-btn">
              Reset Password
            </button>

          </form>

          <p className="bottom-text">
            Back to{" "}
            <span onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <h2>Almost There!</h2>

        <div className="info-card">🔑
          <div>
            <h4>Enter OTP</h4>
            <p>Use the code sent to your email</p>
          </div>
        </div>

        <div className="info-card">🔒
          <div>
            <h4>Create Strong Password</h4>
            <p>Use at least 8 characters for better security</p>
          </div>
        </div>

        <div className="info-card">🚀
          <div>
            <h4>Access Restored</h4>
            <p>Login immediately after reset</p>
          </div>
        </div>

      </div>

    </div>
  );
}