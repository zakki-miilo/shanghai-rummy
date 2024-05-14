// LoginPage.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { PlayerContext } from "./PlayerContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("zakki");
  const [password, setPassword] = useState("abc123");
  const { setLoggedInPlayer } = useContext(PlayerContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login validation and authentication here
    // For demonstration purposes, we'll assume the login is successful
    const loggedInPlayer = {
      name: username,
      imageUrl: "cat1.jpeg",
    };
    setLoggedInPlayer(loggedInPlayer);
    navigate("/profile");
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
