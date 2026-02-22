import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function GoogleLogin() {

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {

      // 1️⃣ Login with Google using Firebase
      const result = await signInWithPopup(auth, provider);

      const firebaseUser = result.user;

      // 2️⃣ Get Firebase ID Token
      const token = await firebaseUser.getIdToken();

      // 3️⃣ Send token to Spring Boot
      const response = await fetch(
        "http://localhost:8080/api/users/firebase-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token })
        }
      );

      if (!response.ok) {
        throw new Error("Backend authentication failed");
      }

      const userData = await response.json();

      // 4️⃣ Save user + token
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      alert("Google Login Successful 🎉");

      // 5️⃣ Redirect based on role
      if (userData.role === "ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Login with Google</h2>

      <button
        onClick={handleGoogleLogin}
        style={{
          padding: "12px 25px",
          borderRadius: "30px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(145deg, #4285F4, #34A853)",
          color: "white",
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        Continue with Google
      </button>
    </div>
  );
}