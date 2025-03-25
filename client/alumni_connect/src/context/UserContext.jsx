// 

import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const UserContext = createContext();

// Provider Component
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🚨 TEMPORARY: Hardcode a user for testing
    setCurrentUser({
      id: "653a8e9fdcabc1234", // Replace with a real user ID from MongoDB
      name: "Test Alumni",
      role: "alumni",  // Change to "student" for testing student access
      email: "testuser@example.com"
    });

    setLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
