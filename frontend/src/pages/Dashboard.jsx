import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState, useCallback } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Navbar from "./Navbar";
import API_BASE_URL from "../config";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));

  const [, setProfile] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [missingEligibilityFields, setMissingEligibilityFields] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [eligibleScholarships, setEligibleScholarships] = useState([]);

  const [applications, setApplications] = useState([]);
  // const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [minAmountFilter, setMinAmountFilter] = useState("");
  const [amountSort, setAmountSort] = useState("");
  const [savedIds, setSavedIds] = useState([]);

const loadSaved = async () => {
  if (!user) return;

  try {
   const res = await fetch(
  `${API_BASE_URL}/api/saved/${user.id}`,
  {
    credentials: "include"
  }
);

    if (!res.ok) throw new Error("Failed to load saved");

    const data = await res.json();

    const ids = data.map(item =>
      Number(item.scholarshipId)
    );

    setSavedIds(ids);

  } catch (err) {
    console.error("Error loading saved:", err);
  }
};

useEffect(() => {
  loadSaved();
}, []);

  // ================= APPLY SCHOLARSHIP =================
const applyScholarship = async (scholarship) => {
  if (!user) {
    alert("Please login first.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        scholarshipId: scholarship.id,
        applicationLink: scholarship.applyLink,
      }),
    });

    const text = await response.text();
    if (text === "ALREADY_APPLIED") {
      alert("You have already applied for this scholarship.");
      return;
    }
    // 🔴 NOT ELIGIBLE CASE
    if (text === "NOT_ELIGIBLE") {

      const confirmApply = window.confirm(
        "You are not eligible for this scholarship.\nStill want to try your luck?"
      );

      // 🔥 ALWAYS open official link
      window.open(scholarship.applyLink, "_blank");

      if (!confirmApply) return;

      // If confirmed → force save in DB
      const forceResponse = await fetch(
        `${API_BASE_URL}/api/applications/force`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            scholarshipId: scholarship.id,
            applicationLink: scholarship.applyLink,
          }),
        }
      );

      const newApplication = await forceResponse.json();
      setApplications((prev) => [...prev, newApplication]);

      alert("Application submitted (even though not eligible).");
      return;
    }

    // ✅ NORMAL ELIGIBLE CASE
    const newApplication = JSON.parse(text);

    setApplications((prev) => [...prev, newApplication]);

    alert("Application submitted successfully!");

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
      data.locality,
    ];

    const filled = profileFields.filter(
      (v) => v !== null && v !== undefined && v.toString().trim() !== ""
    ).length;

    setProfileCompletion(Math.round((filled / profileFields.length) * 100));
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
      city: data.city,
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
        const response = await fetch(`${API_BASE_URL}/api/scholarships`);
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

    safeFetchJSON(`${API_BASE_URL}/api/profile/${user.id}`).then(
      (data) => {
        if (!data) return;
        setProfile(data);
        calculateProfileCompletion(data);
        checkEligibilityFields(data);
      }
    );
  }, [user, safeFetchJSON]);

  // ================= FETCH ELIGIBLE =================
  useEffect(() => {
    if (!user) return;

    safeFetchJSON(
      `${API_BASE_URL}/api/scholarships/eligible/${user.id}`
    ).then((data) => {
      if (data) setEligibleScholarships(data);
    });
  }, [user, safeFetchJSON]);

  
  
  // ================= FETCH APPLICATIONS (USER WISE) =================
  useEffect(() => {
    if (!user) return;

    safeFetchJSON(`${API_BASE_URL}/api/applications/user/${user.id}`).then(
      (data) => setApplications(data || [])
    );
  }, [user, safeFetchJSON]);

// ================= SAVE / UNSAVE =================
const toggleSave = async (scholarshipId) => {
  console.log(
  "DELETE URL:",
  `${API_BASE_URL}/api/saved/${user.id}/${scholarshipId}`
);
  if (!user) {
    alert("Please login first.");
    return;
  }

  const isSaved = savedIds.includes(scholarshipId);

  try {
    if (isSaved) {
      const res = await fetch(
        `${API_BASE_URL}/api/saved/${user.id}/${scholarshipId}`,
        {
          method: "DELETE",
          credentials: "include"   // ⭐ THIS IS THE FIX

        }
      );

      if (!res.ok) throw new Error("Failed to unsave");

    } else {
      const res = await fetch(
  `${API_BASE_URL}/api/saved`,
  {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: user.id,
      scholarshipId: scholarshipId
    })
  }
);
      if (!res.ok) throw new Error("Failed to save");
    }

    await loadSaved();

  } catch (error) {
    console.error("Save/Unsave error:", error);
  }
};

  // ================= SEARCH LOGIC =================
const matchesSearch = (text) => {
  if (!searchTerm.trim()) return true;

  return text
    ?.toLowerCase()
    .includes(searchTerm.toLowerCase());
};

// ================= FILTER ELIGIBLE =================
const filteredEligible = eligibleScholarships.filter(
  (s) =>
    matchesSearch(s.title || "") ||
    matchesSearch(s.category || "")
);

// Make safe copy
let finalEligible = [...filteredEligible];

// Minimum Amount Filter
if (minAmountFilter && !isNaN(minAmountFilter)) {
  finalEligible = finalEligible.filter(
    (s) => Number(s.amount) >= Number(minAmountFilter)
  );
}

// Sorting Logic
if (amountSort === "low") {
  finalEligible.sort((a, b) => Number(a.amount) - Number(b.amount));
} else if (amountSort === "high") {
  finalEligible.sort((a, b) => Number(b.amount) - Number(a.amount));
}

// ================= FILTER ALL =================
const filteredAll = scholarships.filter(
  (s) =>
    matchesSearch(s.title || "") ||
    matchesSearch(s.type || "")
);

// ================= FILTER ALL =================

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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
            <h3>{applications.length}</h3>
          </div>

          <div className="stat-card">
            <p>Profile</p>
            <h3>{profileCompletion}%</h3>

            {(profileCompletion < 100 ||
              missingEligibilityFields.length > 0) && (
              <button
                className="complete-profile-btn"
                onClick={() => navigate("/profile")}
              >
                Complete Profile
              </button>
            )}
          </div>
        </div>

        {missingEligibilityFields.length > 0 && (
  <div className="eligibility-alert">

    <div className="alert-content">

      <div className="alert-icon">⚠️</div>

      <div className="alert-text">
        <h4>Profile Information Required</h4>

        <p>
          Complete the following details to get accurate scholarship
          recommendations:
        </p>

        <ul>
          {missingEligibilityFields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>

        <span className="alert-note">
          Missing information may affect eligibility results.
        </span>
      </div>
    </div>

    <button
      className="profile-btn"
      onClick={() => navigate("/profile")}
    >
      Complete Profile →
    </button>

  </div>
)}

        <div className="eligible-filter-bar" >
  
  <input
    type="number"
    placeholder="Minimum Amount"
    value={minAmountFilter}
    onChange={(e) => setMinAmountFilter(e.target.value)}
  />

  <select
    value={amountSort}
    onChange={(e) => setAmountSort(e.target.value)}
  >
    <option value="">Sort By Amount</option>
    <option value="low">Low → High</option>
    <option value="high">High → Low</option>
  </select>

  <button
    onClick={() => {
      setMinAmountFilter("");
      setAmountSort("");
    }}
  >
    Reset
  </button>

</div>

        <h3 className="section-title">Eligible Scholarships</h3>

        {finalEligible.length === 0 ? (
          <p style={{ color: "#777" }}>No matching scholarships found.</p>
        ) : (
          <div className="scholarship-grid">
            {finalEligible.map((s, index) => (
              <div
                key={s.id ? `eligible-${s.id}` : `eligible-${index}`}
                className="scholarship-card"
              >
                <span className="bookmark" onClick={() => toggleSave(s.id)}>
                  {savedIds.includes(s.id) ? (
                    <FaBookmark color="#f5b301" />
                  ) : (
                    <FaRegBookmark />
                  )}
                </span>

                <span className="tag">{s.type}</span>
                <h4 >{s.title}</h4>
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
                <span className="bookmark" onClick={() => toggleSave(s.id)}>
                  {savedIds.includes(s.id) ? (
                    <FaBookmark color="#f5b301" />
                  ) : (
                    <FaRegBookmark />
                  )}
                </span>

                <span className="tag">{s.type}</span>
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
