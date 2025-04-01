import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import "../blogs.css";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState('');

  // Define navigate
  const navigate = useNavigate();

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

  const createPost = async (e) => {
    e.preventDefault();
  
    const postData = new FormData();
    postData.append('title', title);
    postData.append('category', category);
    postData.append('description', description);
    if (thumbnail) {
      postData.append('image', thumbnail);  // Image file
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/posts', postData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        navigate('/blogs');  // Navigate to home after creation
      }
    } catch (error) {
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      setError(error.response?.data?.message || 'Error creating post');
    }
  };
  
  
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      console.log('Selected image:', e.target.files[0]);  // Log the selected file
      setThumbnail(e.target.files[0]);
    }
  };

  return (
    <div>
      <section className="create-post">
        <div className="text_container">
          <h2>Create Post</h2>
          {error && <p className='form__error-message'>{error}</p>}
          <form className='form create-post__form' onSubmit={createPost}>
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
              {POST_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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

            <button type="submit" className='btn primary'>Create</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
