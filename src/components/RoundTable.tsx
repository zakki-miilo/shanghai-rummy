import React from "react";

interface RoundTableProps {
  rounds: {
    number: number;
    goal: string;
    points: number[];
    buys: number[];
    cards: number;
  }[];
  players: { name: string }[];
  currentRound: number;
}

const RoundTable: React.FC<RoundTableProps> = ({
  rounds,
  players,
  currentRound,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark">
        <thead>
          <tr>
            <th className="header-cell">Round</th>
            <th className="header-cell">Goal</th>
            <th className="header-cell">Cards Dealt</th>
            {players.map((player, index) => (
              <th key={index} className="header-cell">
                {player.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rounds.map((round, index) => (
            <React.Fragment key={round.number}>
              <tr className={index === currentRound ? "table-warning" : ""}>
                <td>{round.number}</td>
                <td>{round.goal}</td>
                <td>{round.cards}</td>
                {round.points.slice(0, players.length).map((point, index) => (
                  <td key={index}>{point}</td>
                ))}
              </tr>
              <tr className={index === currentRound ? "table-warning" : ""}>
                <td colSpan={3}></td>
                {round.buys.slice(0, players.length).map((buy, index) => (
                  <td key={index}>{buy} buy(s)</td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoundTable;
