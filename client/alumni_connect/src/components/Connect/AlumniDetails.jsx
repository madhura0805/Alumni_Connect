import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AlumniDetails.css"; 

const AlumniDetail = () => {
  const { id } = useParams(); // Get alumni ID from URL
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    // Replace with an actual API call to fetch alumni details
    fetch(`http://localhost:5000/api/search/id/${id}`)
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.error("Error fetching alumni details:", err));
  }, [id]);

  if (!alumni) return <p>Loading...</p>;

  return (
    <div className="alumni-detail">
      <img src={alumni.image || "default-image.jpg"} alt={alumni.name} className="alumni-img-large" />
      <h1>{alumni.name}</h1>
      <p><strong>Job:</strong> {alumni.currentJobProfile}</p>
      <p><strong>Company:</strong> {alumni.currentCompany}</p>
      <p><strong>Experience:</strong> {alumni.yoe} years</p>
      {/* <p><strong>Skills:</strong> {alumni.skills.join(", ")}</p> */}
      <p><strong>LinkedIn:</strong> <a href={alumni.linkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-link">View Profile</a></p>
    </div>
  );
};

export default AlumniDetail;
