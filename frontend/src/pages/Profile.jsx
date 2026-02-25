import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/profile.css";
import Navbar from "./Navbar";
import API_BASE_URL from "../config";

export default function Profile() {
  const navigate = useNavigate();

  // ================= USER =================
  const user = JSON.parse(localStorage.getItem("user"));
  const [loaded, setLoaded] = useState(false);

  // ================= STATE =================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [institution, setInstitution] = useState("");
  const [course, setCourse] = useState("");
  const [gpa, setGpa] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const [tenthPercentage, setTenthPercentage] = useState("");
  const [twelfthPercentage, setTwelfthPercentage] = useState("");
  const [parentIncome, setParentIncome] = useState("");
  const [caste, setCaste] = useState("");
  const [locality, setLocality] = useState("");

  // ================= LOAD PROFILE =================
  useEffect(() => {
    if (!user || loaded) return;

    fetch(`${API_BASE_URL}/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (!data) return;

        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhone(data.phone || "");
        setEmail(data.email || "");

        setStreet(data.street || "");
        setCity(data.city || "");
        setState(data.state || "");
        setPincode(data.pincode || "");

        setInstitution(data.institution || "");
        setCourse(data.course || "");
        setGpa(data.gpa || "");
        setGraduationYear(data.graduationYear || "");

        setTenthPercentage(data.tenthPercentage || "");
        setTwelfthPercentage(data.twelfthPercentage || "");
        setParentIncome(data.parentIncome || "");
        setCaste(data.caste || "");
        setLocality(data.locality || "");

        setLoaded(true);
      });
  }, [user, loaded]);

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    const res = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        firstName,
        lastName,
        phone,
        street,
        city,
        state,
        pincode,
        institution,
        course,
        gpa,
        graduationYear,
        tenthPercentage,
        twelfthPercentage,
        parentIncome,
        caste,
        locality
      })
    });

    if (res.ok) {
      alert("Profile saved successfully");
      navigate("/dashboard");
    } else {
      const text = await res.text();
      console.log("Backend error:", text);
      alert("Save failed");
    }
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar showSearch={false} />

      {/* ================= PROFILE PAGE ================= */}
      <div className="profile-container">
        <h2>Profile Settings</h2>
        <p className="subtitle">
          Manage your personal information and preferences
        </p>

        {/* ================= PERSONAL INFO ================= */}
        <div className="profile-card">
          <h3>Personal Information</h3>

          <div className="form-grid">
            <div>
              <label>First Name</label>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>

            <div>
              <label>Last Name</label>
              <input value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>

            <div>
              <label>Email</label>
              <input value={email} disabled />
            </div>

            <div>
              <label>Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
          </div>
        </div>

        {/* ================= ADDRESS ================= */}
        <div className="profile-card">
          <h3>Address</h3>

          <div className="form-grid">
            <div>
              <label>Street Address</label>
              <input value={street} onChange={e => setStreet(e.target.value)} />
            </div>

            <div>
              <label>City</label>
              <input value={city} onChange={e => setCity(e.target.value)} />
            </div>

            <div>
              <label>State</label>
              <input value={state} onChange={e => setState(e.target.value)} />
            </div>

            <div>
              <label>Pincode</label>
              <input value={pincode} onChange={e => setPincode(e.target.value)} />
            </div>
          </div>
        </div>

        {/* ================= ACADEMIC INFO ================= */}
        <div className="profile-card">
          <h3>Academic Information</h3>

          <div className="form-grid">
            <div>
              <label>Institution</label>
              <input value={institution} onChange={e => setInstitution(e.target.value)} />
            </div>

            <div>
              <label>Course</label>
              <input value={course} onChange={e => setCourse(e.target.value)} />
            </div>

            <div>
              <label>GPA</label>
              <input value={gpa} onChange={e => setGpa(e.target.value)} />
            </div>

            <div>
              <label>Graduation Year</label>
              <input
                value={graduationYear}
                onChange={e => setGraduationYear(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* ================= BACKGROUND INFO ================= */}
        <div className="profile-card">
          <h3>Background Information</h3>

          <div className="form-grid">
            <div>
              <label>10th Percentage (optional)</label>
              <input
                value={tenthPercentage}
                onChange={e => setTenthPercentage(e.target.value)}
                placeholder="e.g. 85"
              />
            </div>

            <div>
              <label>12th Percentage (optional)</label>
              <input
                value={twelfthPercentage}
                onChange={e => setTwelfthPercentage(e.target.value)}
                placeholder="e.g. 78"
              />
            </div>

            <div>
              <label>Parent Annual Income (₹)</label>
              <input
                value={parentIncome}
                onChange={e => setParentIncome(e.target.value)}
                placeholder="e.g. 250000"
              />
            </div>

            <div>
              <label>Caste</label>
              <input
                value={caste}
                onChange={e => setCaste(e.target.value)}
                placeholder="General / OBC / SC / ST"
              />
            </div>

            <div>
              <label>Locality</label>
              <select value={locality} onChange={e => setLocality(e.target.value)}>
                <option value="">Select</option>
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="profile-actions">
          <button className="btn-secondary"
           onClick={() => navigate("/dashboard")}
           >
            Cancel</button>
          <button type="button" className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
