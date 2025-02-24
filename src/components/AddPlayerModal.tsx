import React, { useState } from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";

interface AddPlayerModalProps {
  show: boolean;
  onHide: () => void;
  onAddPlayer: (name: string, imageUrl: string) => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  show,
  onHide,
  onAddPlayer,
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlayer(name, imageUrl);
    setName("");
    setImageUrl("");
    onHide();
  };

  const images = [
    "friends1.jpeg",
    "pic1.png",
    "pic2.png",
    "pic3.png",
    "cat2.jpeg",
    "monkey3.jpeg",
    "monkey2.jpeg",
    "dino1.jpeg",
    "cooldino.jpeg",
    "shiba_forest.jpeg",
    "girl1.jpeg",
    "girl2.jpeg",
    "fox1.jpeg",
    "fox2.jpeg",
    "fox3.jpeg",
    "sheep1.jpeg",
    "sheep2.jpeg",
    "sheep3.jpeg",
    "sheep4.jpeg",
    "sloth1.jpeg",
    "sloth2.jpeg",
  ];

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="playerName">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="playerImage">
            <Form.Label className="mt-3 fw-bold">Image</Form.Label>
            <div className="thumbnail-grid-wrapper">
              <div className="thumbnail-grid">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail-container ${
                      imageUrl === image ? "border border-3 border-info" : ""
                    }`}
                    onClick={() => setImageUrl(image)}
                  >
                    <Image
                      src={image}
                      alt={`Picture ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-3"
            disabled={!name || !imageUrl}
          >
            Add Player
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPlayerModal;
