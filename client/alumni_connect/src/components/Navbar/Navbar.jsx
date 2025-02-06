import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <NavLink to="/">Logo</NavLink> {/* Replace with logo */}
        </div>
        <div className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/connect" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              CONNECT
            </NavLink>
          </li>
          <li>
            <NavLink to="/community" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              COMMUNITY
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              BLOGS
            </NavLink>
          </li>

          <div className="dropdown">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              LOGIN/SIGN UP
              <span className="triangle"></span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <NavLink to="/login/student" onClick={() => setDropdownOpen(false)}>
                  Student
                </NavLink>
                <NavLink to="/login/alumni" onClick={() => setDropdownOpen(false)}>
                  Alumni
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
