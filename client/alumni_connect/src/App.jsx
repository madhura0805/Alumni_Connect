import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import studentDashboard from '../src/components/Pages/student/studentDashboard';
import alumniDashboard from '../src/components/Pages/alumni/alumniDashboard';

function App() {
  const { user } = useContext(AuthContext); 
  
  if (!user) {
    return <LoginPage />;
  }

  return (
    <div>
      {user.role === "student" ? <studentDashboard /> : <alumniDashboard/>}
    </div>
  );
}

export default App;