import React, { useState, useEffect } from "react";
import { FaPaperclip } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState("flashcards");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const text = "NINJA BRAIN";
    const container = document.getElementById("animatedText");

    // Clear any existing content in the container
    container.innerHTML = "";

    // Create spans for each letter
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.className = "letter";
      span.innerHTML = char === " " ? "&nbsp;" : char;
      container.appendChild(span);
    });

    const letters = document.querySelectorAll(".letter");
    const totalLetters = letters.length;
    const delayIncrement = 100;

    function easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }

    function animateLetters() {
      letters.forEach((letter, index) => {
        const delay = index * delayIncrement;
        setTimeout(() => {
          letter.style.opacity = 1;
          letter.style.transform = "translateY(0)";
        }, delay);
      });
    }

    function resetLetters() {
      letters.forEach(letter => {
        letter.style.opacity = 0;
        letter.style.transform = "translateY(0)";
      });
    }

    function loopAnimation() {
      resetLetters();
      setTimeout(animateLetters, 500); // Add a small delay before restarting the animation
    }

    animateLetters();
    const intervalId = setInterval(loopAnimation, (totalLetters - 1) * delayIncrement + 2000); // Adjust the interval time as needed

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

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

  const handleTermChange = (term) => {
    setSelectedTerm(term);
    setDropdownOpen(false); // Close dropdown when an option is selected
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="app">
      <header className="header">
        <div id="animatedText" className="animated-text"></div>
        <div className="dropdownContainer">
          <button onClick={toggleDropdown} className={`dropdownButton ${dropdownOpen ? 'open' : ''}`}>
            {selectedTerm}
          </button>
          <div className={`dropdownMenu ${dropdownOpen ? 'open' : 'closed'}`}>
            <button onClick={() => handleTermChange("Flashcards")} className="dropdownItem">Flashcards</button>
            <button onClick={() => handleTermChange("Long Answer")} className="dropdownItem">Long Answer</button>
            <button onClick={() => handleTermChange("Short Answer")} className="dropdownItem">Short Answer</button>
            <button onClick={() => handleTermChange("Multiple Choice")} className="dropdownItem">Multiple Choice</button>
          </div>
        </div>
      </header>
      <div className="chatContainer">
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
            className={`textArea ${image ? 'withImage' : ''}`}
            placeholder="Type a message..."
          />
          {image && <img src={URL.createObjectURL(image)} alt="Preview" className="imagePreviewInput" />}
          <button onClick={handleSendMessage} className="sendButton">
            Send
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default Home;
