import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbconnect.js";
import StudentAuthRoutes from "./routes/StudentAuthRoutes.js";
import StudentRoutes from "./routes/StudentRoutes.js";
import AlumniAuthRoutes from "./routes/AlumniAuthRoutes.js";
import SearchAlumniRoutes from "./routes/SearchAlumniRoute.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import Message from "./models/Message.js";
import VerificationRoutes from './routes/VerificationRoute.js'

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/student/auth', StudentAuthRoutes);
app.use('/api/alumni/auth', AlumniAuthRoutes);
app.use('/api/student', StudentRoutes);
app.use('/api/search', SearchAlumniRoutes);
app.use('/api/chat', ChatRoutes);
app.use('/api/auth',VerificationRoutes);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("joinCommunity", (community) => {
    socket.join(community);
    console.log(`User joined community: ${community}`);
  });

  socket.on("sendMessage", async (data) => {
    const { username, text, community } = data;
    if (!username || !text.trim() || !community) return;

    try {
      const newMessage = new Message({ username, text, community });
      await newMessage.save();

      io.to(community).emit("receiveMessage", newMessage);
      console.log(`Message sent in ${community}`);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// const userRoutes = require('./routes/userRoutes');
import postRoutes from './routes/postRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// Routes
// app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes); 

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
