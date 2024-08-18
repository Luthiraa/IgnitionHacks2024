import React, { useState } from 'react';
import Card from './Card';
import './Carousel.css';

function Carousel({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button left" onClick={prevCard}>‹</button>
      <div className="carousel-card">
        <Card key={currentIndex} text={cards[currentIndex]} />
      </div>
      <button className="carousel-button right" onClick={nextCard}>›</button>
    </div>
  );
}

export default Carousel;