import React from "react";
import "./Connect.css";

function Connect() {
  return (
    <div className="connect-container">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h2><em>Empowering Tomorrow’s Leaders, Together!</em></h2>
          <p>Connect with alumni. Share knowledge. Expand your network. Unlock opportunities for success.</p>
          <button type="button" className="join-button">Join Now!</button>
        </div>
        <img
          src="./connectpage.png"
          alt="Alumni collaborating"
          className="hero-image"
        />
      </section>

      <section className="search-section">
        <p className="search-heading">"Looking for guidance? Find alumni who can help!"</p>
      </section>

  
      <section className="extra-content">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Alumni by Domain, Company, or Expertise..."
            className="search-input"
            aria-label="Search Alumni"
          />
          <button type="button" className="search-button">Find Alumni</button>
        </div>
        <p className="extra-text">
          alumni card
        </p>
      </section>
    </div>
  );
}

export default Connect;
