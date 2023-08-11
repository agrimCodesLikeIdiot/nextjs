"use client"

import { useChat } from "ai";
import React, { useState } from "react";

export default function chat() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const chat = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = e.target.message.value;
    setMessage("");
    setResponse(await chat.generateResponse(newMessage));
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
        <br />
        <p>{response}</p>
      </div>
    </>
  );
};
