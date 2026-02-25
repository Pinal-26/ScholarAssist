import { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import API_BASE_URL from "../config";

export default function ViewStudents() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users/all`)
      .then(res => res.json())
      .then(data => {
        console.log("Users Data:", data);   // Debug
        setUsers(data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div className="admin-dashboard">
      <h2 className="section-title">All Registered Students</h2>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Users Found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}