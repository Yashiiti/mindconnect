// src/pages/AIChatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import './AIChatbot.css';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi, I'm MindConnect, your AI therapist. How can I support you today?", sender: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const newUserMessage = { text: userInput, sender: 'user' };
    const updatedMessages = [...messages, newUserMessage]; // Add new message to history

    setMessages(updatedMessages); // Update state immediately
    setUserInput(''); // Clear input field

    try {
      console.log("Sending request to /api/gemini with message history");

      const response = await fetch('http://localhost:5000/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }), // Send entire message history
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response received from /api/gemini", data);
      setMessages([...updatedMessages, { text: data.response, sender: 'bot' }]); // Add bot's reply

    } catch (error) {
      console.error('Error fetching Gemini API:', error);
      setMessages([
        ...updatedMessages,
        { text: 'Error communicating with the AI. Please try again later.', sender: 'bot' },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="message-list" ref={messageListRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default AIChatbot;