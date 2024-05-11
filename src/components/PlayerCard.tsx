import React, { useState } from "react";
import { Button, Modal, Form, ButtonGroup, Badge } from "react-bootstrap";

interface PlayerCardProps {
  name: string;
  points: number;
  buys: number;
  imageUrl: string;
  onAddPoint: (points: number) => void;
  onAddBuy: () => void;
  totalPoints: number;
  currentRoundBuys: number;
  isWinning: boolean;
  isTie: boolean;
}
const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  buys,
  imageUrl,
  onAddPoint,
  onAddBuy,
  totalPoints,
  currentRoundBuys,
  isWinning,
  isTie,
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
    <div className="card h-100 position-relative">
      {isWinning && (
        <Badge
          variant="success"
          className="position-absolute bg-success rounded-pill"
          style={{
            top: "-10px",
            right: "10px",
            transform: "translateX(30%)",
            fontSize: "15px",
          }}
        >
          {isTie ? "Draw" : "Winning"}
        </Badge>
      )}
      <img src={imageUrl} alt={name} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{name}</h5>
          <h3 className="mb-0">{totalPoints}</h3>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span style={{ marginRight: "8px", width: "100px" }}>
            Available Buys:
          </span>
          {currentRoundBuys === 0 ? (
            <p className="text-center text-muted mb-0">No buys this round.</p>
          ) : (
            <div className="d-flex align-items-center">
              {Array.from({ length: currentRoundBuys }, (_, index) => {
                let colorClass = "";
                if (index < buys) {
                  if (currentRoundBuys === 4) {
                    if (index === 0) {
                      colorClass = "buy-card-blue";
                    } else if (index === 1) {
                      colorClass = "buy-card-green";
                    } else if (index === 2) {
                      colorClass = "buy-card-yellow";
                    } else {
                      colorClass = "buy-card-red";
                    }
                  } else {
                    if (index === 0) {
                      colorClass = "buy-card-green";
                    } else if (index === 1) {
                      colorClass = "buy-card-yellow";
                    } else {
                      colorClass = "buy-card-red";
                    }
                  }
                }
                return (
                  <div key={index} className={`buy-card ${colorClass}`}></div>
                );
              })}
              {buys === currentRoundBuys && currentRoundBuys !== 0 && (
                <Badge variant="success" className="ml-2">
                  Max
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleShowModal}>
            Add Point
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onAddBuy()}
            disabled={buys === currentRoundBuys}
          >
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
