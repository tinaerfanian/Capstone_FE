import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../Css/ProjectCard.css";

interface Project {
  id: number;
  title: string;
  description: string;
  fundsObtained: number;
  fundsRequired: number;
  image: string;
  conclusion: boolean;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const navigate = useNavigate();
  const location = useLocation();


  const handleViewDetails = () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      navigate(`/project/${project.id}`);
    } else {
      navigate("/login");
    }
  };

  const handleEditProject = () => {
    navigate(`/modificaprogetto/${project.id}`);
  };

  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} className="project-image" />
      <h3 className="project-title">{project.title}</h3>
      
    
      <p className="project-description">{project.description}</p>

    
      <p className="project-funding">
        <span className="fund-label">Money raised:</span> 
        <span className="fund-green"> ${project.fundsObtained} </span>
        <span className="fund-label"> / ${project.fundsRequired}</span>
      </p>

      <div className="button-group">
        <button className="project-button" onClick={handleViewDetails}>
          View details
        </button>

        {location.pathname === "/userProjects" && !project.conclusion && (
  <>
    <Link to={`/aggiungipost/${project.id}`}>  
      <button className="project-button add-post-button">Add post</button>
    </Link>

  </>
)}
      </div>
    </div>
  );
};

export default ProjectCard;
