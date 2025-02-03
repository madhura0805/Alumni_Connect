import React from "react";
import "./TopAlumni.css";
import AlumniCard from "./AlumniCard"; 

const alumniData = [
  { name: "FULL NAME", role: "Current Job Role", img: "/profile-placeholder.png" },
  { name: "FULL NAME", role: "Current Job Role", img: "/profile-placeholder.png" },
  { name: "FULL NAME", role: "Current Job Role", img: "/profile-placeholder.png" }
];

const TopAlumni = () => {
  return (
    <section className="top-alumni">
      <h2>TOP <span className="highlight">ALUMNI</span></h2>
      <div className="alumni-container">
        <AlumniCard name={alumniData[0].name} role={alumniData[0].role} img={alumniData[0].img} />
        <AlumniCard name={alumniData[1].name} role={alumniData[1].role} img={alumniData[1].img} />
        <AlumniCard name={alumniData[2].name} role={alumniData[2].role} img={alumniData[2].img} />
      </div>
    </section>
  );
};

export default TopAlumni;
