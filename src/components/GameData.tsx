// GameData.tsx
import React, { useContext } from "react";
import RoundTable from "./RoundTable";
import { PlayerContext } from "./PlayerContext";

interface GameDataProps {
  rounds: {
    number: number;
    goal: string;
    points: number[];
    buys: number[];
    cards: number;
  }[];
  currentRound: number;
}

const GameData: React.FC<GameDataProps> = ({ rounds, currentRound }) => {
  const { players } = useContext(PlayerContext);

  return (
    <div className="mb-3">
      <h2 className="mb-4">Game Data</h2>
      <RoundTable
        rounds={rounds}
        players={players}
        currentRound={currentRound}
      />
    </div>
  );
};

export default GameData;
