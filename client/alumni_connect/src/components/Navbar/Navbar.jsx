import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <a href="/">Logo</a> {/* Replace with logo */}
        </div>
        <div className="nav-links">
          <a href="/home">HOME</a>
          <a href="/connect">CONNECT</a>
          <a href="/community">COMMUNITY</a>
          <a href="/blogs">BLOGS</a>
          <div className="dropdown">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              LOGIN/SIGN UP
              <span className="triangle"></span> 
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <a href="/login/student">Student</a>
                <a href="/login/alumni">Alumni</a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
