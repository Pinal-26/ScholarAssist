import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/adminDashboard.css";

export default function EditScholarship() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    deadline: "",
    description: "",
    eligibility: "",
    applyLink: "",
    provider: "",
    maxIncome: "",
    minGpa: ""
  });

  useEffect(() => {
    fetch(`http://localhost:8080/api/scholarships/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/scholarships/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    alert("Scholarship Updated Successfully!");
    navigate("/admin/edit-scholarships");
  };

  return (
    <div className="admin-dashboard">
      <h2 className="section-title">Edit Scholarship</h2>

      <form className="admin-form" onSubmit={handleUpdate}>

        <input name="title" value={formData.title} onChange={handleChange} />
        <input name="category" value={formData.category} onChange={handleChange} />
        <input name="amount" type="number" value={formData.amount} onChange={handleChange} />
        <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} />
        <input name="provider" value={formData.provider} onChange={handleChange} />
        <input name="applyLink" value={formData.applyLink} onChange={handleChange} />
        <input name="maxIncome" type="number" value={formData.maxIncome} onChange={handleChange} />
        <input name="minGpa" type="number" step="0.1" value={formData.minGpa} onChange={handleChange} />

        <textarea name="description" value={formData.description} onChange={handleChange} />
        <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} />

        <button type="submit" className="admin-btn">Update Scholarship</button>
      </form>
    </div>
  );
}