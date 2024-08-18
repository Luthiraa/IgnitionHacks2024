import React, { useState } from 'react';
import './Output.css';

const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <h2 dangerouslySetInnerHTML={{ __html: frontContent }} />
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
    { frontContent: "Question: For the polynomial P(x) = -6x^4 + 2x^2 - 1, which of the following statements is true? <br /> A) The function has an odd degree and shows point symmetry at the origin. <br /> B) The function has a line of symmetry along the y-axis. <br /> C) The possible turning points for the function are even. <br /> D) The function's end behavior is from Q1 to Q2. ", backContent: "Answer: B) The function has a line of symmetry along the y-axis." },
    {
      frontContent: `Which of the following best describes the end behavior of the function P(x) = -6x^4 + 2x^2 - 1?<br />
        A) Rises to the left and falls to the right<br />
        B) Falls to the left and rises to the right<br />
        C) Falls to the left and falls to the right<br />
        D) Rises to the left and rises to the right`,
      backContent: "C) Falls to the left and falls to the right"
    },
    {
      frontContent: `Given the polynomial function P(x) = -6x^4 + 2x^2 - 1, how many possible x-intercepts can there be?<br />
        A) 1<br />
        B) 2<br />
        C) 3<br />
        D) 4`,
      backContent: "D) 4"
    },
    {
      frontContent: `For the polynomial function P(x) = -6x^4 + 2x^2 - 1, what is the degree of the polynomial and what does it signify?<br />
        A) Degree 4, indicating 4 turning points<br />
        B) Degree 2, indicating 2 x-intercepts<br />
        C) Degree 3, indicating 3 turning points<br />
        D) Degree 4, indicating even symmetry`,
      backContent: "D) Degree 4, indicating even symmetry"
    },
  ];

  return (
    <div className="output-container">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars3"></div>
      <div id="stars3"></div>
      <div id="stars3"></div>
      <div id="stars3"></div>
      <div id="stars3"></div>
      <Carousel cards={cards} />
    </div>
  );
};

export default Output;