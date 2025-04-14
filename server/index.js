import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import cors from "cors";
import Post from './models/Post.js';
import dotenv from "dotenv";
import connectDB from "./config/dbconnect.js";
import StudentAuthRoutes from "./routes/StudentAuthRoutes.js";
import StudentRoutes from "./routes/StudentRoutes.js";
import AlumniAuthRoutes from "./routes/AlumniAuthRoutes.js";
import SearchAlumniRoutes from "./routes/SearchAlumniRoute.js";
import ChatRoutes from "./routes/ChatRoutes.js";
import Message from "./models/Message.js";
import VerificationRoutes from './routes/VerificationRoute.js';
import postRoutes from './routes/postRoutes.js';  
import multer from "multer";  
import path from "path";  // Path module for handling file paths
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import alumniRoutes from './routes/AlumniRoutes.js'; 

// Get the directory name of the current module (index.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname to join paths
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
import fs from 'fs';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

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
    cb(null, 'uploads/'); // Define where the file should be saved
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const uniqueName = uuidv4().slice(0, 8) + ext; // Generate a short UUID name
    cb(null, uniqueName); // Use the generated unique name
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 5MB limit
});


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
app.use('/api', alumniRoutes);

app.post('/api/posts', upload.single('image'), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: 'File size exceeds the limit (5MB)' });
  }

  const { title, description, author } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newPost = new Post({
      title,
      description,
      author,
      image: imageUrl,  // Save the shortened image URL
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
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
