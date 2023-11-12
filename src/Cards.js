import React from 'react'
import './App.css'

function Cards({ card, handleChoice, flipped,disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };
  return (
    <div>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="" />
          <img
            className="back"
            onClick={handleClick}
            src="/img/Hexagon.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Cards