import React, { useState, useEffect } from "react";
import { FaPaperclip } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState("placeholder");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [clicked, setClicked] = useState(false); // State to manage click animation

  useEffect(() => {
    const text = "NINJA BRAIN";
    const container = document.getElementById("animatedText");

    container.innerHTML = "";

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.innerHTML = char === " " ? "&nbsp;" : char;
      container.appendChild(span);
    });

    const letters = document.querySelectorAll(".letter");
    const delayIncrement = 100;

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
      letters.forEach((letter) => {
        letter.style.opacity = 0;
        letter.style.transform = "translateY(0)";
      });
    }

    function loopAnimation() {
      resetLetters();
      setTimeout(animateLetters, 500);
    }

    animateLetters();
    const intervalId = setInterval(loopAnimation, (letters.length - 1) * delayIncrement + 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (dropdownVisible) {
      setTimeout(() => {
        document.querySelector(".drop").classList.add("withBG");
      }, 400 + document.querySelectorAll(".drop .option").length * 100);
    }
  }, [dropdownVisible]);

  const handleOptionClick = (value) => {
    const prevActive = selectedTerm;
    setSelectedTerm(value);

    const activeOption = document.querySelector(".option.active");
    if (activeOption) activeOption.classList.add("mini-hack");

    setClicked(true); // Set clicked to true to trigger animation
    setDropdownVisible(!dropdownVisible);

    if (dropdownVisible) {
      setTimeout(() => {
        document.querySelector(".drop").classList.add("withBG");
      }, 400 + document.querySelectorAll(".drop .option").length * 100);
    }

    setTimeout(() => {
      setClicked(false); // Reset clicked after animation completes
      const miniHack = document.querySelector(".mini-hack");
      if (miniHack) miniHack.classList.remove("mini-hack");
    }, 300);

    if (value !== "placeholder" || prevActive === "placeholder") {
      document.querySelectorAll(".drop .option").forEach((option) => {
        option.classList.remove("active");
      });
      document.querySelector(`[data-value="${value}"]`).classList.add("active");
    }

    triggerAnimation();
  };

  const triggerAnimation = () => {
    const finalWidth = dropdownVisible ? 22 : 20;
    document.querySelector(".drop").style.width = "24em";
    setTimeout(() => {
      document.querySelector(".drop").style.width = `${finalWidth}em`;
    }, 400);
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

  const handleSendMessage = () => {
    if (input.trim() === "" && !image) return;

    const newMessage = {
      content: input,
      sender: "user",
      image: image ? URL.createObjectURL(image) : null,
      termType: selectedTerm,
    };

    // Save the message but do not output anything
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setImage(null);
  };

  return (
    <div className="app">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <header className="header">
        <div id="animatedText" className="animated-text"></div>
        <div className={`drop ${dropdownVisible ? "visible opacity" : ""} ${clicked ? "clicked" : ""}`}>
          <div
            className="option active placeholder"
            data-value="placeholder"
            onClick={() => handleOptionClick("placeholder")}
          >
            {selectedTerm === "placeholder" ? "Choose wisely" : selectedTerm}
          </div>
          <div
            className="option"
            data-value="Flashcards"
            onClick={() => handleOptionClick("Flashcards")}
          >
            Flashcards
          </div>
          <div
            className="option"
            data-value="Long Answer"
            onClick={() => handleOptionClick("Long Answer")}
          >
            Long Answer
          </div>
          <div
            className="option"
            data-value="Short Answer"
            onClick={() => handleOptionClick("Short Answer")}
          >
            Short Answer
          </div>
          <div
            className="option"
            data-value="Multiple Choice"
            onClick={() => handleOptionClick("Multiple Choice")}
          >
            Multiple Choice
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
            className={`textArea ${image ? "withImage" : ""}`}
            placeholder="Type a message..."
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="imagePreviewInput"
            />
          )}
          <button onClick={handleSendMessage} className="sendButton">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
