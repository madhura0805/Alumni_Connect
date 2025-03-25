import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UserContext } from '../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Fixed useParams()

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect students away from this page
  useEffect(() => {
    if (currentUser?.role !== 'alumni') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Fetch post details
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]); // ✅ Added `id` as a dependency

  const editPost = async (e) => {
    e.preventDefault();
    if (currentUser?.role !== 'alumni') {
      setError("Access Denied: Only alumni can edit posts.");
      return;
    }

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    if (thumbnail) {
      postData.set('thumbnail', thumbnail);
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while updating the post.");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  const POST_CATEGORIES = [
    "Agriculture", "Business", "Education", "Entertainment", "Art", "Investment"
  ];

  return (
    <div>
      <section className="create-post">
        <div className="text_container">
          <h2>Edit Post</h2>
          {error && <p className='form__error-message'>{error}</p>}
          <form className='form create-post__form' onSubmit={editPost}>
            <input
              type='text'
              name='title'
              placeholder='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />

            <select
              name="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {POST_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <ReactQuill
              modules={modules}
              formats={formats}
              value={description}
              onChange={setDescription}
            />

            <input
              type='file'
              onChange={handleFileChange}
              accept='image/png, image/jpg, image/jpeg'
            />

            <button type="submit" className='btn primary'>Update</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditPost;
