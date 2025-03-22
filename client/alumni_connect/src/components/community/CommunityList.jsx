import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const communities = ["Web Development", "Data Science", "Cyber Security"];

const CommunityList = () => {
  const navigate = useNavigate();

  const handleJoin = (community) => {
    navigate(`/chat/${encodeURIComponent(community)}`);
  };

  return (
    <div className="container">
      <h2 className="header">Communities</h2>
      <div className="categories-list">
        {communities.map((community, index) => (
          <div className="category-card" key={index}>
            <span className="category-name">{community}</span>
            <button className="join-button" onClick={() => handleJoin(community)}>
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityList;
