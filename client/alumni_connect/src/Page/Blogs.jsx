import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Blogs/Layout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail'
import PostDetail from '../pages/TestPage'
import CreatePost from '../pages/CreatePost';
import CategoryPosts from '../pages/CategoryPosts';
import AuthorPosts from '../pages/AuthorPosts';
import Dashboard from '../pages/Dashboard';
import EditPost from '../pages/EditPost';
import DeletePost from '../pages/DeletePost';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="blogs/posts/:id" element={<PostDetail />} />
          <Route path="blogs/create" element={<CreatePost />} />
          <Route path="posts/categories/:category" element={<CategoryPosts />} />
          <Route path="posts/users/:id" element={<AuthorPosts />} />
          <Route path="myposts/:id" element={<Dashboard />} />
          <Route path="/blogs/posts/:id/edit" element={<EditPost />} />
          <Route path="/blogs/posts/:id/delete" element={<DeletePost />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
