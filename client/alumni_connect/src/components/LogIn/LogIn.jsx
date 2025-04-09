import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure you have this file for styling

const Login = () => {
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Store login error message
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const endpoint =
        role === "student"
          ? "http://localhost:5000/api/student/auth/login"
          : "http://localhost:5000/api/alumni/auth/login";

      const response = await axios.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      // Store token & user role in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "student") {
        navigate("/connect");
      } else {
        navigate("/connect");
      }
      if (role === "alumni") {
        localStorage.setItem("alumniUser", JSON.stringify({
          name: response.data.name,
          email: response.data.email
        }));
        navigate("/");
      }
      
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      
      {error && <div className="error-message">{error}</div>} {/* Display error if login fails */}

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