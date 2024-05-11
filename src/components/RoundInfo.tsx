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

    return goalParts.map((goal, index) => {
      const [count, setOrRun, _, size] = goal.split(" ");
      const isRun = setOrRun.toLowerCase() === "run";
      const cardCount = parseInt(size);

      const cards = Array.from({ length: cardCount }, (_, i) => (
        <div key={i} className="goal-card">
          {isRun ? (
            <>
              {faceCards[i]}
              <span className="heart-symbol">♥</span>
            </>
          ) : (
            1
          )}
        </div>
      ));

      return (
        <div key={index} className="goal-group">
          <span className="goal-count p-2 me-4">{count} x</span>
          {cards}
        </div>
      );
    });
  };

  const renderDealtCards = () => {
    const firstRowCards = Array.from({ length: 5 }, (_, i) => (
      <div key={i} className="dealt-card">
        <span className="diamond-symbol">♦</span>
      </div>
    ));

    const secondRowCards = Array.from({ length: cardsDealt - 5 }, (_, i) => (
      <div key={i} className="dealt-card">
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
      <div className="container d-flex justify-content-between">
        <div>
          <b className="rounded-pill bg-warning p-2">This Round's Goal</b>
          <div className="goal-container mt-3">{renderGoalCards()}</div>
        </div>
        <div>
          <OverlayTrigger placement="bottom" overlay={renderTooltip}>
            <div>
              <b className="text-info bg-dark p-2 rounded-pill">
                Cards dealt this round
              </b>
              <div className="dealt-cards-container mt-3">
                {renderDealtCards()}
              </div>
            </div>
          </OverlayTrigger>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary m-2"
          onClick={onPrevRound}
          disabled={roundNumber === 1}
        >
          Previous Round
        </button>
        <button className="btn btn-primary m-2" onClick={onNextRound}>
          Next Round
        </button>
      </div>
    </div>
  );
};

export default RoundInfo;
