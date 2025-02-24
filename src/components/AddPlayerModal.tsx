import React, { useState, useRef } from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import "../styles/AddPlayerModal.css";

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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

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

            {/* Upload button */}
            <div className="mb-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: "none" }}
              />
              <Button
                variant="outline-primary"
                onClick={() => fileInputRef.current?.click()}
                className="w-100"
              >
                <FaUpload className="me-2" />
                Upload Your Own Image
              </Button>
            </div>

            {/* Preview of uploaded image */}
            {uploadedImage && (
              <div className="mb-3">
                <p className="fw-bold">Uploaded Image:</p>
                <div
                  className={`thumbnail-container ${
                    imageUrl === uploadedImage
                      ? "border border-3 border-info"
                      : ""
                  }`}
                  onClick={() => setImageUrl(uploadedImage)}
                  style={{ maxWidth: "150px" }}
                >
                  <Image
                    src={uploadedImage}
                    alt="Uploaded"
                    className="thumbnail-image"
                  />
                </div>
              </div>
            )}

            <p className="fw-bold mb-2">Or Choose from Gallery:</p>
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
