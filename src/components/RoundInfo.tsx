import React, { useContext } from "react";
import { Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import { PlayerContext } from "./PlayerContext";

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
  const renderGoalCards = () => {
    const goalParts = roundGoal.split(", ");
    const faceCards = [
      "A",
      "K",
      "Q",
      "J",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
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
                {faceCards[i]}
                <span className={`heart-symbol ${isRed ? "red" : ""}`}>
                  {suit}
                </span>
              </>
            ) : (
              <>
                1
                <span className={`suit-symbol ${isRed ? "red" : ""}`}>
                  {suit}
                </span>
              </>
            )}
          </div>
        );
      });

      return (
        <div key={index} className="goal-group">
          <span className="goal-count p-2 me-4">{count} x</span>
          {cards}
        </div>
      );
    });
  };

  const renderDealtCards = () => {
    const faceCards = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

    const firstRowCards = Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="dealt-card">
        <span className="card-number">{faceCards[i]}</span>
        <span className="diamond-symbol">♦</span>
      </div>
    ));

    const secondRowCards = Array.from({ length: cardsDealt - 5 }, (_, i) => (
      <div key={i} className="dealt-card">
        <span className="card-number">{faceCards[i + 5]}</span>
        <span className="diamond-symbol">♦</span>
      </div>
    ));

    return (
      <>
        <div className="dealt-card-row">{firstRowCards}</div>
        <div className="dealt-card-row">
          {secondRowCards}
          {cardsDealt === 11 && <div className="dealt-card empty-card" />}
        </div>
      </>
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

  return (
    <div className="d-flex flex-column align-items-center mb-4 mt-2">
      <div className="d-flex align-items-center mb-3">
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
          <div className="col-md-8">
            <div className="d-flex flex-column">
              <b className="rounded-2 bg-warning p-2">This Round's Goal</b>
              <div className="goal-container mt-3 mb-4">
                {renderGoalCards()}
              </div>
            </div>
          </div>

          {/*Cards Dealt this turn*/}
          <div className="col-md-4">
            <div className="d-flex flex-column">
              <b className="text-info bg-dark p-2 rounded-2">
                Cards dealt this round
              </b>
              <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                <div>
                  <div className="dealt-cards-container mt-3">
                    {renderDealtCards()}
                  </div>
                </div>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundInfo;
