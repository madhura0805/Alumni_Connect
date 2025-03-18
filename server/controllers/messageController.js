// import Message from "../models/message.js";

// // Send a message
// const sendMessage = async (req, res) => {
//   try {
//     const { senderId, receiverId, message } = req.body;

//     const newMessage = new Message({ senderId, receiverId, message });
//     await newMessage.save();

//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send message" });
//   }
// };

// // Get chat history between two users
// const getMessages = async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;

//     const messages = await find({
//       $or: [
//         { senderId, receiverId },
//         { senderId: receiverId, receiverId: senderId },
//       ],
//     }).sort({ createdAt: 1 });

//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch messages" });
//   }
// };

// export default { sendMessage, getMessages };
