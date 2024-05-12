import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

interface RoundInfoProps {
  roundNumber: number;
  roundGoal: string;
  cardsDealt: number;
  onNextRound: () => void;
  onPrevRound: () => void;
}

const RoundInfo: React.FC<RoundInfoProps> = ({
  roundNumber,
  roundGoal,
  cardsDealt,
  onNextRound,
  onPrevRound,
}) => {
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
    <div className="d-flex flex-column align-items-center mb-4">
      <h2 className="text-warning">Round {roundNumber}</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex flex-column">
              <b className="rounded-2 bg-warning p-2">This Round's Goal</b>
              <div className="goal-container mt-3">{renderGoalCards()}</div>
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

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary m-2"
          onClick={onPrevRound}
          disabled={roundNumber === 1}
        >
          Previous Round
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={onNextRound}
          disabled={roundNumber === 12}
        >
          {roundNumber === 12 ? "Game Over" : "Next Round"}
        </button>
      </div>
    </div>
  );
};

export default RoundInfo;
