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

  // ================= PROFILE =================
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");

  const [street,setStreet] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [pincode,setPincode] = useState("");

  const [institution,setInstitution] = useState("");
  const [course,setCourse] = useState("");
  const [gpa,setGpa] = useState("");
  const [graduationYear,setGraduationYear] = useState("");

  const [tenthPercentage,setTenthPercentage] = useState("");
  const [twelfthPercentage,setTwelfthPercentage] = useState("");
  const [parentIncome,setParentIncome] = useState("");
  const [caste,setCaste] = useState("");
  const [locality,setLocality] = useState("");

  // ===== NEW FIELDS =====
  const [branch,setBranch] = useState("");
  const [quota,setQuota] = useState("");
  const [collegeFees,setCollegeFees] = useState("");
  const [hostelFees,setHostelFees] = useState("");

  // ================= DOCUMENT UPLOAD =================
  const [documentType,setDocumentType] = useState("");
  const [documentFile,setDocumentFile] = useState(null);

  // ================= DOCUMENT LIST =================
  const [documents,setDocuments] = useState([]);

  // ================= LOAD PROFILE + DOCUMENTS =================
  useEffect(() => {

    if(!user || loaded) return;

    fetch(`${API_BASE_URL}/api/profile/${user.id}`)
      .then(res => res.json())
      .then(data => {

        if(!data) return;

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

        // ===== NEW FIELDS LOAD =====
        setBranch(data.branch || "");
        setQuota(data.quota || "");
        setCollegeFees(data.collegeFees || "");
        setHostelFees(data.hostelFees || "");

        setLoaded(true);

      });

    fetch(`${API_BASE_URL}/api/documents/user/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
      });

  },[user,loaded]);


  // ================= SAVE PROFILE =================
  const handleSave = async () => {

    const res = await fetch(`${API_BASE_URL}/api/profile`,{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({

        userId:user.id,
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
        locality,

        // ===== NEW FIELDS =====
        branch,
        quota,
        collegeFees,
        hostelFees

      })

    });

    if(res.ok){
      alert("Profile saved successfully");
      navigate("/dashboard");
    }
    else{
      alert("Save failed");
    }

  };


  // ================= UPLOAD DOCUMENT =================
  const handleDocumentUpload = async () => {

    if(!documentType || !documentFile){
      alert("Select document type and PDF");
      return;
    }

    if(documentFile.type !== "application/pdf"){
      alert("Only PDF allowed");
      return;
    }

    const formData = new FormData();

    formData.append("userId",user.id);
    formData.append("documentType",documentType);
    formData.append("file",documentFile);

    const res = await fetch(`${API_BASE_URL}/api/documents/upload`,{
      method:"POST",
      body:formData
    });

    if(res.ok){

      alert("Document uploaded");

      setDocumentFile(null);
      setDocumentType("");

      fetch(`${API_BASE_URL}/api/documents/user/${user.id}`)
        .then(res=>res.json())
        .then(data=>setDocuments(data));

    }
    else{
      alert("Upload failed");
    }

  };


  const handleViewDocument = (docId) => {

    window.open(
      `${API_BASE_URL}/api/documents/view/${docId}`,
      "_blank"
    );

  };


const handleDeleteDocument = async (docId) => {

  const confirmDelete = window.confirm("Are you sure you want to delete this document?");
  if (!confirmDelete) return;

  const res = await fetch(`${API_BASE_URL}/api/documents/${docId}`, {
    method: "DELETE"
  });

  if (res.ok) {

    alert("Document deleted");

    fetch(`${API_BASE_URL}/api/documents/user/${user.id}`)
      .then(res => res.json())
      .then(data => setDocuments(data));

  } else {

    alert("Delete failed");

  }

};


  return(

  <>

  <Navbar showSearch={false}/>

  <div className="profile-container">

  <h2>Profile Settings</h2>

  {/* PERSONAL */}
  <div className="profile-card">
  <h3>Personal Information</h3>

  <div className="form-grid">

  <div>
  <label>First Name</label>
  <input value={firstName} onChange={e=>setFirstName(e.target.value)}/>
  </div>

  <div>
  <label>Last Name</label>
  <input value={lastName} onChange={e=>setLastName(e.target.value)}/>
  </div>

  <div>
  <label>Email</label>
  <input value={email} disabled/>
  </div>

  <div>
  <label>Phone</label>
  <input value={phone} onChange={e=>setPhone(e.target.value)}/>
  </div>

  </div>
  </div>


  {/* ADDRESS */}
  <div className="profile-card">

  <h3>Address</h3>

  <div className="form-grid">

  <div>
  <label>Street</label>
  <input value={street} onChange={e=>setStreet(e.target.value)}/>
  </div>

  <div>
  <label>City</label>
  <input value={city} onChange={e=>setCity(e.target.value)}/>
  </div>

  <div>
  <label>State</label>
  <input value={state} onChange={e=>setState(e.target.value)}/>
  </div>

  <div>
  <label>Pincode</label>
  <input value={pincode} onChange={e=>setPincode(e.target.value)}/>
  </div>

  </div>
  </div>


  {/* ACADEMIC */}
  <div className="profile-card">

  <h3>Academic Information</h3>

  <div className="form-grid">

  <div>
  <label>Institution</label>
  <input value={institution} onChange={e=>setInstitution(e.target.value)}/>
  </div>

  <div>
  <label>Course</label>
  <input value={course} onChange={e=>setCourse(e.target.value)}/>
  </div>

  <div>
    
  <label>Field of Study</label>

<select value={branch} onChange={e=>setBranch(e.target.value)}>

<option value="">Select</option>

{/* School Level */}
<option value="10th">10th</option>
<option value="12th">12th</option>

{/* Diploma */}
<option value="Diploma Engineering">Diploma Engineering</option>
<option value="Diploma Medical">Diploma Medical</option>
<option value="Diploma Pharmacy">Diploma Pharmacy</option>

{/* Undergraduate */}
<option value="BTech">B.Tech</option>
<option value="BE">B.E</option>
<option value="BSc">B.Sc</option>
<option value="BCom">B.Com</option>
<option value="BA">B.A</option>
<option value="BCA">BCA</option>
<option value="BBA">BBA</option>
<option value="MBBS">MBBS</option>
<option value="BDS">BDS</option>
<option value="BPharm">B.Pharm</option>
<option value="LLB">LLB</option>
<option value="CA">CA</option>

{/* Postgraduate */}
<option value="MTech">M.Tech</option>
<option value="MSc">M.Sc</option>
<option value="MCom">M.Com</option>
<option value="MA">M.A</option>
<option value="MCA">MCA</option>
<option value="MBA">MBA</option>
<option value="MD">MD</option>
<option value="MS">MS</option>
<option value="LLM">LLM</option>

{/* Doctorate */}
<option value="PhD">PhD</option>

</select>

  </div>

  <div>
  <label>Quota</label>

  <select value={quota} onChange={e=>setQuota(e.target.value)}>
  <option value="">Select</option>
  <option value="TFW">TFW</option>
  <option value="Government">Government</option>
  <option value="SFI">SFI</option>
  </select>

  </div>

  <div>
  <label>College Fees</label>
  <input value={collegeFees} onChange={e=>setCollegeFees(e.target.value)}/>
  </div>

  <div>
  <label>Hostel Fees</label>
  <input value={hostelFees} onChange={e=>setHostelFees(e.target.value)}/>
  </div>

  <div>
  <label>GPA</label>
  <input value={gpa} onChange={e=>setGpa(e.target.value)}/>
  </div>

  <div>
  <label>Graduation Year</label>
  <input value={graduationYear} onChange={e=>setGraduationYear(e.target.value)}/>
  </div>

  </div>
  </div>


  {/* ================= BACKGROUND ================= */}

  <div className="profile-card">

  <h3>Background Information</h3>

  <div className="form-grid">

  <div>
  <label>10th Percentage</label>
  <input value={tenthPercentage} onChange={e=>setTenthPercentage(e.target.value)}/>
  </div>

  <div>
  <label>12th Percentage</label>
  <input value={twelfthPercentage} onChange={e=>setTwelfthPercentage(e.target.value)}/>
  </div>

  <div>
  <label>Parent Income</label>
  <input value={parentIncome} onChange={e=>setParentIncome(e.target.value)}/>
  </div>

  <div>
  <label>Caste</label>
  <input value={caste} onChange={e=>setCaste(e.target.value)}/>
  </div>

  <div>
  <label>Locality</label>

  <select value={locality} onChange={e=>setLocality(e.target.value)}>

  <option value="">Select</option>
  <option value="Urban">Urban</option>
  <option value="Rural">Rural</option>

  </select>

  </div>

  </div>
  </div>


  {/* ================= DOCUMENT UPLOAD ================= */}

  <div className="profile-card">

  <h3>Upload Document</h3>

  <div className="form-grid">

  <div>

  <label>Document Type</label>

  <select value={documentType} onChange={e=>setDocumentType(e.target.value)}>

  <option value="">Select</option>
  <option value="income_certificate">Income Certificate</option>
  <option value="caste_certificate">Caste Certificate</option>
  <option value="tenth_marksheet">10th Marksheet</option>
  <option value="twelfth_marksheet">12th Marksheet</option>
  <option value="bonafide_certificate">Bonafide Certificate</option>

  </select>

  </div>

  <div>

  <label>Upload PDF</label>

  <input type="file" accept="application/pdf"
  onChange={e=>setDocumentFile(e.target.files[0])}/>

  </div>

  </div>

  <button className="btn-primary"
  style={{marginTop:"15px"}}
  onClick={handleDocumentUpload}>

  Upload Document

  </button>

  </div>


  {/* ================= DOCUMENT LIST ================= */}

  <div className="profile-card">

  <h3>Your Uploaded Documents</h3>

  {documents.length === 0 ?

  (<p>No documents uploaded</p>) :

  (

  <table className="document-table">

  <thead>
  <tr>
  <th>Document Type</th>
  <th>Action</th>
  </tr>
  </thead>

 <tbody>

{documents.map(doc => (

<tr key={doc.id}>

<td>{doc.documentType}</td>

<td>

<button
className="btn-primary"
onClick={() => handleViewDocument(doc.id)}
style={{marginRight:"10px"}}
>
View
</button>

<button
className="btn-danger"
onClick={() => handleDeleteDocument(doc.id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

  </table>

  )

  }

  </div>


  {/* ================= ACTIONS ================= */}

  <div className="profile-actions">

  <button className="btn-secondary"
  onClick={()=>navigate("/dashboard")}>

  Cancel

  </button>

  <button
  className="btn-primary"
  onClick={handleSave}>

  Save Changes

  </button>

  </div>


  </div>

  </>

  );

}