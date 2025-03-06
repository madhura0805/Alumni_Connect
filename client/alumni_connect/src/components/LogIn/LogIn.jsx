import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Make sure to create this file for styling

const Login = () => {
  // Default role is "student"
  const [role, setRole] = useState("student");

  // Form data: email and password are needed for login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (role === "student") {
        // Student login endpoint
        response = await axios.post("http://localhost:5000/api/student/auth/login", {
          email: formData.email,
          password: formData.password,
        });
      } else if (role === "alumni") {
        // Alumni login endpoint
        response = await axios.post("http://localhost:5000/api/alumni/auth/login", {
          email: formData.email,
          password: formData.password,
        });
      }
      console.log("Login successful:", response.data);
      
      // Store token directly in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect based on role
      navigate(role === "student" ? "/" : "/");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="role-toggle">
        <label>
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === "student"}
            onChange={() => setRole("student")}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="alumni"
            checked={role === "alumni"}
            onChange={() => setRole("alumni")}
          />
          Alumni
        </label>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
