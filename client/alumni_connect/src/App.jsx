import './App.css';
import Home from './Page/Home.jsx';
import Connect from './components/Connect/ConnectPage.jsx'
import Blogs from '../src/Page/Blogs.jsx';
import Navbar from './components/Navbar/Navbar'; 
import Chat from '../src/components/community/ChatPage.jsx'
import SignUp from './components/SignUp/SignUp';
import Login from './components/LogIn/LogIn';
import AlumniDetails from './components/Connect/AlumniDetails.jsx';
import Community from "./components/community/CommunityPage.jsx"
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
    path:"signup",
    element:(
      <div>
        <SignUp></SignUp>
      </div>
    ),
  },
 
  {
    path:"/login",
    element:(
      <div>
        <Login></Login>
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
    path:"chat/:community",
    element:(
      <div>
        <Navbar>
        </Navbar>
        <Chat></Chat>
      </div>
    )
  },
  {
    path: "/community",
    element: (
      <div>
        <Navbar />
        <Community/>
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
