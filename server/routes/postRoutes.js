import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';

const router = express.Router();

const storage = multer.memoryStorage(); // Store image in memory (base64)
const upload = multer({ storage });

// Create a new post
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, author } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPost = new Post({
      title,
      description,
      author,
      image: req.file ? req.file.buffer.toString('base64') : null,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
});

// Get all posts (with optional search by title or author)
router.get('/', async (req, res) => {
  try {
    const { title } = req.query;
    let query = {};

    if (title) {
      query = {
        $or: [
          { title: { $regex: title, $options: 'i' } },
          { author: { $regex: title, $options: 'i' } },
        ]
      };
    }

    const posts = await Post.find(query);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts", error: error.message });
  }
});



// Get a single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the post", error: error.message });
  }
});

// Edit a post
router.patch('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        image: req.file ? req.file.buffer.toString('base64') : undefined, 
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("❌ Error updating post:", error);
    res.status(500).json({ message: "Error updating post", error: error.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(`Attempting to delete post with ID: ${postId}`);

    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    console.log(`Post deleted: ${deletedPost}`);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post", error: error.message });
  }
});

export default router;
