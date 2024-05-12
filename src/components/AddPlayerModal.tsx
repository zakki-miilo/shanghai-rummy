import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

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

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="playerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="playerImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              as="select"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            >
              <option value="">Select an image</option>
              <option value="pic1.png">Picture 1</option>
              <option value="pic2.png">Picture 2</option>
              <option value="pic3.png">Picture 3</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Player
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPlayerModal;
