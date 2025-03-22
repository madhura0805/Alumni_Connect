import React, { useState } from "react";
import axios from "axios";
import './SignUp.css'

const SignUp = () => {
  // Default role is "student"
  const [role, setRole] = useState("student");

  // Form data contains common fields plus role-specific fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // Student-specific
    reg_no: "",
    department: "",
    // Alumni-specific
    yoe: "",
    currentJobProfile: "",
    currentCompany: "",
    linkedinUrl: "",
    graduationYear: "",
    higherEduDegree: "",
    higherEduUniversity: "",
    internshipCompany: "",
    internshipRole: "",
  });

  // Update form data state on input change
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
        // Student signup endpoint
        response = await axios.post(
          "http://localhost:5000/api/student/auth/signup",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            reg_no: formData.reg_no,
            department: formData.department,
          }
        );
      } else if (role === "alumni") {
        // Alumni signup endpoint
        response = await axios.post(
          "http://localhost:5000/api/alumni/auth/signup",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            yoe: formData.yoe,
            currentJobProfile: formData.currentJobProfile,
            currentCompany: formData.currentCompany,
            linkedinUrl: formData.linkedinUrl,
            graduationYear: formData.graduationYear,
            higherEduDegree: formData.higherEduDegree,
            higherEduUniversity: formData.higherEduUniversity,
            internshipCompany: formData.internshipCompany,
            internshipRole: formData.internshipRole,
          }
        );
      }
      console.log("Signup successful:", response.data);
      // You can redirect the user or show a success message here.
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      <div>
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
      <form onSubmit={handleSubmit}>
        {/* Common Fields */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Student-specific Fields */}
        {role === "student" && (
          <>
            <div>
              <label>Registration Number:</label>
              <input
                type="text"
                name="reg_no"
                value={formData.reg_no}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Alumni-specific Fields */}
        {role === "alumni" && (
          <>
            <div>
              <label>Years of Experience:</label>
              <input
                type="number"
                name="yoe"
                value={formData.yoe}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Current Job Profile:</label>
              <input
                type="text"
                name="currentJobProfile"
                value={formData.currentJobProfile}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Current Company:</label>
              <input
                type="text"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>LinkedIn URL:</label>
              <input
                type="url"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Graduation Year:</label>
              <input
                type="number"
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Higher Education Degree:</label>
              <input
                type="text"
                name="higherEduDegree"
                value={formData.higherEduDegree}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>University:</label>
              <input
                type="text"
                name="higherEduUniversity"
                value={formData.higherEduUniversity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Internship Company:</label>
              <input
                type="text"
                name="internshipCompany"
                value={formData.internshipCompany}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Internship Role:</label>
              <input
                type="text"
                name="internshipRole"
                value={formData.internshipRole}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
