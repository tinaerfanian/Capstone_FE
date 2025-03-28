import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/ProjectDetail.css";
import { FaHeart } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  description: string;
  fundsObtained: number;
  fundsRequired: number;
  image: string;
  likeNumber: number;
  conclusion: boolean;
}

interface Post {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFundingComplete, setIsFundingComplete] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchProject();
    fetchPosts();
    checkLikeStatus();
  }, [id]);

  const fetchProject = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to view this project.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/progetti/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const p = response.data;

      const mappedProject: Project = {
        id: p.id,
        title: p.titolo,
        description: p.descrizione,
        fundsObtained: p.fondiOttenuti,
        fundsRequired: p.fondiRichiesti,
        image: p.immagine,
        likeNumber: p.numeroLike,
        conclusion: p.concluso,
      };
  
      setProject(mappedProject);
      setIsFundingComplete(mappedProject.fundsObtained >= mappedProject.fundsRequired);
      setLikesCount(mappedProject.likeNumber);
    } catch (error) {
      console.error("Error retrieving project:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/posts/progetto/${id}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error retrieving posts:", error);
    }
  };

  const checkLikeStatus = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get(
        `http://localhost:8080/api/progetti/${id}/like-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(response.data.liked);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to use the like.");
      return;
    }
  
    try {
      if (liked) {
        // UNLIKE
        await axios.post(
          `http://localhost:8080/api/progetti/${id}/unlike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikesCount((prev) => Math.max(0, prev - 1));
        setLiked(false);
      } else {
        // LIKE
        await axios.post(
          `http://localhost:8080/api/progetti/${id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikesCount((prev) => prev + 1);
        setLiked(true);
      }
    } catch (error: any) {
      console.error("Errore nel like:", error);
      alert("Error during operation. Please try again.");
    }
  };
  

  if (!project) return <p>Loading project details...</p>;

  return (
    <div className="project-detail-container">
      <div className="project-image-wrapper"> 
      <img src={project.image} alt={project.title} className="project-detail-image" />
  {project.conclusion && (
    <div className="concluded-banner">
      🎉 THIS PROJECT IS COMPLETED, THANK YOU ALL!🎉
    </div>
  )}      </div>
      <h2 className="project-detail-title">{project.title}</h2>
      <p className="project-detail-description">{project.description}</p>
      <p className="project-detail-funds">
        <strong>Raised:</strong>{" "}
        <span className="raised-amount">${project.fundsObtained}</span> / ${project.fundsRequired}
      </p>

      {/*  Like */}
      <div className="like-section">
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
          title={liked ? "You've already liked" : "LIKE"}
        >
          <FaHeart /> {likesCount} like{likesCount !== 1 && "s"}
        </button>
      </div>

      {/*  Funding  */}
      <button
  className={`fund-button ${isFundingComplete || project.conclusion ? "disabled" : ""}`}
  disabled={isFundingComplete || project.conclusion}
  onClick={() => navigate(`/payment/${id}`)}
>
  {project.conclusion
    ? "PROJECT COMPLETED"
    : isFundingComplete
    ? "FUNDS COMPLETED"
    : "Finance this project"}
</button>

      {/* POSTS */}
      <div className="project-posts">
        <h3>Project Updates</h3>
        {posts.length === 0 && <p>No posts available for this project yet.</p>}
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4 className="post-title">{post.title}</h4>
            <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
            <p className="post-description">{post.description}</p>
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="post-image"
                style={{ maxWidth: "250px", borderRadius: "8px", marginTop: "10px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
