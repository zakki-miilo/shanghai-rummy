// ProfilePage.tsx
import React, { useContext, useEffect } from "react";
import { PlayerContext } from "./PlayerContext";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { loggedInPlayer } = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if there is no logged-in player
    if (!loggedInPlayer) {
      navigate("/login");
    }
  }, [loggedInPlayer, navigate]);

  // Placeholder data for demonstration
  const gamesPlayed = 10;
  const scoreHistory = [
    { date: "Tuesday, May 14", score: 100, position: 1, totalPlayers: 4 },
    { date: "Monday, May 13", score: 80, position: 2, totalPlayers: 3 },
    // Add more score history items as needed
  ];

  return (
    <div className="profile-page text-start">
      {loggedInPlayer && (
        <div className="profile-content">
          <div
            className="bg-dark p-4 text-white rounded-4"
            style={{ height: "100vh", width: "300px" }}
          >
            <h1>Player Profile</h1>
            <div className="text-center">
              <img
                src={loggedInPlayer.imageUrl}
                alt="Player Avatar"
                className="profile-avatar mt-5"
              />
            </div>
            <h2>{loggedInPlayer.name}</h2>
            <hr />
            <div className="stat-item">
              <h4>Games Played</h4>
              <p>{gamesPlayed}</p>
            </div>
            <hr />
            <p className="profile-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              auctor metus vel urna bibendum, vel malesuada velit malesuada.
            </p>
          </div>
          <div className="profile-stats rounded-3 text-warning container p-3">
            <h3 className="rounded-pill bg-dark ps-4 py-2">History</h3>
            <div className="score-history d-flex flex-row">
              {scoreHistory.map((score, index) => (
                <div key={index} className="card m-2 p-3">
                  <strong>{score.date}</strong> Score: {score.score}, Position:{" "}
                  {score.position}/{score.totalPlayers}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
