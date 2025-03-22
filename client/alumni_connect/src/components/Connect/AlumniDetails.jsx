import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AlumniDetails.css"; // Updated CSS for LinkedIn-style layout
import { FaBuilding, FaBriefcase, FaLinkedin, FaGraduationCap } from "react-icons/fa";

const AlumniDetail = () => {
  const { id } = useParams(); // Get alumni ID from URL
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/search/id/${id}`)
      .then((res) => res.json())
      .then((data) => setAlumni(data))
      .catch((err) => console.error("Error fetching alumni details:", err));
  }, [id]);

  if (!alumni) return <p>Loading...</p>;

  return (
    <div className="alumni-profile">
      <div className="profile-card">
        {/* Profile Image */}
        <img src={alumni.image || "default-image.jpg"} alt={alumni.name} className="profile-img" />
        
        {/* Name & Title */}
        <h1 className="profile-name">{alumni.name}</h1>
        <p className="profile-title"><FaBriefcase /> {alumni.currentJobProfile} at {alumni.currentCompany}</p>
        
        {/* Additional Details */}
        <p><FaBuilding /> <strong>Company:</strong> {alumni.currentCompany}</p>
        <p><strong>Experience:</strong> {alumni.yoe} years</p>
        <p><FaGraduationCap /> <strong>Graduation Year:</strong> {alumni.graduationYear}</p>

        {/* Higher Education */}
        {alumni.higherEduDegree && (
          <p><strong>Higher Education:</strong> {alumni.higherEduDegree} at {alumni.higherEduUniversity}</p>
        )}
{alumni.internships.length > 0 && (
  <div className="internships">
    <h3>Internships</h3>
    <div className="internship-list">
      {alumni.internships.map((intern, index) => (
        <div key={index} className="internship-card">
          <p className="internship-role"><FaBriefcase /> <strong>{intern.role}</strong></p>
          <p className="internship-company"><FaBuilding /> {intern.company}</p>
        </div>
      ))}
    </div>
  </div>
)}

        {/* LinkedIn Button */}
        <a href={alumni.linkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-btn">
          <FaLinkedin /> View LinkedIn Profile
        </a>
      </div>
    </div>
  );
};

export default AlumniDetail;
