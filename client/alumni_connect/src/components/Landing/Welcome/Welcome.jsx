import React from 'react';
import './Welcome.css'

function Welcome() {
  return (
    <div className="welcome-section">
      <div className="welcome-text">
        <h1>Welcome to PICT Alumni Connect !</h1>
        <p>Where memories, connections and opportunities continue to grow.</p>
      </div>
      <div className="welcome-photo">
        <img src="/image.png" alt="Image" /> 
      </div>
    </div>
  );
}

export default Welcome;
