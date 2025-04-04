import React, { useContext } from "react";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { PlayerContext } from "./PlayerContext";
import "../styles/RoundInfo.css";

interface RoundInfoProps {
  roundGoal: string;
  cardsDealt: number;
}

const RoundInfo: React.FC<RoundInfoProps> = ({ roundGoal, cardsDealt }) => {
  const { currentRound, setCurrentRound } = useContext(PlayerContext);

  const handleNextRound = () => {
    setCurrentRound((prevRound) => prevRound + 1);
  };

  const handlePrevRound = () => {
    setCurrentRound((prevRound) => prevRound - 1);
  };

  const renderGoalCards = (roundGoal: string) => {
    const goalParts = roundGoal.split(", ");
    const faceCards = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    const suits = ["♣", "♠", "♦", "♥"];

    return goalParts.map((goal, index) => {
      const [count, setOrRun, _, size] = goal.split(" ");
      const isRun = setOrRun.toLowerCase() === "run";
      const cardCount = parseInt(size);

      const cards = Array.from({ length: cardCount }, (_, i) => {
        const suit = isRun ? "♥" : suits[i % 4];
        const isRed = suit === "♦" || suit === "♥";
        return (
          <div key={i} className="goal-card">
            {isRun ? (
              <>
                <span className="card-number">{faceCards[i]}</span>
                <span
                  className={`heart-symbol ${isRed ? "red" : ""} suit-large`}
                >
                  {suit}
                </span>
              </>
            ) : (
              <>
                <span className="card-number">1</span>
                <span
                  className={`suit-symbol ${isRed ? "red" : ""} suit-large`}
                >
                  {suit}
                </span>
              </>
            )}
          </div>
        );
      });

      return (
        <div key={index} className="goal-group mb-2">
          <span className="goal-count p-2 me-2 fs-2 text-primary fw-bold">
            {count} x
          </span>
          <div className="d-flex flex-wrap fs-4">{cards}</div>
          <span className={`badge ${isRun ? "bg-warning" : "bg-info"} ms-2`}>
            {isRun ? "Run" : "Set"}
          </span>
        </div>
      );
    });
  };

  const renderDeck = () => {
    return (
      <div className="d-flex align-items-center">
        {/* Card deck image */}
        <div className="me-3">
          <img
            src="deck.png"
            alt="Card Deck"
            style={{ width: "100px", height: "auto" }}
            className="img-fluid"
          />
        </div>

        {/* Number of cards */}
        <div className="d-flex align-items-center">
          <span className="fs-1 fw-bold text-primary">{cardsDealt}</span>
          <span className="ms-2 text-muted">cards</span>
        </div>
      </div>
    );
  };

  const renderTooltip = (props: any) => (
    <Tooltip
      id="cards-dealt-tooltip"
      {...props}
      className="custom-tooltip"
      data-bs-placement="bottom"
    >
      {cardsDealt} cards dealt this round
    </Tooltip>
  );

  const renderScorePoints = () => {
    const scorePoints = [
      { name: "2-9", points: 5 },
      { name: "10-K", points: 10 },
      { name: "A", points: 15 },
      { name: "Joker", points: 20 },
    ];

    const scorePointCards = scorePoints.map(({ name, points }) => (
      <div key={name} className="card score-card mb-2">
        <div className="card-body position-relative">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">{name}</h5>
            <div className="text-right">
              <span className="diamond-symbol">♦</span>
              <span className="ml-1">Points: {points}</span>
            </div>
          </div>
        </div>
      </div>
    ));

    return <div className="score-points-container">{scorePointCards}</div>;
  };

  return (
    <div className="d-flex flex-column align-items-center mb-4 mt-2">
      <div className="d-flex align-items-center mb-3 rounded-pill bg-dark p-3">
        <Button
          variant="secondary"
          onClick={handlePrevRound}
          disabled={currentRound === 0}
          className="me-4 rounded-4"
        >
          Prev
        </Button>
        <h2 className="text-warning mb-0">Round {currentRound + 1}</h2>
        <Button
          variant="primary"
          onClick={handleNextRound}
          disabled={currentRound === 11}
          className="ms-4 rounded-4"
        >
          {currentRound === 11 ? "Game Over" : "Next"}
        </Button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <div className="d-flex flex-column">
              <b className="rounded-2 bg-warning p-2">This Round's Goal</b>
              <div className="goal-container mt-3 mb-4">
                <div className="d-flex flex-column">
                  {renderGoalCards(roundGoal)}
                </div>
              </div>
            </div>
          </div>

          {/* Cards Dealt this turn */}
          <div className="col-md-2">
            <div className="d-flex flex-column">
              <b className="text-info bg-dark p-2 rounded-2">
                Cards dealt this round
              </b>
              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                <div className="mt-3">{renderDeck()}</div>
              </OverlayTrigger>
            </div>
          </div>
          <div className="col-md-3">
            <div className="score-board-container">
              <b className="score-board-title">Score Points</b>
              {renderScorePoints()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundInfo;
