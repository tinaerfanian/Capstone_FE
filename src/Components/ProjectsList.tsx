import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/ProjectsList.css";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/progetti");
  
      const mappedProjects = response.data.map((p: any) => ({
        id: p.id,
        title: p.titolo,
        description: p.descrizione,
        fundsObtained: p.fondiOttenuti,
        fundsRequired: p.fondiRichiesti,
        image: p.immagine,
        conclusion: p.concluso
      }));
  
      setProjects(mappedProjects);
    } catch (error) {
      console.error("Error retrieving projects:", error);
    }
  };

  return (
    <div className="projects-container">
      <h2 className="projects-title">Projects</h2>

      <input
        type="text"
        placeholder="Searching projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="projects-grid">
        {projects
          .filter((project) => project.title.toLowerCase().includes(search.toLowerCase()))
          .map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
};

export default ProjectsList;
