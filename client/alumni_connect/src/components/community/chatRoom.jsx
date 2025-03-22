import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "./ChatRoom.css";

const socket = io("http://localhost:5000");

const ChatRoom = () => {
  const { community } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const [darkMode, setDarkMode] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    socket.emit("joinCommunity", community);

    axios
      .get(`http://localhost:5000/api/chat/${community}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.community === community) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [community]);

  const sendMessage = async () => {
    if (!message.trim() || !username.trim()) return;

    const newMessage = { username, text: message, community };

    await axios.post("http://localhost:5000/api/chat/", newMessage);
    socket.emit("sendMessage", newMessage);

    setMessage("");
  };

  return (
    <div className={`chat-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <h2>{community} Chat Room</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
            🌙 {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Chat Messages */}
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.username === username ? "my-message" : "other-message"}`}
            >
              <strong>{msg.username}:</strong> {msg.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
            😊
          </button>
          {showEmojiPicker && <div className="emoji-picker">😀 😃 😄 😁 😆 😅 😂 🤣 😊</div>}

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
