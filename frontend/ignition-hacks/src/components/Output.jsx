import React, { useState } from 'react';
import './Output.css'; // Updated to 'Output.css'

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2>{frontContent}</h2>
        </div>
        <div className="flip-card-back">
          <h2>{backContent}</h2>
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={handlePrev}>
        &#10094;
      </button>
      <div className="carousel-wrapper">
        {cards.map((card, index) => (
          <div
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            key={index}
          >
            <FlipCard frontContent={card.frontContent} backContent={card.backContent} />
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

const Output = () => {
  const cards = [
    { frontContent: 'Front 1', backContent: 'Back 1' },
    { frontContent: 'Front 2', backContent: 'Back 2' },
    { frontContent: 'Front 3', backContent: 'Back 3' },
    { frontContent: 'Front 4', backContent: 'Back 4' },
  ];

  return (
    <div className="output-container">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Carousel cards={cards} />
    </div>
  );
};

export default Output;
