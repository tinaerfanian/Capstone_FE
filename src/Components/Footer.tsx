// 📂 src/Components/Footer.tsx
import React from "react";
import "../Css/Footer.css";
import logo from "../assets/lo2 (1).png"; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/*logo*/}
        <div className="footer-logo">
          <img src={logo} alt="Tidea Funder Logo" />
          <p>Empowering ideas, connecting people.</p>
        </div>

        {/* Navbar links*/}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* social*/}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://twitter.com">Twitter</a></li>
            <li><a href="https://instagram.com">Instagram</a></li>
            <li><a href="https://linkedin.com">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* copywrite*/}
      <div className="footer-bottom">
        <p>© 2025 Tidea Funder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
