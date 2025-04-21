import { useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";

type ImageListProps = {
  imageUrls: string[];
};

const ImageGallery = ({ imageUrls }: ImageListProps) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <Row xs={2} md={3} lg={4} className="g-3">
      {[...imageUrls].reverse().map((url, index) => (
        <Col key={index}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={url}
              alt={`Image ${index}`}
              style={{ height: "180px", objectFit: "cover" }}
            />
            <Card.Body className="p-2">
              <Form.Control
                value={url}
                readOnly
                className="mb-2"
                style={{ fontSize: "0.75rem" }}
              />
              <Button
                variant={copiedUrl === url ? "success" : "primary"}
                size="sm"
                onClick={() => handleCopy(url)}
              >
                {copiedUrl === url ? "✓ Copied" : "Copy URL"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ImageGallery;