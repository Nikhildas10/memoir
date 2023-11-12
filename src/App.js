import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./Cards";
import Confetti from "react-confetti";


const cardImages = [
  { src: "/img/untitled design (6).png", matched: false },
  { src: "/img/untitled design (5).png", matched: false },
  { src: "/img/untitled design (4).png", matched: false },
  { src: "/img/untitled design (3).png", matched: false },
  { src: "/img/untitled design (2).png", matched: false },
  { src: "/img/untitled design (1).png", matched: false },
];
function App() {
  //usestates
  const [disabled, setDisable] = useState(false);
  const [finalCards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [solved, setSolved] = useState(false);

  //shuffle cards

  const shuffleCard = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    const cards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((i) => ({ ...i, id: Math.random() }));
    setCards(cards);
    setTurns(0);
    setSolved(false)
  };

  //choice handler

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    // console.log(card);
  };

  //check completed or not

  //check choice
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisable(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            }
            return card;
          });
          const matchedCardsCount = updatedCards.filter(
            (card) => card.matched
          ).length;
          setMatchedCount(matchedCardsCount);

          if (matchedCardsCount === updatedCards.length) {
            setSolved(true);
          }

          return updatedCards;
        });
        retry();
      } else {
        setTimeout(() => {
          retry();
        }, 980);
      }
    }
  }, [firstChoice, secondChoice, disabled]);
  //retry

  const retry = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisable(false);
  };
  // console.log(finalCards);
  useEffect(() => {
    shuffleCard();
  }, []);

  return (
    <div className="App">
      <h1>MEMOIR</h1>
      <h1>Test Your Memory Skills</h1>
      <div className="card-grid">
        {finalCards.map((card) => (
          <Cards
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
            flipped={
              card === firstChoice ||
              card === secondChoice ||
              card.matched === true
            }
          ></Cards>
        ))}
      </div>
      {!solved && (
        <div className="but">
          <button onClick={shuffleCard}>
            <span>New Game</span>
          </button>
        </div>
      )}

      <p className="turn">Turns:{turns}</p>

      {solved && (
        <div className="win">
          <h1>Woohoo! You Won!</h1>

<p>
              You have successfully completed the memory card game in{" "}
              <span>{turns} turns.</span>
              Well done!
            </p>
          <div className="but">
            <button onClick={shuffleCard}>
              <span>New Game</span>
            </button>
          </div>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
    </div>
  );
}

export default App;
