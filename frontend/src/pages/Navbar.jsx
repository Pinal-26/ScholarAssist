import { NavLink, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { FiLogOut } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config";

export default function Navbar({ searchTerm, setSearchTerm, showSearch = true }) {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  // ================= FETCH NOTIFICATIONS =================
  useEffect(() => {
  if (!user) return;

  fetch(`${API_BASE_URL}/api/notifications/${user.id}`)
    .then(res => res.json())
    .then(data => {
      const uniqueMap = new Map();

      // ✅ Keep latest notification per message
   data.forEach(n => {
  if (n.message.includes("profile")) {
    // group by time (new event = new key)
    const key = n.message + "_" + new Date(n.createdAt).getTime();
    uniqueMap.set(key, n);
  } else {
    uniqueMap.set(n.id, n);
  }
});

      const uniqueList = Array.from(uniqueMap.values());

      setNotifications(uniqueList);

      // ✅ Correct unread count
      const unread = uniqueList.filter(n => n.read === false).length;
      setUnreadCount(unread);
    })
    .catch(err => console.error("Notification error:", err));

}, []);
  // ================= MARK AS READ =================
  const markAsRead = async (id) => {
    await fetch(`${API_BASE_URL}/api/notifications/read/${id}`, {
      method: "PUT",
    });

    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );

    setUnreadCount(prev => (prev > 0 ? prev - 1 : 0));
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <nav className="dash-navbar">

      <div className="dash-logo">
        🎓 <span>ScholarAssist</span>
      </div>

      <div style={{ flex: 1 }}></div>

      {showSearch && (
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search scholarships..."
            className="navbar-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* 🔔 Notification Bell */}
      {user && (
  <div className="notification-wrapper">
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <FaBell size={20} />

      {unreadCount > 0 && (
        <span className="badge">{unreadCount}</span>
      )}
    </div>

    {showDropdown && (
      <div className="notification-dropdown">
        {notifications.length === 0 ? (
          <p style={{ padding: "10px" }}>No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-item ${n.read ? "read" : "unread"}`}
              onClick={() => markAsRead(n.id)}
            >
              {n.message}
            </div>
          ))
        )}
      </div>
    )}
  </div>
)}

      <div className="dash-nav-links">
        <NavLink to="/dashboard" className="dash-link">Dashboard</NavLink>
        <NavLink to="/saved" className="dash-link">Saved</NavLink>
        <NavLink to="/applications" className="dash-link">Applications</NavLink>
        <NavLink to="/profile" className="dash-link">Profile</NavLink>

        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut size={20} />
        </button>
      </div>

    </nav>
  );
}
