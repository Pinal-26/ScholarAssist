import React, { useState } from "react";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {

  const [systemStatus] = useState({
    scraper: "active",
    backend: "running",
    database: "connected",
    notification: "active"
  });

  const handleScrapeNow = () => {
    alert("Scholarship scraping started successfully.");
  };

  return (
    <div className="admin-container">

      {/* HEADER */}
      <header className="admin-header">
        <div className="header-left">
          <h1>ScholarAssist Admin</h1>
          <p className="subtitle">Smart Scholarship Management Platform</p>
        </div>

        <div className="admin-profile">
          <div className="profile-info">
            <span className="profile-name">Administrator</span>
            <span className="profile-role">System Admin</span>
          </div>
          <div className="profile-avatar">SA</div>
        </div>
      </header>

      {/* SYSTEM OVERVIEW */}
      <section className="overview-section">
        <h3 className="section-title">System Overview</h3>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <h3>3,842</h3>
              <p>Registered Students</p>
              <span className="stat-change">↑ 12% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-content">
              <h3>1,482</h3>
              <p>Scholarships Listed</p>
              <span className="stat-change">↑ 8% this week</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <div className="stat-content">
              <h3>1,294</h3>
              <p>Total Applications</p>
              <span className="stat-change">Live tracking</span>
            </div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>865</h3>
              <p>Students Got Scholarship</p>
              <span className="stat-change">User confirmed</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN DASHBOARD */}
      <section className="dashboard-main">

        {/* LEFT COLUMN */}
        <div className="dashboard-column">

          {/* SCRAPER */}
          <div className="dashboard-card">
            <div className="card-header">
              <h4>Scholarship Scraper</h4>
              <span className={`status-badge ${systemStatus.scraper}`}>
                Active
              </span>
            </div>

            <p className="card-description">
              Automatically collects scholarship data from trusted sources
            </p>

            <button className="btn-primary" onClick={handleScrapeNow}>
              🔄 Run Scraper Now
            </button>

            <div className="scraper-info">
              <div className="info-item">
                <span>Last Run:</span>
                <span>2 hours ago</span>
              </div>
              <div className="info-item">
                <span>Sources:</span>
                <span>Government & Private</span>
              </div>
              <div className="info-item">
                <span>Success Rate:</span>
                <span>98%</span>
              </div>
            </div>
          </div>

          {/* MATCH ANALYTICS */}
          <div className="dashboard-card">
            <h4>Recommendation Accuracy</h4>

            <div className="analytics-chart">
              <div className="chart-header">
                <span>Profile Matching Accuracy</span>
                <span className="chart-percentage">92%</span>
              </div>

              <div className="chart-bar">
                <div className="bar-fill" style={{ width: "92%" }}></div>
              </div>
            </div>

            <div className="match-breakdown">
              <div className="breakdown-item">
                <span>MYSY Scholarships</span>
                <span>87%</span>
              </div>
              <div className="breakdown-item">
                <span>NSP Scholarships</span>
                <span>94%</span>
              </div>
              <div className="breakdown-item">
                <span>Private Schemes</span>
                <span>76%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="dashboard-column">

          {/* QUICK ACTIONS */}
          <div className="dashboard-card">
            <h4>Quick Actions</h4>

            <div className="action-grid">
              <button className="action-btn">➕ Add Scholarship</button>
              <button className="action-btn">📊 View Analytics</button>
              <button className="action-btn">👥 Manage Users</button>
              <button className="action-btn">🔔 Notification Center</button>
              <button className="action-btn">📝 Generate Reports</button>
              <button className="action-btn">⚙️ System Settings</button>
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div className="dashboard-card">
            <h4>System Status</h4>

            <div className="status-grid">
              <div className="status-item active">
                ✅ Scraper Engine Running
              </div>
              <div className="status-item active">
                ✅ Backend Services Healthy
              </div>
              <div className="status-item active">
                ✅ Database Connected
              </div>
              <div className="status-item active">
                ✅ Chrome Extension Active
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="dashboard-card">
            <h4>Recent Activity</h4>

            <ul className="activity-list">
              <li>🆕 12 new scholarships added</li>
              <li>🎓 45 students confirmed success</li>
              <li>📄 156 applications auto-filled</li>
              <li>📊 Weekly analytics generated</li>
            </ul>
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="insights-section">
        <h3>Platform Insights</h3>

        <div className="insights-grid">
          <div className="insight-card">
            <h5>📈 Performance</h5>
            <p>Average match accuracy: <b>92%</b></p>
            <p>User satisfaction: <b>4.7 / 5</b></p>
          </div>

          <div className="insight-card">
            <h5>🔔 Notifications</h5>
            <p>Deadline alerts sent: <b>1,243</b></p>
            <p>Open rate: <b>78%</b></p>
          </div>

          <div className="insight-card">
            <h5>🚀 Chrome Extension</h5>
            <p>Active users: <b>2,341</b></p>
            <p>Time saved: <b>312 hours</b></p>
          </div>
        </div>
      </section>

    </div>
  );
}