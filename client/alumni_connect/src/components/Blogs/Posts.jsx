import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem.jsx';
import '../../blogs.css'; // Ensure this is the correct path for your CSS file

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts'); // Adjust API URL as needed
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-grid"> {/* Updated class name for grid layout */}
      {posts.map((post) => (
        <PostItem
          key={post._id}  
          id={post._id}  
          title={post.title}
          category={post.category}
          image={post.image}
          createdAt={post.createdAt}
        />
      ))}
    </div>
  );
};

export default Posts;
