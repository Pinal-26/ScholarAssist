import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/verifyOtp.css";

export default function VerifyOtp() {

  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/verify-otp?email=${email}&otp=${otp}`,
        { method: "POST" }
      );

      const message = await res.text();

      if (!res.ok || message !== "Email verified successfully") {
        alert(message);
        return;
      }

      alert("Email verified successfully!");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Verify Your Email</h2>
        <p className="verify-subtitle">
          Enter OTP sent to <span>{email}</span>
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button type="submit" className="verify-btn">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}