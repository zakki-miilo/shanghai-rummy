import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayerCard from "./components/PlayerCard";
import RoundTable from "./components/RoundTable";
import RoundInfo from "./components/RoundInfo";
import { Button } from "react-bootstrap";
import { roundsData } from "./roundsData";

const App: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [players /*setPlayers*/] = useState([
    { name: "Sena", imageUrl: "Sena.jpg" },
    { name: "Sarah", imageUrl: "sarah.jpg" },
    { name: "Bing Bing", imageUrl: "ling.jpg" },
    { name: "Zack", imageUrl: "Zack.jpg" },
    // Add more players as needed
  ]);

  const [rounds, setRounds] = useState(
    roundsData.map((round) => ({
      ...round,
      points: Array(players.length).fill(0),
      buys: Array(players.length).fill(0),
    }))
  );
  const calculateTotalPoints = (playerIndex: number) => {
    return rounds.reduce(
      (total, round) => total + round.points[playerIndex],
      0
    );
  };

  const handleAddPoint = (playerIndex: number, points: number) => {
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      updatedRounds[currentRound].points[playerIndex] += points;
      return updatedRounds;
    });
  };

  const handleAddBuy = (playerIndex: number) => {
    setRounds((prevRounds) => {
      return prevRounds.map((round, index) => {
        if (index === currentRound) {
          // Clone the buys array for the current round to avoid direct mutation
          const newBuys = [...round.buys];
          if (newBuys[playerIndex] < 3) {
            newBuys[playerIndex] += 1; // Safely increment the buy count
            console.log(
              `Updated buys for player ${playerIndex} in round ${currentRound}: ${newBuys[playerIndex]}`
            );
          }
          // Return the updated round object with the new buys array
          return { ...round, buys: newBuys };
        }
        // For rounds that aren't the current one, return them unchanged
        return round;
      });
    });
  };

  const handleNextRound = () => {
    setCurrentRound((prevRound) => prevRound + 1);
  };

  const handlePrevRound = () => {
    setCurrentRound((prevRound) => prevRound - 1);
  };

  const handleResetGame = () => {
    setCurrentRound(0);
    setRounds(
      rounds.map((round) => ({
        ...round,
        points: Array(players.length).fill(0),
        buys: Array(players.length).fill(0),
      }))
    );
  };

  return (
    <div className="container my-4">
      <div className="position-absolute top-0 end-0 m-3">
        <Button variant="danger" onClick={handleResetGame}>
          Reset Game
        </Button>
      </div>
      <h1 className="mb-4">Shanghai Rummy</h1>
      <RoundInfo
        roundNumber={rounds[currentRound].number}
        roundGoal={rounds[currentRound].goal}
        cardsDealt={rounds[currentRound].cards}
        onNextRound={handleNextRound}
        onPrevRound={handlePrevRound}
      />
      <div className="row mb-4">
        {players.map((player, index) => (
          <div key={index} className="col-md-3 mb-4">
            <PlayerCard
              name={player.name}
              imageUrl={player.imageUrl}
              points={rounds[currentRound].points[index]}
              buys={rounds[currentRound].buys[index]}
              onAddPoint={(points) => handleAddPoint(index, points)}
              onAddBuy={() => handleAddBuy(index)}
              totalPoints={calculateTotalPoints(index)}
            />
          </div>
        ))}
      </div>
      <RoundTable
        rounds={rounds}
        players={players}
        currentRound={currentRound}
      />
    </div>
  );
};

export default App;
