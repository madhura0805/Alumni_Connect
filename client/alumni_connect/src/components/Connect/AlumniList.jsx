import React, { useState, useEffect } from "react";
import AlumniCard from "./alumniCard.jsx";
import './AlumniList.css'

const AlumniList = ({ searchQuery }) => {
  const [alumni, setAlumni] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAlumni();
  }, [searchQuery]);

  const fetchAlumni = async () => {
    setLoading(true);
    setError("");

    try {
      const url = searchQuery
        ? `http://localhost:5000/api/student/search?query=${searchQuery}`
        : "http://localhost:5000/api/student/connect"; // Default API

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch alumni");

      const data = await response.json();
      setAlumni(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="alumniData">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="alumni-list">
          {alumni.length > 0 ? (
            alumni.map((alum) => <AlumniCard key={alum._id} alumni={alum} />)
          ) : (
            <p>No alumni found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default AlumniList;
