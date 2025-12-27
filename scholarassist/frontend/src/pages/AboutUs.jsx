import "./about.css";

export default function AboutUs() {
  return (
    <>
      {/* ================= ABOUT HERO ================= */}
      <section className="about-hero">
        <h1>About ScholarAssist</h1>
        <p>
          A technology-driven platform enabling access to educational
          scholarships and financial assistance.
        </p>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          <strong>ScholarAssist</strong> is a digital scholarship discovery and
          management platform designed to help students find and apply for
          educational financial assistance with ease. The platform bridges the
          gap between deserving students and scholarship providers by offering a
          transparent, centralized, and user-friendly system.
        </p>

        <p>
          With increasing education costs, many capable students are unable to
          pursue higher education due to financial constraints. ScholarAssist
          aims to solve this problem by simplifying scholarship access through
          modern web technologies.
        </p>

        <h2>ScholarAssist for Students</h2>
        <p>
          ScholarAssist enables students to explore and apply for scholarships
          that match their academic profile and eligibility. Through a single
          dashboard, students can:
        </p>

        <ul>
          <li>Search and discover relevant scholarship schemes</li>
          <li>Apply online through a unified platform</li>
          <li>Track application status and deadlines</li>
          <li>Maintain a centralized academic profile</li>
        </ul>

        <h2>ScholarAssist for Institutions & Providers</h2>
        <p>
          The platform also supports educational institutions, NGOs, trusts, and
          corporate organizations in designing and managing scholarship
          programs. Providers can:
        </p>

        <ul>
          <li>Create and manage scholarship schemes</li>
          <li>Define eligibility and selection criteria</li>
          <li>Review student applications digitally</li>
          <li>Ensure transparent and efficient fund disbursement</li>
        </ul>

        <h2>How ScholarAssist Works</h2>
        <ol>
          <li>Students register and create their academic profile</li>
          <li>System recommends scholarships based on eligibility</li>
          <li>Students apply and track applications online</li>
          <li>Providers review, select, and disburse scholarships</li>
        </ol>

        <h2>Vision & Mission</h2>

        <p>
          <strong>Vision:</strong> To build an inclusive digital ecosystem that
          ensures equal access to educational opportunities for every deserving
          student.
        </p>

        <p>
          <strong>Mission:</strong>
        </p>

        <ul>
          <li>Simplify scholarship discovery and application</li>
          <li>Enhance transparency in scholarship management</li>
          <li>Leverage technology to empower students</li>
          <li>Support institutions in promoting education and skill development</li>
        </ul>

        <h2>About the Project</h2>
        <p>
          ScholarAssist is developed as an academic project with a focus on
          solving real-world challenges in education finance. The platform
          demonstrates practical implementation of frontend development,
          UI/UX design, and system architecture concepts.
        </p>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="about-footer">
        <p>Email: support@scholarassist.com</p>
        <p>Location: India</p>

        <div className="footer-links">
          <span>Privacy Policy</span> | <span>Terms of Use</span> |{" "}
          <span>About Us</span> | <span>Contact Us</span>
        </div>

        <p className="copyright">
          © 2025 ScholarAssist. All rights reserved.
        </p>
      </footer>
    </>
  );
}
