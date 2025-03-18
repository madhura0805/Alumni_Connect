import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbconnect.js";
// import messageRoutes from "./routes/ChatRoutes.js";
// import Message from "./models/message.js";
import StudentAuthRoutes from "./routes/StudentAuthRoutes.js";
import StudentRoutes from './routes/StudentRoutes.js'
import AlumniAuthRoutes from "./routes/AlumniAuthRoutes.js";
import SearchAlumniRoutes from  './routes/SearchAlumniRoute.js'

const port=5000;

dotenv.config();
connectDB(); // Ensure MongoDB is connected before starting the server

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// // Middlewares
// app.use(cors());
// app.use(json());
// app.use("/api/messages", messageRoutes);

// io.on("connection", (socket) => {
//   console.log(`⚡ User connected: ${socket.id}`);

//   // Join Chat Room
//   socket.on("joinChat", ({ senderId, receiverId }) => {
//     if (!senderId || !receiverId) {
//       console.error("❌ Invalid sender or receiver ID");
//       return;
//     }

//     const chatRoom = [senderId, receiverId].sort().join("_");
//     socket.join(chatRoom);
//     console.log(`✅ User ${senderId} joined room: ${chatRoom}`);
//   });

//   // Send Message
//   socket.on("sendMessage", async (data) => {
//     const { senderId, receiverId, message } = data;
//     if (!senderId || !receiverId || !message.trim()) {
//       console.error("❌ Invalid message data");
//       return;
//     }

//     const chatRoom = [senderId, receiverId].sort().join("_");

//     try {
//       const newMessage = new Message({ senderId, receiverId, message });
//       await newMessage.save();

//       io.to(chatRoom).emit("receiveMessage", newMessage);
//       console.log(`📩 Message sent in room ${chatRoom}`);
//     } catch (error) {
//       console.error("❌ Error saving message:", error);
//     }
//   });

//   // Handle Disconnection
//   socket.on("disconnect", () => {
//     console.log(`⚡ User disconnected: ${socket.id}`);
//   });
// });

app.use('/api/student/auth',StudentAuthRoutes);
app.use('/api/alumni/auth',AlumniAuthRoutes);
app.use('/api/student',StudentRoutes);
app.use('/api/search',SearchAlumniRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
