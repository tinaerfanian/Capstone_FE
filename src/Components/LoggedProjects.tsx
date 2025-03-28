import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import "../Css/LoggedProject.css";

interface Project {
    id: number;
    title: string;
    description: string;
    fundsObtained: number;
    fundsRequired: number;
    image: string;
}

const MyProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && userId) {
      axios
        .get(`http://localhost:8080/api/progetti/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            const mappedProjects = res.data.map((p: any) => ({
              id: p.id,
              title: p.titolo,
              description: p.descrizione,
              fundsObtained: p.fondiOttenuti,
              fundsRequired: p.fondiRichiesti,
              image: p.immagine,
              conclusion: p.concluso,
            }));
          
            setProjects(mappedProjects);
          })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>

      
      <button
        className="new-project-button"
        onClick={() => navigate("/aggiungiprogetto")}
      >
       Enter a new project
      </button>

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProjects;
