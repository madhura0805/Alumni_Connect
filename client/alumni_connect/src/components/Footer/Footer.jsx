import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 PICT Alumni Connect. All Rights Reserved.</p>
        <ul className="footer-links">
          <li><a href="/connect">Connect</a>
          </li>
          <li><a href="/community">Community</a></li>
          <li><a href="/blogs">Blogs</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
