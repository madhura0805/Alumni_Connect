import './App.css';
import Home from './Page/Home.jsx';
import Connect from './components/Connect/ConnectPage.jsx';
import Navbar from './components/Navbar/Navbar'; 
import Chat from '../src/components/community/ChatPage.jsx';
import SignUp from './components/SignUp/SignUp';
import Login from './components/LogIn/LogIn';
import AlumniDetails from './components/Connect/AlumniDetails.jsx';
import Community from "./components/community/CommunityPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './components/Blogs/Layout.jsx';

// Blog-related pages
import HomePage from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import AuthorPosts from './pages/AuthorPosts';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "signup",
    element: (
      <div>
        <SignUp />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/connect",
    element: (
      <div>
        <Navbar />
        <Connect />
      </div>
    ),
  },
  {
    path: "/alumni/:id",
    element: (
      <div>
        <Navbar />
        <AlumniDetails />
      </div>
    ),
  },
  {
    path: "chat/:community",
    element: (
      <div>
        <Navbar />
        <Chat />
      </div>
    ),
  },
  {
    path: "/community",
    element: (
      <div>
        <Navbar />
        <Community />
      </div>
    ),
  },
  {
    path: "/blogs",
    element: (
      <div>
        <Navbar />
        <Layout />
      </div>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/:id", element: <PostDetail /> },
      { path: "users/:id", element: <AuthorPosts /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
    ],
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
