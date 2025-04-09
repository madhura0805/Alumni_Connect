import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    reg_no: "",
    department: "",
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

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSendOTP = async () => {
    if (!formData.email) {
      setError("Please enter an email first.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email: formData.email });
      alert("OTP sent to your email!");
      setOtpSent(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!otpSent) {
      setError("Please request an OTP before signing up.");
      return;
    }
  
    try {
      let response;
  
      if (role === "student") {
        const studentData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          otp: formData.otp,
          reg_no: formData.reg_no,
          department: formData.department,
        };
  
        response = await axios.post("http://localhost:5000/api/student/auth/signup", studentData, {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("otp", formData.otp);
        formDataToSend.append("currentJobProfile", formData.currentJobProfile);
        formDataToSend.append("currentCompany", formData.currentCompany);
        formDataToSend.append("linkedinUrl", formData.linkedinUrl);
        formDataToSend.append("graduationYear", Number(formData.graduationYear));
        formDataToSend.append("yoe", Number(formData.yoe));
  
        if (formData.internshipCompany && formData.internshipRole) {
          formDataToSend.append("internshipCompany", formData.internshipCompany);
          formDataToSend.append("internshipRole", formData.internshipRole);
        }
  
        if (profileImage) {
          formDataToSend.append("profileImage", profileImage);
        }
  
        response = await axios.post("http://localhost:5000/api/alumni/auth/signup", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
  
      console.log("Signup successful:", response.data);
      alert("Signup successful! Redirecting to login...");
      navigate("/login");
  
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };
  

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      {error && <div className="error-message">{error}</div>}

      <div>
        <label>
          <input type="radio" name="role" value="student" checked={role === "student"} onChange={() => setRole("student")} />
          Student
        </label>
        <label>
          <input type="radio" name="role" value="alumni" checked={role === "alumni"} onChange={() => setRole("alumni")} />
          Alumni
        </label>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <button type="button" onClick={handleSendOTP} disabled={otpSent}>
            {otpSent ? "OTP Sent" : "Send OTP"}
          </button>
        </div>
        <div>
          <label>OTP:</label>
          <input type="text" name="otp" value={formData.otp} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        {/* Student Fields */}
        {role === "student" && (
          <>
            <div>
              <label>Registration Number:</label>
              <input type="text" name="reg_no" value={formData.reg_no} onChange={handleChange} required />
            </div>
            <div>
              <label>Department:</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} required />
            </div>
          </>
        )}

        {/* Alumni Fields */}
        {role === "alumni" && (
          <>
            <div>
              <label>Profile Image:</label>
              <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
            </div>
            <div>
              <label>Current Job Profile:</label>
              <input type="text" name="currentJobProfile" value={formData.currentJobProfile} onChange={handleChange} />
            </div>
            <div>
              <label>Current Company:</label>
              <input type="text" name="currentCompany" value={formData.currentCompany} onChange={handleChange} required />
            </div>
            <div>
              <label>LinkedIn URL:</label>
              <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} required />
            </div>
            <div>
              <label>Graduation Year:</label>
              <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} required />
            </div>
            <div>
              <label>Years of Experience:</label>
              <input type="number" name="yoe" value={formData.yoe} onChange={handleChange} required />
            </div>
            <div>
              <label>Internship Company:</label>
              <input type="text" name="internshipCompany" value={formData.internshipCompany} onChange={handleChange} />
            </div>
            <div>
              <label>Internship Role:</label>
              <input type="text" name="internshipRole" value={formData.internshipRole} onChange={handleChange} />
            </div>
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;