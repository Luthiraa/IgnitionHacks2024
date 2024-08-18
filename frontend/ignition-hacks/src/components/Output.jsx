import React from 'react';
import Carousel from './Carousel';
import './Output.css';

function Output() {
  const cards = [
    { front: 'Front 1', back: 'Back 1' },
    { front: 'Front 2', back: 'Back 2' },
    { front: 'Front 3', back: 'Back 3' },
  ];

  return (
    <div className="container">
      <Carousel cards={cards} />
    </div>
  );
}

export default Output;