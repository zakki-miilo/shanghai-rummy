import React, { useState } from "react";
import { Button, Modal, Form, ButtonGroup, Badge } from "react-bootstrap";

const customButtonStyles = {
  purple: {
    backgroundColor: "#8B5CF6",
    borderColor: "#7C3AED",
    color: "white",
    "&:hover": {
      backgroundColor: "#7C3AED",
    },
  },
  pink: {
    backgroundColor: "#EC4899",
    borderColor: "#DB2777",
    color: "white",
    "&:hover": {
      backgroundColor: "#DB2777",
    },
  },
};

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
  currentRound: number;
  isWinner: boolean;
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
  currentRound,
  isWinner,
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
    <div
      className={`card h-100 position-relative ${
        isWinner ? "border border-4 border-warning" : ""
      }`}
    >
      {isWinner && (
        <img
          src="crown.png"
          alt="Winner"
          className="position-absolute"
          style={{
            top: "-32px",
            left: "-31%",
            transform: "translateX(50%) rotate(-30deg)",
            width: "85px",
          }}
        />
      )}

      {isWinning && currentRound !== 0 && (
        <Badge
          bg={isTie ? "warning" : "dark"}
          className="position-absolute rounded-pill border border-3 border-warning"
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
            <div className="d-flex align-items-center border border-2 border-warning w-100 p-2 rounded-3">
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
                <Badge className="ml-2">Max</Badge>
              )}
            </div>
          )}
        </div>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleShowModal}>
            Add Point
          </button>
          <button
            className="btn btn-outline-success"
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
          <Form.Group controlId="pointsInput" className="mb-3">
            <Form.Label>Enter Points:</Form.Label>
            <Form.Control
              type="number"
              value={inputPoints}
              onChange={handleInputChange}
              className="w-100"
            />
          </Form.Group>
          <ButtonGroup className="mt-3 d-flex flex-wrap gap-2">
            {[
              { value: 150, variant: "danger" },
              { value: 125, variant: "danger" },
              { value: 100, variant: "warning" },
              { value: 75, variant: "warning" },
              { value: 50, variant: "info" },
              { value: 30, variant: "info" },
              { value: 25, variant: "success" },
              { value: 20, variant: "success" },
              { value: 15, style: customButtonStyles.purple },
              { value: 10, style: customButtonStyles.purple },
              { value: 5, style: customButtonStyles.pink },
            ].map((button) => (
              <Button
                key={button.value}
                variant={button.variant}
                style={button.style}
                onClick={() => handleQuickAddPoint(button.value)}
                className="flex-grow-1 rounded-pill"
              >
                {button.value}
              </Button>
            ))}
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
