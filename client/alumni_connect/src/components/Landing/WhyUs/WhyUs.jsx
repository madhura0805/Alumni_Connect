import React from "react";
import './WhyUs.css';

const WhyUs = () => {
  return (
    <section className="why-us">
      <h2>WHY <span className="highlight">US?</span></h2>

      <div className="why-us-container">
        <div className="why-us-card">
          <div className="why-us-icon">
            <img src="/Connect.png" alt="Connect" /> 
          </div>
          <div className="why-us-text">
            <h3>Connect</h3>  {/* Heading inside text div */}
            <p>Helping alumni and juniors come together to share and grow.</p>
          </div>
        </div>
        
        <div className="why-us-card">
          <div className="why-us-icon">
            <img src="/Community.png" alt="Community" /> 
          </div>
          <div className="why-us-text">
            <h3>Networking</h3>  {/* Heading inside text div */}
            <p>Building a strong professional network for career opportunities.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
