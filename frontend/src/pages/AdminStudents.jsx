import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

export default function AdminStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
  fetch(`${API_BASE_URL}/api/admin/students`)
    .then(res => res.json())
    .then(data => {
      // Filter only USER role
      const students = data.filter(user => user.role === "USER");
      setStudents(students);
    });
}, []);
  return (
    <div style={{ padding: "30px" }}>
      <h2>Registered Students</h2>

      {students
        .filter(user => user.role === "USER")
        .map(user => (
          <div key={user.id} style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "8px"
          }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        ))
      }
    </div>
  );
}
