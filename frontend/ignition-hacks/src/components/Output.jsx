// import React, { useState } from 'react';
// import './Output.css';

// const FlipCard = ({ frontContent, backContent }) => {
//   const [isFlipped, setIsFlipped] = useState(false);

//   const handleFlip = () => {
//     setIsFlipped(!isFlipped);
//   };

//   return (
//     <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
//       <div className="flip-card-inner">
//         <div className="flip-card-front">
//           <h2 dangerouslySetInnerHTML={{ __html: frontContent }} />
//         </div>
//         <div className="flip-card-back">
//           <h2>{backContent}</h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Carousel = ({ cards }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === cards.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? cards.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="carousel-container">
//       <button className="carousel-button prev" onClick={handlePrev}>
//         &#10094;
//       </button>
//       <div className="carousel-wrapper">
//         {cards.map((card, index) => (
//           <div
//             className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
//             key={index}
//           >
//             <FlipCard frontContent={card.frontContent} backContent={card.backContent} />
//           </div>
//         ))}
//       </div>
//       <button className="carousel-button next" onClick={handleNext}>
//         &#10095;
//       </button>
//     </div>
//   );
// };

// const Output = () => {
//   const cards = [
//     {
//       frontContent: `Which of the following best describes the end behavior of the function P(x) = -6x^4 + 2x^2 - 1?<br /><br />
//         A) Rises to the left and falls to the right<br />
//         B) Falls to the left and rises to the right<br />
//         C) Falls to the left and falls to the right<br />
//         D) Rises to the left and rises to the right`,
//       backContent: "C) Falls to the left and falls to the right"
//     },

//     // Multiple Choice Question 2
//     {
//       frontContent: `Given the polynomial function P(x) = -6x^4 + 2x^2 - 1, how many possible x-intercepts can there be?<br /><br />
//         A) 1<br />
//         B) 2<br />
//         C) 3<br />
//         D) 4`,
//       backContent: "D) 4"
//     },

//     // Multiple Choice Question 3
//     {
//       frontContent: `For the polynomial function P(x) = -6x^4 + 2x^2 - 1, what is the degree of the polynomial and what does it signify?<br /><br />
//         A) Degree 4, indicating 4 turning points<br />
//         B) Degree 2, indicating 2 x-intercepts<br />
//         C) Degree 3, indicating 3 turning points<br />
//         D) Degree 4, indicating even symmetry`,
//       backContent: "D) Degree 4, indicating even symmetry"
//     },
//   ];

//   return (
//     <div className="output-container">
//       <div id="stars"></div>
//       <div id="stars2"></div>
//       <div id="stars"></div>
//       <div id="stars2"></div>
//       <div id="stars"></div>
//       <div id="stars2"></div>
//       <div id="stars"></div>
//       <div id="stars2"></div>
//       <div id="stars3"></div>
//       <div id="stars3"></div>
//       <div id="stars3"></div>
//       <div id="stars3"></div>
//       <div id="stars3"></div>
//       <div id="stars3"></div>
//       <Carousel cards={cards} />
//     </div>
//   );
// };

// export default Output;

import React, { useState } from 'react';
 import './Output.css';
const FlipCard = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center', // Align text to the left
    alignItems: 'flex-start', // Align text to the top
    border: '1px solid #ccc',
    borderRadius: '10px',
    fontSize: '10px', // Set font size to 10px
    color: 'black', // Set text color to black
    fontFamily: 'Arial, sans-serif',
    padding: '10px', // Add padding for better text spacing
    boxSizing: 'border-box', // Ensure padding doesn't affect the size
    textAlign: 'left', // Left justify the text
    overflowWrap: 'break-word', // Ensure long words break
    wordWrap: 'break-word', // Ensure long words break
    hyphens: 'auto', // Enable hyphenation
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front" style={{ ...cardStyle, backgroundColor: '#f0f0f0' }}>
          <h2 dangerouslySetInnerHTML={{ __html: frontContent }} />
        </div>
        <div className="flip-card-back" style={{ ...cardStyle, backgroundColor: '#B6D3E3', transform: 'rotateY(180deg)' }}>
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
    {
      frontContent: `Which of the following best describes the end behavior of the function P(x) = -6x^4 + 2x^2 - 1?<br /><br />
        A) Rises to the left and falls to the right<br />
        B) Falls to the left and rises to the right<br />
        C) Falls to the left and falls to the right<br />
        D) Rises to the left and rises to the right`,
      backContent: "C) Falls to the left and falls to the right"
    },

    // Multiple Choice Question 2
    {
      frontContent: `Given the polynomial function P(x) = -6x^4 + 2x^2 - 1, how many possible x-intercepts can there be?<br /><br />
        A) 1<br />
        B) 2<br />
        C) 3<br />
        D) 4`,
      backContent: "D) 4"
    },

    // Multiple Choice Question 3
    {
      frontContent: `For the polynomial function P(x) = -6x^4 + 2x^2 - 1, what is the degree of the polynomial and what does it signify?<br /><br />
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