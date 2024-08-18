import React from 'react';
import Carousel from './Carousel';
import './Output.css';

function Output() {
  const cards = [
    { front: 'Front 1', back: 'Back 1' },
    { front: 'Front 2', back: 'Back 2' },
    { front: 'Front 3', back: 'Back 3' },
    { front: 'Front 3', back: 'Back 3' },
  ];

  return (
    <div className="container">
      <Carousel cards={cards} />
    </div>
  );
}

export default Output;


// import React, { useState, useEffect } from 'react';
// import Carousel from './Carousel';
// import './Output.css';

// function Output() {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://your-backend-api-url.com/cards');
//         const data = await response.json();
//         setCards(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container">
//       <Carousel cards={cards} />
//     </div>
//   );
// }

// export default Output;