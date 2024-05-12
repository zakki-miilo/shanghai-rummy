// SideNavbar.tsx
import React from "react";
import { Nav } from "react-bootstrap";
import { FaUser, FaHome, FaGamepad } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideNavbar: React.FC = () => {
  return (
    <Nav className="flex-column side-navbar">
      <Nav.Item>
        <Nav.Link href="#account" className="nav-icon">
          <FaUser />
          <span className="nav-text">Account</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/" className="nav-icon">
          <FaHome />
          <span className="nav-text">Home</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/game-data" className="nav-link nav-icon">
          <FaGamepad />
          <span className="nav-text">Game Data</span>
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideNavbar;
