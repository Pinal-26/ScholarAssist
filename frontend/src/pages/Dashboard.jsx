import { NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState, useCallback } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function Dashboard() {

  const navigate = useNavigate();
const [user] = useState(() =>
  JSON.parse(localStorage.getItem("user"))
);

  const [profile, setProfile] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [missingEligibilityFields, setMissingEligibilityFields] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [eligibleScholarships, setEligibleScholarships] = useState([]);
  const [savedIds, setSavedIds] = useState(
    JSON.parse(localStorage.getItem("savedScholarships")) || []
  );

  const fieldLabels = {
    parentIncome: "Parent Income",
    caste: "Caste",
    locality: "Locality",
    graduationYear: "Graduation Year",
    course: "Course",
    city: "City"
  };

  // ================= PROFILE COMPLETION =================
  const calculateProfileCompletion = (data) => {
    if (!data) return;

    const profileFields = [
      data.firstName,
      data.lastName,
      data.phone,
      data.street,
      data.city,
      data.state,
      data.pincode,
      data.institution,
      data.course,
      data.graduationYear,
      data.parentIncome,
      data.caste,
      data.locality
    ];

    const filled = profileFields.filter(
      v => v !== null && v !== undefined && v.toString().trim() !== ""
    ).length;

    setProfileCompletion(
      Math.round((filled / profileFields.length) * 100)
    );
  };

  // ================= CHECK ELIGIBILITY =================
  const checkEligibilityFields = (data) => {
    if (!data) return;

    const eligibilityRequired = {
      parentIncome: data.parentIncome,
      caste: data.caste,
      locality: data.locality,
      graduationYear: data.graduationYear,
      course: data.course,
      city: data.city
    };

    const missing = [];

    Object.entries(eligibilityRequired).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value.toString().trim() === ""
      ) {
        missing.push(key);
      }
    });

    setMissingEligibilityFields(missing);
  };

  // ================= SAFE FETCH =================
  const safeFetchJSON = useCallback(async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) return null;

    const text = await res.text();
    if (!text) return null;

    return JSON.parse(text);
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}, []);


  // ================= LOAD ALL SCHOLARSHIPS =================
// ================= LOAD ALL SCHOLARSHIPS =================
useEffect(() => {

  const loadAll = async () => {
    try {

      const dbRes = await fetch("http://localhost:8080/api/scholarships");
      const dbData = dbRes.ok ? await dbRes.json() : [];

      const scrapeRes = await fetch("http://localhost:8080/api/scrape");
      const scrapedData = scrapeRes.ok ? await scrapeRes.json() : [];

      const combined = [
        ...(dbData || []),
        ...(scrapedData || []).map((item, index) => ({
          ...item,
          id: item.id ? `scraped-${item.id}` : `scraped-${index}`
        }))
      ];

      setScholarships(combined);

    } catch (error) {
      console.error("Error loading scholarships:", error);
      setScholarships([]);
    }
  };

  loadAll();

}, []);



  // ================= FETCH PROFILE =================
  useEffect(() => {
    if (!user) return;

    safeFetchJSON(`http://localhost:8080/api/profile/${user.id}`)
      .then(data => {
        if (!data) return;

        setProfile(data);
        calculateProfileCompletion(data);
        checkEligibilityFields(data);
      });
  }, [user]);

  // ================= FETCH ELIGIBLE =================
  useEffect(() => {
    if (!user) return;

    safeFetchJSON(
      `http://localhost:8080/api/scholarships/eligible/${user.id}`
    ).then(data => {
      if (data) setEligibleScholarships(data);
    });
  }, [user]);

  // ================= SAVE / UNSAVE =================
  const toggleSave = (id) => {
    let updated;

    if (savedIds.includes(id)) {
      updated = savedIds.filter(sid => sid !== id);
    } else {
      updated = [...savedIds, id];
    }

    setSavedIds(updated);
    localStorage.setItem("savedScholarships", JSON.stringify(updated));
  };
console.log("Profile:", profile);
console.log("Scholarships:", scholarships);
console.log("Eligible:", eligibleScholarships);
console.log("Missing Fields:", missingEligibilityFields);

  return (
    <>
      <nav className="dash-navbar">
        <div className="dash-logo">
          🎓 <span>ScholarAssist</span>
        </div>

        <div className="dash-nav-links">
          <NavLink to="/dashboard" className="dash-link">Dashboard</NavLink>
          <NavLink to="/saved" className="dash-link">Saved</NavLink>
          <NavLink to="/applications" className="dash-link">Applications</NavLink>
          <NavLink to="/profile" className="dash-link">Profile</NavLink>
        </div>
      </nav>

      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>Welcome back, {user ? user.name : "User"}!</h1>
          <p>Discover scholarships tailored to your profile</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Available</p>
            <h3>{scholarships.length}</h3>
          </div>

          <div className="stat-card">
            <p>Saved</p>
            <h3>{savedIds.length}</h3>
          </div>

          <div className="stat-card">
            <p>Applications</p>
            <h3>3</h3>
          </div>

          <div className="stat-card">
            <p>Profile</p>
            <h3>{profileCompletion}%</h3>

            {(profileCompletion < 100 || missingEligibilityFields.length > 0) && (
              <button
                className="complete-profile-btn"
                onClick={() => navigate("/profile")}
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {/* ================= ELIGIBLE ================= */}

        <h3 className="section-title">Eligible Scholarships</h3>

        {missingEligibilityFields.length > 0 ? (
          <div className="profile-warning">
            <p>⚠ Please complete these fields to check eligibility:</p>
            <ul>
              {missingEligibilityFields.map((field, index) => (
                <li key={`missing-${index}`}>
                  {fieldLabels[field]}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate("/profile")}>
              Go to Profile
            </button>
          </div>
        ) : eligibleScholarships.length === 0 ? (
          <p style={{ color: "#777" }}>
            No eligible scholarships found.
          </p>
        ) : (
          <div className="scholarship-grid">
            {eligibleScholarships.map((s, index) => (
              <div
                key={s.id ? `eligible-${s.id}` : `eligible-${index}`}
                className="scholarship-card"
              >

                <span
                  className="bookmark"
                  onClick={() => toggleSave(s.id)}
                >
                  {savedIds.includes(s.id)
                    ? <FaBookmark color="#f5b301" />
                    : <FaRegBookmark />}
                </span>

                <span className="tag">{s.category}</span>
                <h4>{s.title}</h4>
                <p className="amount">₹{s.amount}</p>
                <p className="deadline">Deadline: {s.deadline}</p>

                <button onClick={() => navigate(`/scholarship/${s.id}`)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ================= ALL ================= */}

        <h3 className="section-title">All Scholarships</h3>

        {scholarships.length === 0 ? (
          <p style={{ color: "#777" }}>No scholarships found.</p>
        ) : (
          <div className="scholarship-grid">
            {scholarships.map((s, index) => (
              <div
                key={s.id ? `all-${s.id}` : `all-${index}`}
                className="scholarship-card"
              >

                <span
                  className="bookmark"
                  onClick={() => toggleSave(s.id)}
                >
                  {savedIds.includes(s.id)
                    ? <FaBookmark color="#f5b301" />
                    : <FaRegBookmark />}
                </span>

                <span className="tag">{s.category}</span>
                <h4>{s.title}</h4>
                <p className="amount">₹{s.amount}</p>
                <p className="deadline">Deadline: {s.deadline}</p>

                <button onClick={() => navigate(`/scholarship/${s.id}`)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
