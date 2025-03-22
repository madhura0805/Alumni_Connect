import React, { useState, useEffect } from "react";
import AlumniCard from "./alumniCard.jsx";
import SearchAlumni from './searchAlumni.jsx';
import "./Connect.css";

const Connect = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    fetchAlumni(); // Fetch default alumni when page loads
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/student/connect");
      const data = await response.json();
      console.log("API Response:", data); // Debugging: Check if correct data is returned

      setAlumni(data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
    }
  };

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await fetch(`http://localhost:5000/api/search?query=${searchQuery}`);
      const data = await response.json();
      console.log("API Response:", data);
      setAlumni(data); // Update UI with search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="connect-container">
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

      <SearchAlumni fetchSearchResults={fetchSearchResults} />


      <section className="alumniData">
        <div className="alumni-list">
          {alumni.length > 0 ? (
            alumni.map((alum) => <AlumniCard key={alum._id} alumni={alum} />)
          ) : (
            <p>No alumni found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Connect;