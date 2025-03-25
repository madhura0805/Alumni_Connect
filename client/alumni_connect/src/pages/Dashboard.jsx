import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Loader from '../components/Blogs/Loader';
import DeletePost from './DeletePost';

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (currentUser?.role !== 'alumni') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${currentUser?.id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    
    if (currentUser?.role === 'alumni') {
      fetchPosts();
    }
  }, [currentUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map(post => (
            <article key={post._id} className='dashboard__post'>
              <div className="dashboard__post-info">
                <div className="dashboard__thumbnail">
                  <img src={`${process.env.REACT_APP_ASSESTS_URL}/uploads/${post.thumbnail}`} alt=" " />
                </div>
                <h5>{post.title}</h5>
              </div>

              {/* 🔹 Only show Edit/Delete for alumni */}
              {currentUser?.role === 'alumni' && (
                <div className="dashboard__buttons">
                  <Link to={`/posts/${post._id}`} className='btn view'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePost postId={post._id} />
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <h2 className='center'>You have no posts</h2>
      )}
    </section>
  );
};

export default Dashboard;
