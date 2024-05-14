// SideNavbar.tsx
import React, { useContext } from "react";
import { Nav, Button } from "react-bootstrap";
import { FaUser, FaHome, FaGamepad, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { PlayerContext } from "./PlayerContext";

const SideNavbar: React.FC = () => {
  const { currentRound, loggedInPlayer, setLoggedInPlayer, resetGame } =
    useContext(PlayerContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInPlayer(null);
    resetGame();
    navigate("/");
  };

  return (
    <Nav className="flex-column side-navbar">
      {loggedInPlayer ? (
        <>
          <Nav.Item>
            <Link to="/profile" className="nav-link nav-icon">
              <FaUser size={24} />
              <span className="nav-text">Profile</span>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to={`/?round=${currentRound}`} className="nav-link nav-icon">
              <FaHome size={24} />
              <span className="nav-text">Home</span>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/game-data" className="nav-link nav-icon">
              <FaGamepad size={24} />
              <span className="nav-text">Game Data</span>
            </Link>
          </Nav.Item>
          <Nav.Item className="mt-auto">
            <Button
              variant="link"
              onClick={handleLogout}
              className="nav-link nav-icon"
            >
              <FaSignOutAlt size={24} />
              <span className="nav-text">Logout</span>
            </Button>
          </Nav.Item>
        </>
      ) : (
        <Nav.Item>
          <Link to="/login" className="nav-link nav-icon">
            <FaUser size={24} />
            <span className="nav-text">Login</span>
          </Link>
        </Nav.Item>
      )}
    </Nav>
  );
};

export default SideNavbar;
