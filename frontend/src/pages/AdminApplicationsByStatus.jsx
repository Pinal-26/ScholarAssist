import { useEffect, useState } from "react";
import "../styles/adminApplicationsByStatus.css";
import API_BASE_URL from "../config";


export default function AdminApplicationsByStatus() {

  const [status, setStatus] = useState("");
  const [allApplications, setAllApplications] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/applications`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Data:", data);
        setAllApplications(data);
      })
      .catch(err => console.error("Error fetching applications:", err));
  }, []);

  // ✅ DEFINE filteredApplications HERE
  const filteredApplications = status
    ? allApplications.filter(app =>
        app.status?.toUpperCase() === status.toUpperCase()
      )
    : allApplications;

  const getStatusClass = (statusValue) => {
    const value = statusValue?.toUpperCase();

    if (value === "APPROVED") return "status-badge status-approved";
    if (value === "PENDING") return "status-badge status-pending";
    if (value === "REJECTED") return "status-badge status-rejected";

    return "status-badge";
  };

  return (
    <div className="status-page">

      <h2 className="status-title">View Applications By Status</h2>

      <div className="status-filter">
        <select
          className="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="status-table-wrapper">
        <table className="status-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Scholarship ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.userId}</td>
                  <td>{app.scholarshipId}</td>
                  <td>
                    <span className={getStatusClass(app.status)}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-data">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}