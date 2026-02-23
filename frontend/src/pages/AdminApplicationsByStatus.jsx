import { useEffect, useState } from "react";
import "../styles/adminApplicationsByStatus.css";

export default function AdminApplicationsByStatus() {

  const [status, setStatus] = useState("");
  const [allApplications, setAllApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  // Fetch ALL applications once
  useEffect(() => {
    fetch("http://localhost:8080/api/admin/applications")
      .then(res => res.json())
      .then(data => {
        setAllApplications(data);
        setFilteredApplications(data);
      })
      .catch(err => console.error("Error fetching applications:", err));
  }, []);

  // Filter when status changes
  useEffect(() => {
    if (!status) {
      setFilteredApplications(allApplications);
    } else {
      const filtered = allApplications.filter(app =>
        app.status?.toUpperCase() === status.toUpperCase()
      );
      setFilteredApplications(filtered);
    }
  }, [status, allApplications]);

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

      {/* FILTER */}
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

      {/* TABLE */}
      <div className="status-table-wrapper">
        <table className="status-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Email</th>
              <th>Scholarship</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.user?.email || "N/A"}</td>
                  <td>{app.scholarship?.title || "N/A"}</td>
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