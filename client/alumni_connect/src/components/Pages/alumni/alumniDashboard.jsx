import React from 'react';
import "./alumniDashboard.css";
import "../Navbar/Navbar.jsx";

const alumniDashboard = () => {
  return (
    
    <div className="container">
      <Navbar />
      {/* Sidebar */}
      <div className="sidebar">
        <button className="nav-button">Profile</button>
        <button className="nav-button">Connect</button>
        <button className="nav-button">Groups</button>
        <button className="nav-button">Blogs</button>
      </div>

      {/* Main Profile Section */}
      <div className="content">
        <div className="profile-container">
          <div className="profile-pic"></div>
          <h2 className="profile-title">John Doe</h2>
          <p className="profile-description">Software Engineer | Tech Enthusiast</p>
          <div className="info-buttons">
            <button className="info-button">LINKEDIN ID</button>
            <button className="info-button">COMPANY</button>
            <button className="info-button">EMAIL ID</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default alumniDashboard
