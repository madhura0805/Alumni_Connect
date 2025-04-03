import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem.jsx';
import '../../blogs.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts?title=${search}`);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce API Calls (Wait 500ms after typing)
    const timer = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timer); // Cleanup function
  }, [search]);

  return (
    <div className="posts-container">
      <input 
        type="text" 
        placeholder="Search by title..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        className="search-input"
      />

      {loading && <p>Loading posts...</p>}

      <div className="post-grid">
        {posts.length > 0 ? posts.map((post) => (
          <PostItem
            key={post._id}
            id={post._id}
            title={post.title}
            image={post.image}
            createdAt={post.createdAt}
            author={post.author}  
          />
        )) : !loading && <p>No posts found.</p>}
      </div>
    </div>
  );
};

export default Posts;
