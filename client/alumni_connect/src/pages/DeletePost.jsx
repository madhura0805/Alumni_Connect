import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const removePost = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, { withCredentials: true });

      if (response.status === 200) {
        if (location.pathname === `/myposts/${id}`) {
          navigate(0); // Refresh the page
        } else {
          navigate('/blogs'); // Redirect to blogs after deletion
        }
      }
    } catch (error) {
      console.error("❌ Error deleting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="btn sm danger" onClick={removePost} disabled={isLoading}>
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeletePost;
