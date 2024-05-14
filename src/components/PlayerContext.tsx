// PlayerContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { roundsData } from "../roundsData";

interface Player {
  name: string;
  imageUrl: string;
}

interface Round {
  number: number;
  goal: string;
  cards: number;
  buys: number[];
  points: number[];
}

interface PlayerContextType {
  players: Player[];
  addPlayer: (player: Player) => void;
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  rounds: Round[];
  setRounds: React.Dispatch<React.SetStateAction<Round[]>>;
  currentRound: number;
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>;
  loggedInPlayer: Player | null;
  setLoggedInPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  resetGame: () => void;
}

export const PlayerContext = createContext<PlayerContextType>({
  players: [],
  addPlayer: () => {},
  setPlayers: () => {},
  rounds: [],
  setRounds: () => {},
  currentRound: 0,
  setCurrentRound: () => {},
  loggedInPlayer: null,
  setLoggedInPlayer: () => {},
  resetGame: () => {},
});

interface PlayerProviderProps {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });

  const [loggedInPlayer, setLoggedInPlayer] = useState<Player | null>(null);

  const [rounds, setRounds] = useState<Round[]>(() => {
    const savedRounds = localStorage.getItem("rounds");
    return savedRounds
      ? JSON.parse(savedRounds)
      : roundsData.map((round) => ({
          ...round,
          points: Array(players.length).fill(0),
          buys: Array(players.length).fill(0),
        }));
  });

  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("rounds", JSON.stringify(rounds));
  }, [players, rounds]);

  const addPlayer = (player: Player) => {
    setPlayers((prevPlayers) => {
      if (!prevPlayers.some((p) => p.name === player.name)) {
        return [...prevPlayers, player];
      }
      return prevPlayers;
    });
    setRounds((prevRounds) =>
      prevRounds.map((round) => ({
        ...round,
        points: [...round.points, 0],
        buys: [...round.buys, 0],
      }))
    );
  };

  const resetGame = () => {
    setPlayers([]);
    setRounds(
      roundsData.map((round) => ({
        ...round,
        points: [],
        buys: [],
      }))
    );
    setCurrentRound(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        players,
        addPlayer,
        setPlayers,
        rounds,
        setRounds,
        currentRound,
        setCurrentRound,
        loggedInPlayer,
        setLoggedInPlayer,
        resetGame,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
