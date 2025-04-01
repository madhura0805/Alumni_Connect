import React, { useEffect, useState } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../blogs.css"

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError("Error fetching post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${id}`);
  
      if (response.status === 200) {
        navigate('/blogs'); // Redirect to blogs page after successful deletion
      } else {
        throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error("❌ Error deleting post:", error);
      setError("Failed to delete post");
    }
  };
  

  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="not-found">Post not found.</div>;

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      {post.image && (
        <div className="post-image">
          <img src={`data:image/jpeg;base64,${post.image}`} alt="Post Thumbnail" />
        </div>
      )}
      <p className="post-category">{post.category}</p>
      <div
        className="post-description"
        dangerouslySetInnerHTML={{ __html: post.description }}
      ></div>

      <small className="post-date">{new Date(post.createdAt).toLocaleString()}</small>

      {/* Edit and Delete buttons */}
      <div className="post-buttons">
        <Link to={`/blogs/posts/${id}/edit`} className="btn primary">Edit</Link>
        <button onClick={handleDelete} className="btn btn-delete">Delete</button>     
        </div>
    </div>
  );
};

export default PostDetail;
