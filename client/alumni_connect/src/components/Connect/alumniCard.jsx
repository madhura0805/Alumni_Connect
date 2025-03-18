import React from "react";
import { Link } from "react-router-dom";
import "./AlumniCard.css"; // Import the styles

const AlumniCard = ({ alumni }) => {
  return (
    <div className="alumni-card">
      {/* Image placeholder */}
      <img src={alumni.image || "default-image.jpg"} alt={alumni.name} className="alumni-img" />

      <h3>{alumni.name}</h3>
      <p><strong>Job:</strong> {alumni.currentJobProfile}</p>
      <p><strong>Company:</strong> {alumni.currentCompany}</p>

      {/* Know More Button - Navigates to Alumni Detail Page */}
      <Link to={`/alumni/${alumni._id}`}>
        <button className="know-more-btn">Know More</button>
      </Link>
    </div>
  );
};

export default AlumniCard;
