import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  const [active, setActive] = useState("home");

  // 🌙 Dark Mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Load theme from localStorage
 useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  // Toggle theme
  const toggleTheme = () => {
    if (darkMode) {
      setDarkMode(false);
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setDarkMode(true);
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Active section highlight
  useEffect(() => {
    const sections = ["home", "why", "features", "trusted", "footer-bottom"];

    const handleScroll = () => {
      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          setActive(sec);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="navbar">
        <div className="logo">
          🎓 <span>ScholarAssist</span>
        </div>

        <div className="nav-links">
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
            className={`nav-btn ${active === "footer-bottom" ? "active" : ""}`}
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

          {/* 🌙 THEME TOGGLE */}
          <button className="theme-btn" onClick={toggleTheme}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section id="home" className="hero">
        <div className="hero-content">
          {/* <div className="badge">✨ AI Powered Scholarship Platform</div> */}

          <h1>
            Find Scholarships <span>Smarter</span> & Apply Faster 🚀
          </h1>

          <p>
            ScholarAssist helps you discover the best scholarships, track your
            applications, and never miss deadlines — all in one place.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn big"
              onClick={() => navigate("/register")}
            >
              Get Started Free
            </button>

            <button className="secondary-btn" onClick={() => scrollTo("why")}>
              Learn More ↓
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <h3>50+</h3>
              <p>Scholarships</p>
            </div>
        </div>

        <div className="hero-cards">
          <div className="floating-card">
            <h3>📌 Personalized Matches</h3>
            <p>Scholarships based on your profile.</p>
          </div>

          <div className="floating-card">
            <h3>⏰ Deadline Alerts</h3>
            <p>Never miss an important date.</p>
          </div>

          <div className="floating-card">
            <h3>📄 Document Ready</h3>
            <p>Manage all documents in one dashboard.</p>
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
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
            <p>AI-powered recommendations tailored to your profile.</p>
          </div>

          <div className="why-card">
            <div className="why-icon gradient-purple">📄</div>
            <h3>Unified Dashboard</h3>
            <p>Track all applications, documents, and progress in one place.</p>
          </div>

          <div className="why-card">
            <div className="why-icon gradient-orange">🔔</div>
            <h3>Deadline Alerts</h3>
            <p>Never miss deadlines with timely notifications.</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
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

      {/* ================= FOOTER ================= */}
      <footer className="footer-main">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>Address</h3>
            <div className="footer-line"></div>
            <p>
              ScholarAssist Foundation <br />
              Department of Information Technology <br />
              Faculty of Technology <br />
              Nadiad, Gujarat – 387001, India
            </p>
          </div>

          <div className="footer-col">
            <h3>For General Query</h3>
            <div className="footer-line"></div>
            <p>📧 scholarassist0326@gmail.com</p>
            <p>📞 +91 9081853952</p>
          </div>

          <div className="footer-col">
            <h3>For Technical Query</h3>
            <div className="footer-line"></div>
            <p>📧 scholarassist0326@gmail.com</p>
            <p>📞 +91 6352174737</p>
          </div>

          <div className="footer-col">
            <h3>Important Links</h3>
            <div className="footer-line"></div>

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

      <div id="footer-bottom">
        <p>
          © 2025 Website Managed & Maintained by <b>ScholarAssist Team</b> |
          Building digital solutions for education access
        </p>
      </div>
    </>
  );
}
