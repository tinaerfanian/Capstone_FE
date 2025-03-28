import React from "react";
import "../Css/HomePage.css";
import { Link } from "react-router-dom";
import tidea from "../assets/tidea.png";

const HomePage: React.FC = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-left">
       
        </div>
        <div className="hero-right">
          <h1 className="hero-title">
          <img src={tidea} alt="Tidea Funder Logo" className="hero-logo" />
          </h1>
          <div className="hero-buttons">
            <Link to="/projects">
              <button className="gradient-button">Find Projects</button>
            </Link>
            <Link to="/aggiungiprogetto">
              <button className="gradient-button">Start your Project</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
