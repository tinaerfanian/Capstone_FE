import React from "react";
import { Link } from "react-router-dom";
import "../Css/Navbar.css"; 
import logo3 from "../assets/lo2 (1).png";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

       
        <div className="logo-container">
          <img src={logo3} alt="Logo" className="logo" />
        </div>

      
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

       
        <div className="auth-buttons">
          <Link to="/login" className="auth-btn">Login</Link>
          <Link to="/signup" className="auth-btn">Join Tidea</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
