import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const DeletePost = ({ postId: id, author }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Get the logged-in user from localStorage
  const alumniUser = JSON.parse(localStorage.getItem('alumniUser'));

  // Check if the current user is the author
  const isAuthor = currentUser?.name === post.author && currentUser?.role === 'alumni';

  const removePost = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        withCredentials: true,
      });

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

  if (!isAuthor) return null; // Don't show the button if not the author

  return (
    <button className="btn sm danger" onClick={removePost} disabled={isLoading}>
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeletePost;
