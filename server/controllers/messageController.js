import Message from "../models/Message.js";

// Get messages for a specific community
export const getCommunityMessages = async (req, res) => {
  try {
    const { community } = req.params;
    const messages = await Message.find({ community }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
};

// Add a new message
export const addMessage = async (req, res) => {
  const { username, text, community } = req.body;

  try {
    const newMessage = new Message({ username, text, community });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error saving message" });
  }
};
