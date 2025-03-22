import React from "react";

const AlumniCard = ({ name, role, img }) => {
  return (
    <div className="alumni-card">
      <img src={img} alt={name} className="alumni-img" />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};
export default AlumniCard;
