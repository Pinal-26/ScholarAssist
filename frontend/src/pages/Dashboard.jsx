import { NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState, useCallback } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Navbar from "./Navbar";
export default function Dashboard() {

  const navigate = useNavigate();

  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [, setProfile] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [missingEligibilityFields, setMissingEligibilityFields] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [eligibleScholarships, setEligibleScholarships] = useState([]);
  const [savedIds, setSavedIds] = useState(
    JSON.parse(localStorage.getItem("savedScholarships")) || []
  );

  // ✅ SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  const fieldLabels = {
    parentIncome: "Parent Income",
    caste: "Caste",
    locality: "Locality",
    graduationYear: "Graduation Year",
    course: "Course",
    city: "City"
  };

  // ================= APPLY SCHOLARSHIP =================
  const applyScholarship = async (scholarship) => {

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: { id: user.id },
          scholarship: { id: scholarship.id },
          applicationLink: scholarship.applyLink
        })
      });

      const message = await response.text();
      alert(message);

      window.open(scholarship.applyLink, "_blank");

    } catch (error) {
      console.error("Apply error:", error);
      alert("Failed to apply.");
    }
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
      if (!value || value.toString().trim() === "") {
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
  useEffect(() => {
    const loadScholarships = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/scholarships");
        if (!response.ok) throw new Error("Failed to fetch scholarships");
        const data = await response.json();
        setScholarships(data || []);
      } catch (error) {
        console.error("Error loading scholarships:", error);
        setScholarships([]);
      }
    };

    loadScholarships();
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

  // ================= FIRST LETTER SEARCH LOGIC =================

  const matchesSearch = (text) => {
    if (!searchTerm.trim()) return true;

    const words = text.toLowerCase().split(" ");
    const search = searchTerm.toLowerCase();

    return words.some(word => word.startsWith(search));
  };

  const filteredEligible = eligibleScholarships.filter(
    (s) =>
      matchesSearch(s.title) ||
      matchesSearch(s.category)
  );

  const filteredAll = scholarships.filter(
    (s) =>
      matchesSearch(s.title) ||
      matchesSearch(s.category)
  );

  return (
    <>

<Navbar 
  searchTerm={searchTerm} 
  setSearchTerm={setSearchTerm} 
/>

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
<div className="eligibility-alert">
  <div className="alert-header">
    ⚠ <strong>Important Eligibility Criteria Missing</strong>
  </div>

  <p>
    To accurately determine your scholarship eligibility, please complete
    the following required fields:
  </p>

  <ul>
    {missingEligibilityFields.map((field, index) => (
      <li key={index}> {field}</li>
    ))}
  </ul>

  <p className="alert-note">
    Incomplete profile information may affect scholarship recommendations.
  </p>

  <button
    className="profile-btn"
    onClick={() => navigate("/profile")}
  >
    Complete Profile
  </button>
</div>

        <h3 className="section-title">Eligible Scholarships</h3>

        {filteredEligible.length === 0 ? (
          <p style={{ color: "#777" }}>No matching scholarships found.</p>
        ) : (
          <div className="scholarship-grid">
            {filteredEligible.map((s, index) => (
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

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => navigate(`/scholarship/${s.id}`)}>
                    View Details
                  </button>
                  <button
                    style={{ backgroundColor: "#28a745", color: "white" }}
                    onClick={() => applyScholarship(s)}
                  >
                    Apply
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        <h3 className="section-title">All Scholarships</h3>

        {filteredAll.length === 0 ? (
          <p style={{ color: "#777" }}>No matching scholarships found.</p>
        ) : (
          <div className="scholarship-grid">
            {filteredAll.map((s, index) => (
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

                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => navigate(`/scholarship/${s.id}`)}>
                    View Details
                  </button>
                  <button
                    style={{ backgroundColor: "#28a745", color: "white" }}
                    onClick={() => applyScholarship(s)}
                  >
                    Apply
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
