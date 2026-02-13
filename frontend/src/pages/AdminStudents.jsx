import { useEffect, useState } from "react";

export default function AdminStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/all")
      .then(res => res.json())
      .then(data => setStudents(data));
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
