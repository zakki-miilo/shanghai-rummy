import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayerCard from "./components/PlayerCard";
import RoundInfo from "./components/RoundInfo";
import { Button } from "react-bootstrap";
import { roundsData } from "./roundsData";
import SideNavbar from "./components/SideNavbar";
import GameData from "./components/GameData";

const App: React.FC = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [players] = useState([
    { name: "Sena", imageUrl: "Sena.jpg" },
    { name: "Sarah", imageUrl: "sarah.jpg" },
    { name: "Bing Bing", imageUrl: "ling.jpg" },
    { name: "Zack", imageUrl: "Zack.jpg" },
  ]);

  const [rounds, setRounds] = useState(
    roundsData.map((round) => ({
      ...round,
      points: Array(players.length).fill(0),
      buys: Array(players.length).fill(0),
    }))
  );

  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

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

    // Check if it's the last round and all players have added their points
    if (
      currentRound === 11 &&
      rounds[currentRound].points.every((point) => point !== 0)
    ) {
      // Determine the winner
      const winnerIndex = rounds[currentRound].points.indexOf(
        Math.min(...rounds[currentRound].points)
      );
      setWinnerIndex(winnerIndex);
    }
  };

  const handleAddBuy = (playerIndex: number) => {
    setRounds((prevRounds) => {
      return prevRounds.map((round, index) => {
        if (index === currentRound) {
          const newBuys = [...round.buys];
          if (newBuys[playerIndex] < roundsData[currentRound].buys) {
            newBuys[playerIndex] += 1;
            console.log(
              `Updated buys for player ${playerIndex} in round ${currentRound}: ${newBuys[playerIndex]}`
            );
            return { ...round, buys: newBuys };
          }
        }
        return round;
      });
    });
  };

  const handleNextRound = () => {
    setCurrentRound((prevRound) => prevRound + 1);
    setWinnerIndex(null); // Reset the winner when moving to the next round
  };

  const handlePrevRound = () => {
    setCurrentRound((prevRound) => prevRound - 1);
    setWinnerIndex(null); // Reset the winner when moving to the previous round
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
    setWinnerIndex(null); // Reset the winner when resetting the game
  };

  const lowestPoints = Math.min(
    ...players.map((_, index) => calculateTotalPoints(index))
  );

  return (
    <Router>
      <div className="container my-4">
        <SideNavbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
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
                  {players.map((player, index) => {
                    const isWinning =
                      calculateTotalPoints(index) === lowestPoints;
                    const isTie =
                      isWinning &&
                      players.filter(
                        (_, i) => calculateTotalPoints(i) === lowestPoints
                      ).length > 1;
                    const isWinner =
                      winnerIndex === index && currentRound === 11;

                    return (
                      <div key={index} className="col-md-3 mb-4">
                        <PlayerCard
                          name={player.name}
                          imageUrl={player.imageUrl}
                          buys={rounds[currentRound].buys[index]}
                          onAddPoint={(points) => handleAddPoint(index, points)}
                          onAddBuy={() => handleAddBuy(index)}
                          totalPoints={calculateTotalPoints(index)}
                          currentRoundBuys={roundsData[currentRound].buys}
                          isWinning={isWinning}
                          isTie={isTie}
                          currentRound={currentRound}
                          isWinner={isWinner}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            }
          />
          <Route
            path="/game-data"
            element={
              <GameData
                rounds={rounds}
                players={players}
                currentRound={currentRound}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
