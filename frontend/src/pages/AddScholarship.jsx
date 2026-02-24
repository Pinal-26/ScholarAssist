import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

export default function AddScholarship() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    deadline: "",
    description: "",
    applyLink: "",
    provider: "",
    type: "",
    maxIncome: "",
    minPercentage: "",
    eligibleCaste: "",
    eligibleLocality: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/scholarships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          amount: parseInt(formData.amount),
          maxIncome: parseFloat(formData.maxIncome),
          minPercentage: parseFloat(formData.minPercentage)
        })
      });

      if (!response.ok) {
        alert("Failed to add scholarship");
        return;
      }

      alert("Scholarship Added Successfully!");
      navigate("/admin/scholarships");

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="admin-dashboard">

      <h2 className="add-title">Add New Scholarship</h2>

      <form className="admin-form" onSubmit={handleSubmit}>

        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
        <input name="deadline" type="date" onChange={handleChange} required />
        <input name="provider" placeholder="Provider" onChange={handleChange} required />
        <input name="type" placeholder="Type (Government/Private)" onChange={handleChange} required />
        <input name="applyLink" placeholder="Application Link" onChange={handleChange} required />
        <input name="maxIncome" type="number" placeholder="Max Income" onChange={handleChange} />
        <input name="minPercentage" type="number" placeholder="Min Percentage" onChange={handleChange} />
        <input name="eligibleCaste" placeholder="Eligible Caste (ALL/OBC/ST/etc)" onChange={handleChange} />
        <input name="eligibleLocality" placeholder="Eligible Locality (Gujarat/All India)" onChange={handleChange} />

        <textarea name="description" placeholder="Description" onChange={handleChange} required />

        <button type="submit" className="admin-btn">
          Add Scholarship
        </button>

      </form>

    </div>
  );
}