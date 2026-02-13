import { useEffect, useState } from "react";

export default function AdminScholarships() {

  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/scholarships")
      .then(res => res.json())
      .then(data => setScholarships(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/scholarships/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setScholarships(scholarships.filter(s => s.id !== id));
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Scholarships</h2>

      {scholarships.map(s => (
        <div key={s.id} style={{
          border: "1px solid #ddd",
          padding: "15px",
          margin: "10px 0",
          borderRadius: "8px"
        }}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p>Amount: ₹{s.amount}</p>
          <p>Category: {s.category}</p>
          <p>Min GPA: {s.minGpa}</p>
          <p>Max Income: {s.maxIncome}</p>

          <button
            onClick={() => handleDelete(s.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}
