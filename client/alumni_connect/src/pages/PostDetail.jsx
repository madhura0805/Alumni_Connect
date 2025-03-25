import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../components/Blogs/PostAuthor';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Blogs/Loader';
import DeletePost from './DeletePost';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred while fetching the post.");
      }
      setIsLoading(false);
    };
    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post-detail">
      {error && <p className='error'>{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            
            {/* 🔹 Hide Edit/Delete buttons from students */}
            {currentUser?.role === 'alumni' && currentUser?.id === post?.creator && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={`${process.env.REACT_APP_ASSESTS_URL}/uploads/${post.thumbnail}`} alt="" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
