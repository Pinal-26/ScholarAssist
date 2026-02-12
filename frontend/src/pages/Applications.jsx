import { useEffect, useState } from "react";
import "../styles/applications.css";

export default function Applications() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [applications, setApplications] = useState([]);

  // ================= FETCH APPLICATIONS =================
 useEffect(() => {

  if (!user || !user.id) return;

  fetch(`http://localhost:8080/api/applications/user/${user.id}`)
    .then(res => res.json())
    .then(data => {
      setApplications(data);
    })
    .catch(err => console.error(err));

}, []);  // ✅ EMPTY dependency array


  // ================= UPDATE STATUS =================
  const updateStatus = async (id, newStatus) => {
    try {

      await fetch(
        `http://localhost:8080/api/applications/${id}/status?status=${newStatus}`,
        { method: "PUT" }
      );

      // Update locally
      setApplications(prev =>
        prev.map(app =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );

    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <div className="applications-container">
      <h2 className="applications-title">My Applications</h2>

      {applications.length === 0 ? (
        <p className="no-applications">No applications found.</p>
      ) : (
        <table className="applications-table">
          <thead>
            <tr>
              <th>Scholarship</th>
              <th>Amount</th>
              <th>Deadline</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(app => (
              <tr key={app.id}>

                {/* ✅ FIXED FIELD NAME */}
                <td>{app.title || "-"}</td>

                <td>
                  {app.amount ? `₹${app.amount}` : "-"}
                </td>

                <td>
                  {app.deadline ? app.deadline : "-"}
                </td>

                <td>
                  {app.appliedDate ? app.appliedDate : "-"}
                </td>

                <td>{app.status}</td>

                <td>
                  <select
                    className="status-select"
                    value={app.status}
                    onChange={(e) =>
                      updateStatus(app.id, e.target.value)
                    }
                  >
                    <option value="APPLIED">APPLIED</option>
                    <option value="UNDER_REVIEW">UNDER REVIEW</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}
