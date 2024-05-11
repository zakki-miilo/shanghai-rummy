import React from "react";

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
  return (
    <div className="d-flex flex-column align-items-center mb-4">
      <h2 className="text-warning">Round {roundNumber}</h2>
      <h3>
        <b className="text-info">Goal ⇨</b>
        {roundGoal} || <b className="text-info">Cards this round ⇨ </b>{" "}
        {cardsDealt}
      </h3>

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
