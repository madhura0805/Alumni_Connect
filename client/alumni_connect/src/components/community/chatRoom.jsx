import React, { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import "./chatRoom.css";

const socket = io("http://localhost:5000");

const ChatRoom = () => {
  const { community } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const [darkMode, setDarkMode] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);


  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);
  
  
  
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
    inputRef.current?.focus();
  };

  return (
    <div className={`chat-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Chat Box */}
        <div className="chat-box">
          <h3 className="chat-room-title">{community} Chat</h3>
          <p className="online-count">7 online</p>

          {/* Messages */}
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.username === username ? "my-message" : "other-message"}`}
              >
                <div className="user-info">
                  <strong>{msg.username}</strong>
                </div>
                <div className="message-text">{msg.text}</div>
                <p className="message-time">09:26 AM</p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="input-area">
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="emoji-button">
              😊
            </button>
            {showEmojiPicker && (
              <div className="emoji-picker">
                {["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊"].map((emoji) => (
                  <span
                    key={emoji}
                    onClick={() => {
                      setMessage((prev) => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                    style={{ cursor: "pointer", fontSize: "1.5rem", margin: "5px" }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();  
                }
              }}
              className="input-field"
              ref={inputRef}
            />
            <button onClick={sendMessage} className="send-button">➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
