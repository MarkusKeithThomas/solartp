import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import '../styles/NewsCard.css'
import { Link } from "react-router-dom";


interface NewsProps {
    id: number;
    title: string;
    image: string;
    description: string;
    slug:string;
}

export function NewsCard({ id, title, image, description,slug }: NewsProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Link to={`/bai-viet/${slug}`} className="text-decoration-none text-dark">

    
    <Card
      className={`shadow-sm h-100 d-flex mb-1 border-0 gx-1 ${isClicked ? "clicked" : ""}`}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
      onMouseLeave={() => setIsClicked(false)}
      
    >

      <Row key={id} className="d-flex align-items-center gx-0 p-1">
        {/* 🔥 Image on the left */}
        <Col xs={4} md={6} lg={4}>
          <Card.Img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100px",
              objectFit: "contain",
              borderRadius: "5px"
            }}
            loading="lazy"

          />
        </Col>

        {/* 🔥 Content on the right */}
        <Col xs={8} md={6} lg={8}>
        <Card.Body className="d-flex flex-column justify-content-center">
            {/* 🔥 Title */}
            <Card.Title className="fw-bold mb-1" style={{ fontSize: "1.1rem" }}>
              {title}
            </Card.Title>

            {/* 🔥 Description */}
            <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
              {description}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
    </Link>
  

    
  );
}