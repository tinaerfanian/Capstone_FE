import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  description: string;
  fundsObtained: number;
  fundsRequired: number;
  image: string;
}

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  
  const [project, setProject] = useState<Project>({
    id: 0,
    title: "",
    description: "",
    fundsObtained: 0,
    fundsRequired: 0,
    image: "",
  });

  useEffect(() => {
    
    console.log("Project ID Data Recovery", id);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Modified project:", project);

    

    navigate("/userProjects"); 
  };

  return (
    <div className="form-container">
      <h2>Edit the project</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          required
        />

        <label>Description:</label>
        <textarea
          value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          required
        />

        <label>Funds Required:</label>
        <input
          type="number"
          value={project.fundsRequired}
          onChange={(e) => setProject({ ...project, fundsRequired: Number(e.target.value) })}
          required
        />

        <label>Image URL:</label>
        <input
          type="text"
          value={project.image}
          onChange={(e) => setProject({ ...project, image: e.target.value })}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProject;
