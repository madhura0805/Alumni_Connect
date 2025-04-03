import React from 'react';
import { Link } from 'react-router-dom';
import '../../blogs.css';

const PostItem = ({ id, title, image, createdAt, author }) => { // Added author prop
  return (
    <Link to={`/blogs/posts/${id}`} className="post-item">
      {image ? (
        <img src={`data:image/jpeg;base64,${image}`} alt="Post Thumbnail" className="post-image" />
      ) : (
        <div className="post-image-placeholder">No Image</div> 
      )}
      <h3 className="post-title">{title}</h3>
      <p className="post-author">By: {author || "Unknown"}</p> {/* Added author */}
      <small className="post-date">{new Date(createdAt).toLocaleString()}</small>
    </Link>
  );
};

export default PostItem;
