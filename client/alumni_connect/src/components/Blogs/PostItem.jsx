import React from 'react';
import { Link } from 'react-router-dom';
import '../../blogs.css';

const PostItem = ({ id, title, category, description, image, createdAt }) => {
  return (
    <Link to={`/blogs/posts/${id}`} className="post-item">
      {image && (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="Post Thumbnail"
        />
      )}
      <h3>{title}</h3>
      <p>{category}</p>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <small>{new Date(createdAt).toLocaleString()}</small>
    </Link>
  );
};

export default PostItem;
