import React from "react";
import { Link } from "react-router-dom";  
import "../Css/Dashboard.css";  

const Dashboard: React.FC = () => {
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username"); 
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is your personal space to manage projects and account settings.</p>

      <div className="dashboard-sections">
        <div className="dashboard-card">
          <h2>My Projects</h2>
          <p>View and manage your created projects.</p>
          <Link to="/userProjects">
            <button className="dashboard-btn">Go to Projects</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Account Settings</h2>
          <p>Update your personal information and preferences.</p>
          <Link to="/edit-profile">  
            <button className="dashboard-btn">Edit Profile</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Logout</h2>
          <p>Sign out of your account safely.</p>
          <button className="dashboard-btn logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
