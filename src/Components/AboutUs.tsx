import React from "react";
import "../Css/AboutUs.css";
import missionImage from "../assets/NostroVisione.jpg";
import communityImage from "../assets/comuD.png";
import supportImage from "../assets/support.png";

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      {/*Header */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">About Tidea Funder</h1>
          <p className="hero-subtitle">
            The platform where ideas meet opportunity
          </p>
        </div>
      </section>

      {/*mission*/}
      <section className="content-section">
        <div className="content-wrapper">
          <div className="image-content">
            <img src={missionImage} alt="Our Mission" />
          </div>
          <div className="text-content">
            <h2>Our Mission</h2>
            <p>
              There are many ideas that die before they are born due to lack of 
              financial support!
              At Tidea Funder, our mission is  is to stand together with dynamic 
              and creative minds and support ideas to create a world where we are 
              the creators of dreams.
            </p>
          </div>
        </div>
      </section>

      {/*comunity */}
      <section className="content-section">
        <div className="content-wrapper">
          <div className="image-content">
            <img src={communityImage} alt="Community" />
          </div>
          <div className="text-content">
            <h2>Community Driven</h2>
            <p>
              Our platform thrives on community support. Backers can explore a
              wide range of projects, contribute to what they believe in, and
              help turn ideas into reality.
            </p>
          </div>
        </div>
      </section>

      {/*support */}
      <section className="content-section">
        <div className="content-wrapper">
          <div className="image-content">
            <img src={supportImage} alt="Support" />
          </div>
          <div className="text-content">
            <h2>Supporting Innovation</h2>
            <p>
              We provide the tools, resources, and network needed to give every
              project the best chance at success. Whether you are an innovator
              or a supporter, Tidea Funder is here for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
