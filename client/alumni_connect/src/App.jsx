import './App.css';
import Home from './components/Page/Home';
import Connect from './components/Page/Connect';
import Community from './components/Page/Community';
import Blogs from './components/Page/Blogs';
import Navbar from './components/Navbar/Navbar'; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    path: "/connect",
    element: (
      <div>
        <Navbar />
        <Connect />
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
        <Blogs />
      </div>
    ),
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
