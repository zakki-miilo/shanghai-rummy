import React, { useState } from "react";
import { Button, Modal, Form, ButtonGroup } from "react-bootstrap";

interface PlayerCardProps {
  name: string;
  points: number;
  buys: number;
  imageUrl: string;
  onAddPoint: (points: number) => void;
  onAddBuy: () => void;
  totalPoints: number;
}
const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  points,
  buys,
  imageUrl,
  onAddPoint,
  onAddBuy,
  totalPoints,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [inputPoints, setInputPoints] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPoints(parseInt(event.target.value));
  };

  const handleAddPoint = () => {
    onAddPoint(inputPoints);
    setInputPoints(0);
    handleCloseModal();
  };

  const handleQuickAddPoint = (points: number) => {
    setInputPoints((prevPoints) => prevPoints + points);
  };
  return (
    <div className="card h-100">
      <img src={imageUrl} alt={name} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Points: {points}</p>
        <p className="card-text">Buys: {buys}</p>
        <hr />
        <b className="card-text">Total Points: {totalPoints}</b>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleShowModal}>
            Add Point
          </button>
          <button className="btn btn-secondary" onClick={() => onAddBuy()}>
            Buy
          </button>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Points</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="pointsInput">
            <Form.Label>Enter Points:</Form.Label>
            <Form.Control
              type="number"
              value={inputPoints}
              onChange={handleInputChange}
            />
          </Form.Group>
          <ButtonGroup className="mt-3">
            <Button
              variant="outline-primary"
              onClick={() => handleQuickAddPoint(150)}
            >
              150
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleQuickAddPoint(100)}
            >
              100
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleQuickAddPoint(50)}
            >
              50
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleQuickAddPoint(20)}
            >
              20
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleQuickAddPoint(10)}
            >
              10
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleQuickAddPoint(5)}
            >
              5
            </Button>
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddPoint}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlayerCard;
