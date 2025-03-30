import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PlayerCard from "./components/PlayerCard";
import RoundInfo from "./components/RoundInfo";
import { Button } from "react-bootstrap";
import { roundsData } from "./roundsData";
import SideNavbar from "./components/SideNavbar";
import GameData from "./components/GameData";
import AddPlayerModal from "./components/AddPlayerModal";
import { FaUserPlus } from "react-icons/fa";
import { PlayerContext } from "./components/PlayerContext";
import ProfilePage from "./components/ProfilePage";
import LoginPage from "./components/LoginPage";
import ConfirmationModal from "./components/ConfirmationModal";

const AppContent: React.FC = () => {
  const location = useLocation();

  const {
    players,
    addPlayer,
    rounds,
    setRounds,
    currentRound,
    setCurrentRound,
    loggedInPlayer,
    resetGame,
  } = useContext(PlayerContext);

  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const roundFromURL = searchParams.get("round");
    if (roundFromURL !== null) {
      setCurrentRound(parseInt(roundFromURL, 10));
    }
  }, [location, setCurrentRound]);

  const calculateTotalPoints = (playerIndex: number) => {
    return rounds.reduce(
      (total, round) => total + (round.points[playerIndex] || 0),
      0
    );
  };

  useEffect(() => {
    // Check if there is a logged-in player and if they are not already in the players array
    if (
      loggedInPlayer &&
      !players.some((p) => p.name === loggedInPlayer.name)
    ) {
      // Automatically add the logged-in player as the first player
      addPlayer(loggedInPlayer);
    }
  }, [loggedInPlayer, players, addPlayer]);

  const handleAddPoint = (playerIndex: number, points: number) => {
    setRounds((prevRounds) => {
      const updatedRounds = [...prevRounds];
      const currentRoundPoints = updatedRounds[currentRound].points;
      currentRoundPoints[playerIndex] =
        (currentRoundPoints[playerIndex] || 0) + points;
      return updatedRounds;
    });

    setRounds((prevRounds) => {
      const currentRoundPoints = prevRounds[currentRound].points;
      if (
        currentRound === 11 &&
        currentRoundPoints.every((point) => point !== undefined && point !== 0)
      ) {
        const winnerIndex = currentRoundPoints.indexOf(
          Math.min(...currentRoundPoints)
        );
        setWinnerIndex(winnerIndex);
      }
      return prevRounds;
    });
  };

  const handleAddBuy = (playerIndex: number) => {
    setRounds((prevRounds) => {
      return prevRounds.map((round, index) => {
        if (index === currentRound) {
          const newBuys = [...round.buys];
          if (newBuys[playerIndex] < roundsData[currentRound].buys) {
            newBuys[playerIndex] += 1;
            return { ...round, buys: newBuys };
          }
        }
        return round;
      });
    });
  };

  const handleUndoBuy = (playerIndex: number) => {
    setRounds((prevRounds) => {
      return prevRounds.map((round, index) => {
        if (index === currentRound) {
          const newBuys = [...round.buys];
          if (newBuys[playerIndex] > 0) {
            newBuys[playerIndex] -= 1;
            return { ...round, buys: newBuys };
          }
        }
        return round;
      });
    });
  };

  const handleResetGame = () => {
    setShowResetConfirmation(true);
  };

  const handleConfirmReset = () => {
    resetGame(); // Use the resetGame function from context instead of manual reset
    setShowResetConfirmation(false);
  };

  const handleShowAddPlayerModal = () => setShowAddPlayerModal(true);
  const handleHideAddPlayerModal = () => setShowAddPlayerModal(false);

  const handleAddPlayer = (name: string, imageUrl: string) => {
    addPlayer({ name, imageUrl });
  };

  const lowestPoints = Math.min(
    ...players.map((_, index) => calculateTotalPoints(index))
  );

  return (
    <div className="container">
      <SideNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="d-flex justify-content-between align-items-center w-100w mt-4">
                <h1>Shanghai Rummy</h1>
                <Button
                  variant="danger"
                  onClick={handleResetGame}
                  className="rounded-pill"
                >
                  Reset Game
                </Button>
              </div>

              <RoundInfo
                roundGoal={rounds[currentRound].goal}
                cardsDealt={rounds[currentRound].cards}
              />
              <hr />
              <div className="d-flex justify-content-between align-items-center mt-4">
                {players.length > 0 && (
                  <Button
                    variant="primary"
                    onClick={handleShowAddPlayerModal}
                    className="mb-3"
                  >
                    <FaUserPlus className="me-2" />
                    Add Player
                  </Button>
                )}
              </div>
              {players.length === 0 ? (
                <div className="text-center mt-4">
                  <h2 className="mb-4">Welcome to Shanghai Rummy!</h2>
                  <p className="mb-4">Currently, there are no players.</p>
                  <Button variant="primary" onClick={handleShowAddPlayerModal}>
                    Add Players
                  </Button>
                </div>
              ) : (
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
                      <div
                        key={index}
                        className={`${
                          players.length <= 5
                            ? players.length === 5
                              ? "col-md-custom-5"
                              : players.length === 4
                              ? "col-md-3"
                              : players.length === 3
                              ? "col-md-4"
                              : players.length === 2
                              ? "col-md-6"
                              : "col-md-8 mx-auto"
                            : "col-md-custom-5 col-lg-custom-5" // For 6+ players, maintain 5 per row
                        } mb-4`}
                      >
                        <PlayerCard
                          name={player.name}
                          points={rounds[currentRound].points[index] || 0}
                          buys={rounds[currentRound].buys[index] || 0}
                          imageUrl={player.imageUrl}
                          onAddPoint={(points) => handleAddPoint(index, points)}
                          onAddBuy={() => handleAddBuy(index)}
                          onUndoBuy={() => handleUndoBuy(index)}
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
              )}
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/game-data"
          element={<GameData rounds={rounds} currentRound={currentRound} />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <AddPlayerModal
        show={showAddPlayerModal}
        onHide={handleHideAddPlayerModal}
        onAddPlayer={handleAddPlayer}
      />
      <ConfirmationModal
        show={showResetConfirmation}
        onHide={() => setShowResetConfirmation(false)}
        onConfirm={handleConfirmReset}
        title="Reset Game"
        message="Are you sure you want to reset the game? This action cannot be undone."
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
export default App;
