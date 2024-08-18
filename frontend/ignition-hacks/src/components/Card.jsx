import React, { useState, useEffect } from 'react';
import { useSpring, a } from '@react-spring/web';
import './Card.css';

function Card({ text, key }) {
  const [flipped, set] = useState(false);

  useEffect(() => {
    set(false); // Reset the flipped state when the key changes
  }, [key]);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div className="card" onClick={() => set(state => !state)}>
      <a.div
        className="c back"
        style={{ opacity: opacity.to(o => 1 - o), transform }}
      >
        {text.back}
      </a.div>
      <a.div
        className="c front"
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      >
        {text.front}
      </a.div>
    </div>
  );
}

export default Card;