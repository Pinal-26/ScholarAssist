import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="logo">
          🎓 <span>ScholarAssist</span>
        </div>

          <div>
          <button
            className={`nav-btn ${active === "home" ? "active" : ""}`}
            onClick={() => scrollTo("home")}
          >
            Home
          </button>

          <button
            className={`nav-btn ${active === "why" ? "active" : ""}`}
            onClick={() => scrollTo("why")}
          >
            Why Us
          </button>

          <button
            className={`nav-btn ${active === "features" ? "active" : ""}`}
            onClick={() => scrollTo("features")}
          >
            Features
          </button>

          <button
            className={`nav-btn ${active === "trusted" ? "active" : ""}`}
            onClick={() => scrollTo("trusted")}
          >
            Trusted By
          </button>

          <button
            className={`nav-btn ${active === "contact" ? "active" : ""}`}
            onClick={() => scrollTo("footer-bottom")}
          >
            Contact
          </button>

          <button className="link-btn" onClick={() => navigate("/login")}>
            Log In
          </button>

          <button className="primary-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="hero">
        <h1>Get started in minutes</h1>
        <p>Three simple steps to unlock your scholarship opportunities</p>

        <div className="steps">
          <div className="step">
            <span>1</span>
            <h3>Create Your Profile</h3>
            <p>Share your academic background and interests.</p>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Discover Matches</h3>
            <p>Get personalized scholarship recommendations.</p>
          </div>

          <div className="step">
            <span>3</span>
            <h3>Apply & Track</h3>
            <p>Apply easily and track your progress.</p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="why" id="why">
        <h2>
          Why choose <span>ScholarAssist</span>?
        </h2>
        <p className="why-subtitle">
          Everything you need to discover, apply, and succeed — in one platform.
        </p>

        <div className="why-cards">
          <div className="why-card">
            <div className="why-icon gradient-blue">🚀</div>
            <h3>Smart Matching</h3>
            <p>
              AI-powered scholarship recommendations tailored to your academic
              profile.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon gradient-purple">📄</div>
            <h3>Unified Dashboard</h3>
            <p>
              Track all applications, documents, and progress in one place.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon gradient-orange">🔔</div>
            <h3>Deadline Alerts</h3>
            <p>
              Never miss important dates with timely notifications and reminders.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DIFFERENCE ================= */}
      <section id="features" className="difference">
        <h2>What makes us different?</h2>
        <p className="diff-subtitle">
          Designed to simplify your scholarship journey with clarity and focus.
        </p>

        <div className="diff-cards">
          <div className="diff-card">
            <div className="diff-icon">🎯</div>
            <h3>Personalized Results</h3>
            <p>Scholarships matched specifically to your academic profile.</p>
          </div>

          <div className="diff-card">
            <div className="diff-icon">📊</div>
            <h3>Track Everything</h3>
            <p>Monitor applications, deadlines, and status in one place.</p>
          </div>

          <div className="diff-card">
            <div className="diff-icon">🧠</div>
            <h3>Smart Insights</h3>
            <p>Improve your chances with data-driven recommendations.</p>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED ================= */}
      <section id="trusted" className="trusted">
        <h2>Trusted by Institutions</h2>

        <div className="logo-strip">
          <div className="logo-card">🎓 Universities</div>
          <div className="logo-card">🏛️ Government</div>
          <div className="logo-card">📘 NGOs</div>
          <div className="logo-card">💼 Corporates</div>
          <div className="logo-card">🌍 Global</div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats">
        <div className="stat">
          <h2>50K+</h2>
          <p>Students Helped</p>
        </div>

        <div className="stat">
          <h2>2K+</h2>
          <p>Scholarships</p>
        </div>

        <div className="stat">
          <h2>95%</h2>
          <p>Success Rate</p>
        </div>
      </section>

      {/* ================= CTA ================= */}
            {/* ================= VISITOR COUNTER ================= */}
      

      {/* ================= FOOTER ================= */}
      <footer  className="footer-main">
        <div className="footer-grid">
          
          {/* Address */}
          <div className="footer-col">
            <h3>Address</h3>
            <div className="footer-line"></div>
            <p>
              ScholarAssist Foundation<br />
              Department of Information Technology<br />
              Faculty of Technology<br />
              Nadiad, Gujarat – 387001, India
            </p>
          </div>

          {/* General Query */}
          <div className="footer-col">
            <h3>For General Query</h3>
            <div className="footer-line"></div>
            <p>📧 support@scholarassist.com</p>
            <p>📞 +91 11 2345 6789</p>
          </div>

          {/* Technical Query */}
          <div className="footer-col">
            <h3>For Technical Query</h3>
            <div className="footer-line"></div>
            <p>📧 tech@scholarassist.com</p>
            <p>📞 +91 79 1234 5678</p>
          </div>

          {/* Important Links */}
          <div className="footer-col">
            <h3>Important Links</h3>
            {/* ===== Social Media Icons ===== */}
<div className="social-icons">
  <a
    href="https://www.instagram.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
  >
    <i className="fab fa-instagram"></i>
  </a>

  <a
    href="https://twitter.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="Twitter"
  >
    <i className="fab fa-twitter"></i>
  </a>

  <a
    href="https://www.linkedin.com/"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
  >
    <i className="fab fa-linkedin-in"></i>
  </a>
</div>
          </div>

        </div>
      </footer>

      {/* ================= COPYRIGHT ================= */}
      <div id="footer-bottom">
        <p>
          © 2025 Website Managed & Maintained by <b>ScholarAssist Team</b> |
          Building digital solutions for education access
        </p>
      </div>

    </>
  );
}
