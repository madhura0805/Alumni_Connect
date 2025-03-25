import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {UserContext} from '../context/UserContext'
import axios from 'axios'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [error,setError] = useState('')
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;


  const modules = {
    toolbar: { 
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ]
    }
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


  const createPost = async (e)=>{
    e.preventDefault();

    const postData = new FormData();
    postData.set('title',title)
    postData.set('category',category)
    postData.set('description',description)
    postData.set('thumbnail',thumbnail)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`,postData,{withCredentials:true,
        headers :{Authorization:`Bearer ${token}`}
      })
      if(response.status == 201){
        return navigate('/')
      }
    } catch (error) {
      setError(error.response.data.message)
    }

  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, category, description, thumbnail });
    // Handle form submission logic (e.g., API call)
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
    {POST_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
  </select>

  {/* Ensure there's only one ReactQuill editor */}
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
