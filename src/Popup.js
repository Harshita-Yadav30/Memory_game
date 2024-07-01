import './Popup.css';
import image from './celebrate.gif';
import React from 'react';

export const Popup = ({flipCount, setBoard, showPopup, setShowPopup, count}) => {
  let startGame = ()=>{
    setShowPopup(false);
    count(0);
    setBoard();
  }

  return (
    <div className={`popup ${showPopup ? 'show' : ''}`}>
        <img src={image} alt=''/>
        <big>CONGRATS!!</big>
        <p>You solved the game with {flipCount} flips</p>
        <button onClick={startGame}>Play Again</button>
    </div>
  )
}