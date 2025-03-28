import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../Css/LoggedInNavbar.css";
import logo3 from "../assets/lo2 (1).png";

const LoggedInNavbar: React.FC = () => {
  const role = localStorage.getItem("userRole");
  const username = localStorage.getItem("username") || "User";
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="logged-in-navbar">
      <div className="navbar-inner">
        {/* سمت چپ - لوگو */}
        <div className="left-section">
          <Link to="/">
            <img src={logo3} alt="Logo" className="logo" />
          </Link>
        </div>

        {/* وسط - لینک‌ها */}
        <ul className="center-section">
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          {role === "ROLE_OWNER" && (
            <li><Link to="/admin/messages">Message Management</Link></li>
          )}
        </ul>

        {/* راست - خوش‌آمدگویی و منو */}
        <div className="right-section">
          <button className="profile-button" onClick={() => setShowDropdown(!showDropdown)}>
            <FaUserCircle size={20} style={{ marginRight: "8px" }} />
            <span>Welcome, {username}</span>
          </button>

          {showDropdown && (
            <div className="profile-dropdown">
              <Link to="/edit-profile">Profile Settings</Link>
              <Link to="/notifiche">Notifications</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
