import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./chat.css";

const socket = io("http://localhost:5000");

const Chat = ({ userId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinChat", { senderId: userId, receiverId });

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, receiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/messages/${userId}/${receiverId}`
        );
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    fetchMessages();
  }, [userId, receiverId]);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessage = { senderId: userId, receiverId, message };
    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    await axios.post("http://localhost:5000/api/messages", newMessage);
  };

  return (
    <div>
      <h2>Chat with {receiverId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.senderId === userId ? "blue" : "green" }}>
            {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
