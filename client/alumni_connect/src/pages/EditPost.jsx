import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing post details
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
      } catch (error) {
        console.log("❌ Error fetching post:", error.response?.data || error.message);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.append('title', title);
    postData.append('category', category);
    postData.append('description', description);
    if (thumbnail) {
      postData.append('image', thumbnail); // Ensure backend expects "image"
    }

    try {
      const response = await axios.patch(`http://localhost:5000/api/posts/${id}`, postData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("✅ Post Updated Successfully:", response.data);
      if (response.status === 200) {
        navigate('/blogs'); // Redirect after update
      }
    } catch (error) {
      console.error("❌ Error updating post:", error.response?.data || error.message);
      setError(error.response?.data?.message || 'Error updating post');
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


