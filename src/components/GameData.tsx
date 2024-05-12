// GameData.tsx
import React from "react";
import RoundTable from "./RoundTable";

interface GameDataProps {
  rounds: {
    number: number;
    goal: string;
    points: number[];
    buys: number[];
    cards: number;
  }[];
  players: {
    name: string;
  }[];
  currentRound: number;
}

const GameData: React.FC<GameDataProps> = ({
  rounds,
  players,
  currentRound,
}) => {
  return (
    <div>
      <h2>Game Data</h2>
      <RoundTable
        rounds={rounds}
        players={players}
        currentRound={currentRound}
      />
    </div>
  );
};

export default GameData;
