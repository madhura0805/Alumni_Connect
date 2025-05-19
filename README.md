# 🎓 AlumniX – Alumni Connect Platform

**AlumniX** is a dynamic and smart web platform that bridges the gap between alumni and current students. Designed to foster meaningful connections, career guidance, and professional networking, AlumniX empowers students to reach out to alumni based on roles, companies, and experience.

## 📺 Demo Video

👉 [Watch the Demo on YouTube](https://youtu.be/Pl26dveqHq0)

## 🚀 Features

- 🔍 **Advanced Semantic Search**  
  Find alumni using intelligent search queries like _"internship at Google"_ powered by **FAISS vector embeddings**.

- 💬 **One-on-One Real-Time Chat**  
  Students can chat directly with alumni using **Socket.io** for seamless communication.

- 🧠 **Structured Alumni Profiles**  
  Profiles include internships, work experiences, higher education, and skills for better discoverability.

- ✅ **OTP-Based Signup/Login**  
  Secure authentication via email OTPs using **Nodemailer**, **JWT**, and **bcrypt**.

- 🎨 **Student & Alumni Dashboards**  
  Intuitive dashboards for managing profiles, experiences, and connections with a clean, blue-themed UI.

## 🛠️ Tech Stack

- **Frontend**: React.js, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT, Bcrypt, OTP (Nodemailer)  
- **Semantic Search**: FAISS (Python)  
- **Real-Time Chat**: Socket.io  
- **Architecture**: MVC

## 📂 Project Structure

├── client/ # React frontend
├── server/ # Node.js + Express backend
├── faiss-service/ # Python FastAPI server for FAISS
├── models/ # Mongoose schemas
├── routes/ # API routes
└── README.md
