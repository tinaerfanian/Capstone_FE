import React, { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import "../Css/AddPost.css";

const AddProject: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
      alert("User not authenticated");
      return;
    }

    // Creiamo il progetto
    const newProject = {
        titolo: title,
        descrizione: description,
        fondiRichiesti: parseFloat(amount),
        immagine: "https://media.licdn.com/dms/image/v2/D5612AQGauNJmks8xVg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1680214553693?e=2147483647&v=beta&t=2HRGKmTiWm95-EBi2FC2EMG5c9ac3eXK8_1JkjgfBWA",
        userId: parseInt(userId) 
      };
      

    try {
        await axios.post("http://localhost:8080/api/progetti/aggiungiprogetto", newProject, {
            headers: { Authorization: `Bearer ${token}` },
          });
          

      alert("New project added!");
      navigate("/userProjects"); 
    } catch (error) {
      console.error("Error inserting project:", error);
      console.log(newProject);
      alert("Error while inserting project");
    }
  };

  return (
    <div className="post-container">
      <h2 className="post-title">Add a new project</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="form-group">
          <label>Amount required:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>

        <button type="submit" className="add-btn">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
