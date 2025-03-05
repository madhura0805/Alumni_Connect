import React from "react";
import './Connect.css';


function AlumniConnect() {
  return (
    <div className="container">

     
      <section className="hero-section">
        <h2>Empowering Tomorrow’s Leaders, Together!</h2>
        <p>Connect with alumni. Share knowledge. Expand your network. Unlock opportunities for success.</p>
        <button className="join-button">Join Now!</button>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8k9kxEh7FqzqjwYC4DrbPxjy-7iPXYG4Hg&s"
          alt="Alumni helping each other"
          className="hero-image"
        />
      </section>

      <section className="search-section">
        <p>Looking for guidance? Find alumni who can help!</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Alumni by Domain, Company, or Expertise.."
            className="search-input"
          />
          <button className="search-button">Find Alumni</button>
        </div>
      </section>
    </div>
  );
};

export default AlumniConnect;
