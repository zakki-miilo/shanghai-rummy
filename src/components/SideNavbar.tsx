// SideNavbar.tsx
import React, { useContext } from "react";
import { Nav } from "react-bootstrap";
import { FaUser, FaHome, FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PlayerContext } from "./PlayerContext";

const SideNavbar: React.FC = () => {
  const { currentRound } = useContext(PlayerContext);

  return (
    <Nav className="flex-column side-navbar">
      <Nav.Item>
        <Nav.Link href="#account" className="nav-icon">
          <FaUser size={24} />
          <span className="nav-text">Account</span>
        </Nav.Link>
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
    </Nav>
  );
};

export default SideNavbar;
