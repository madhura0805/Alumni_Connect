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
import VerificationRoutes from './routes/VerificationRoute.js';
import postRoutes from './routes/postRoutes.js';  // Correct import
import multer from "multer";  // Import multer
import path from "path";  // Path module for handling file paths
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

// Connect to the database
connectDB();

// Initialize Express
const app = express();

// Set up CORS middleware to allow PATCH
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow frontend
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Ensure PATCH is included
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Apply CORS globally to the app
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Define the folder where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);  // Use a unique file name to avoid conflicts
  }
});

const upload = multer({ storage: storage });

// Serve static files (images) from 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/student/auth', StudentAuthRoutes);
app.use('/api/alumni/auth', AlumniAuthRoutes);
app.use('/api/student', StudentRoutes);
app.use('/api/search', SearchAlumniRoutes);
app.use('/api/chat', ChatRoutes);
app.use('/api/auth', VerificationRoutes);
app.use('/api/posts', postRoutes);

// Image upload route (for handling file uploads)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  const imageUrl = `/uploads/${req.file.filename}`;  // Return the URL of the uploaded image
  res.json({ imageUrl });
});

// Socket.io setup
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow frontend for WebSocket
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

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

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
