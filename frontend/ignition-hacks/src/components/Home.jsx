import React, { useState } from "react";
import "./Home.css"; // Ensure this path is correct
import { FaPaperclip } from "react-icons/fa"; // For paperclip icon

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState("flashcards");

  const handleSendMessage = () => {
    if (input.trim() === "" && !image) return;

    const newMessage = {
      content: input,
      sender: "user",
      image: image ? URL.createObjectURL(image) : null,
      termType: selectedTerm,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setImage(null);

    setTimeout(() => {
      const botResponse = {
        content: `Echo: ${input}`,
        sender: "bot",
        image: null,
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Ninja Brain</h1>
        <select value={selectedTerm} onChange={handleTermChange} className="dropdown">
          <option value="flashcards">Flashcards</option>
          <option value="long-answer">Long Answer</option>
          <option value="short-answer">Short Answer</option>
          <option value="multiple-choice">Multiple Choice</option>
        </select>
      </header>
      <div className="chatBox">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.sender === "bot" && <div className="bot">Bot: </div>}
            {msg.sender === "user" && <div className="user">You: </div>}
            {msg.content && <p>{msg.content}</p>}
            {msg.image && <img src={msg.image} alt="Preview" className="imagePreview" />}
            <div className={`termType ${msg.termType}`}>{msg.termType}</div>
          </div>
        ))}
      </div>
      <div className="inputBar">
        <label htmlFor="file-upload" className="uploadButton">
          <FaPaperclip />
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageChange}
          className="imageInput"
        />
        <textarea
          value={input}
          onChange={handleInputChange}
          className="textArea"
        />
        {image && <img src={URL.createObjectURL(image)} alt="Preview" className="imagePreviewInput" />}
        <button onClick={handleSendMessage} className="sendButton">
          Send
        </button>
      </div>
    </div>
  );
};

export default Home;
