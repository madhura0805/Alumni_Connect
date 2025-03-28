import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityList.css";

const communities = [
  { name: "Web Dev Community", icon: "💻", time: "5 min ago", members: 5 },
  { name: "Data Science Community", icon: "📊", time: "1 hour ago", members: 3 },
  { name: "DevOps Masters", icon: "⚙️", time: "30 min ago", members: 7 },
  { name: "Product Analytics", icon: "📈", time: "2 days ago", members: 4 },
  { name: "UI/UX Designers", icon: "🎨", time: "Just now", members: 3 },
  { name: "AI Research Group", icon: "🤖", time: "3 hours ago", members: 4 },
  { name: "Frontend Frameworks", icon: "📦", time: "10 min ago", members: 12 },
  { name: "Tech Startups", icon: "🚀", time: "Yesterday", members: 5 },
];

const CommunityList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleJoin = (community) => {
    navigate(`/chat/${encodeURIComponent(community)}`);
  };

  return (
    <div className="community-container">
      <h2 className="community-header">Communities</h2>
      <input
        type="text"
        placeholder="Search communities..."
        className="community-searchBar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="community-grid">
        {communities
          .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
          .map((community, index) => (
            <div key={index} className="community-card">
              <div className="community-icon">{community.icon}</div>
              <div className="community-content">
                <h3 className="community-name">{community.name}</h3>
                <p className="community-time">{community.time}</p>
                <p className="community-members">{community.members} members</p>
              </div>
              <button
                className="community-joinButton"
                onClick={() => handleJoin(community.name)}
              >
                Join
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommunityList;
