import React, { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // When the app loads, check localStorage for an existing token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const decodedUser = jwtDecode(storedToken);
      setUser(decodedUser);
    }
  }, []);

  // Function to log in: save the token and decode user info
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  // Function to log out: clear the token and user info
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
