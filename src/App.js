import { useEffect, useState } from 'react';
import './App.css';
import { Popup } from './Popup.js';

const cardsArray = ["😍","😍","🫠","🫠","😁","😁","🥰","🥰","😚","😚","😮","😮","🤐","🤐","😴","😴"]

function Card({text, isActive, setIsActive, flipCount, setFlipCount, index}){
  let changeState = ()=>{
    setFlipCount(flipCount + 1);
    let newStates = [...isActive];
    newStates[index] = !newStates[index];
    setIsActive(newStates);
  }

  return (
    <div className={`card ${isActive[index] ? 'active' : ''}`} onClick={changeState}>{text}</div>
  )
}

function App() {
  let startState = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  let [isActive, setIsActive] = useState(startState);
  let [cardsVal, setCardsVal] = useState(cardsArray);
  let [flipCount, setFlipCount] = useState(0);
  let [showPopup, setShowPopup] = useState(false);

  useEffect(()=>{
    let response = []
    for (let i=0; i<isActive.length; i++){
      if (isActive[i] === true)
        response.push(i);
    }

    if (response.length === 2){
      let first = response.splice(0, 1);
      let second = response.splice(0, 1);
      let newStates = [...isActive]

      if (cardsVal[first] === cardsVal[second]){
        newStates[first] = "Complete";
        newStates[second] = "Complete";
        setIsActive(newStates);
      }
      else{
        setTimeout(()=>{
          newStates[first] = false;
          newStates[second] = false;
          setIsActive(newStates);
        }, 500);
      }
    }
    else if (response.length === 0){
      for (let i=0; i<isActive.length; i++){
        if (isActive[i] === "Complete")
          response.push(i);
      }

      if (response.length === 16)
        setShowPopup(true);
    }
  }, [isActive, cardsVal])

  let setBoard = ()=>{
    setIsActive(startState);
    let indices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    let currCards = [];
    for (let i=0; i<cardsArray.length; i++){
      let index = Math.floor(Math.random()*indices.length);
      currCards.push(indices[index]);
      indices.splice(index, 1);
    }
    let values = currCards.map((val)=>{
      return cardsArray[val];
    })
    setCardsVal(values);
  }

  useEffect(()=>{
    setBoard();
  }, []);

  return (
    <div>
      <Popup flipCount={flipCount} setBoard={setBoard} showPopup={showPopup} setShowPopup={setShowPopup} count={setFlipCount}/>
      <div className='game-board'>
        {cardsVal.map((val, i)=>{
          return <Card text={val} isActive={isActive} setIsActive={setIsActive} flipCount={flipCount} setFlipCount={setFlipCount} index={i}/>
        })}
      </div>
      <button onClick={setBoard}>Restart Game</button>
    </div>
  );
}

export default App;