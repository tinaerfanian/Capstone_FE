import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/AddPost.css";

const AddPost: React.FC = () => {
  const { progettoId } = useParams<{ progettoId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !progettoId) {
      alert("Invalid user or project.");
      return;
    }

    setLoading(true);

    let base64Image = "";
    if (image) {
      base64Image = await toBase64(image);
    }

    const postData = {
      title,
      description: content,
      image: base64Image,
      userId: parseInt(userId),
      progettoId: parseInt(progettoId),
    };

    try {
      await axios.post("http://localhost:8080/api/posts/aggiungipost", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post aggiunto con successo!");
      navigate(`/project/${progettoId}`); 
    } catch (error) {
      console.error("Error sending post:", error);
      alert("Error saving post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-container">
      <h2 className="post-title">Add a new post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-row">
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter post title..."
            />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="Technology">Technology</option>
              <option value="Environment">Environment</option>
              <option value="Food Industry">Food Industry</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write something about your post..."
          />
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={preview}
              alt="Anteprima"
              style={{ width: "150px", borderRadius: "8px" }}
            />
          </div>
        )}

        <div className="button-group">
          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? "Uploading..." : "Add Post"}
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={() => {
              setTitle("");
              setCategory("");
              setContent("");
              setImage(null);
              setPreview(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
