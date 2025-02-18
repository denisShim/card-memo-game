import { useState, useRef } from 'react';
import './shuffle.js';
import './gameBoard.css';
import shuffle from './shuffle.js';

import chase from './assets/chase_icon.png'
import everest from './assets/everest_icon.png'
import marshall from './assets/marshall_icon.png'
import rocky from './assets/rocky_icon.png'
import rubble from './assets/rubble_icon.png'
import skye from './assets/skye_icon.png'
import tracker from './assets/tracker_icon.png'
import zuma from './assets/zuma_icon.png'

const memoCards = [chase, everest, marshall, rocky, rubble, skye, tracker, zuma];

const memoCardsDouble = shuffle([...memoCards, ...memoCards]);

const defaultState = { index: null, value: null };

export default function GameBoard() {
    const [firstCard, setFirstCard] = useState(defaultState);
    const [secondCard, setSecondCard] = useState(defaultState);
    const [restOfCards, setRestOfCards] = useState(memoCards);
    const [moves, setMoves] = useState(0);
    const timer = useRef();

    const handleClick = (index, value) => {
        clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            setFirstCard(defaultState);
            setSecondCard(defaultState);
        }, 1500);

        if(firstCard.index === null || (firstCard.index !== null && secondCard.index !== null)) {
            setSecondCard(defaultState);
            setFirstCard({index, value});
            setMoves((moves) => moves + 1);
        } else if(secondCard.index === null && firstCard.index !== index){
            setSecondCard({index, value});
            setMoves((moves) => moves + 1);

            if(firstCard.value === value) {
                setRestOfCards(restOfCards.filter((card) => card !== value))
            }
        }
        console.log(secondCard.index, firstCard.index)
    };

    const handleReset = () => {
        setFirstCard(defaultState);
        setSecondCard(defaultState)
        setRestOfCards(memoCards);
        setMoves(0);
        shuffle(memoCardsDouble);
    }

    return (
        <>
        {restOfCards.length > 0 ? "Осталось карт: " : "Победа!"}
        <div className="card-remain">
        
            {restOfCards.map((card, index) => {
                return (
                    <img key={index} src={card} alt={`paw patrol ${index}`}/>
                )
            })}
        </div>
      <div className="gameBoard">
        {memoCardsDouble.map((item, index) => {
            return (
          <div key={index}
          className={`card ${
            (firstCard.index === index || secondCard.index === index || !restOfCards.includes(item)) &&
            "flipped"
            }`} onClick={() => handleClick(index, item)}>
            <div className="card-back"></div>
            <img src={item} alt="image" />
          </div>
            )
        })}
      </div>
      <p>Moves used: {moves}</p>
      <button onClick={handleReset}>Reset</button>
      </>
    )
  }