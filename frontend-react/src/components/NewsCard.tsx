import React from "react";
import { Card } from "react-bootstrap";

interface NewsProps {
    id: number;
    title: string;
    image: string;
    description: string;
    category: string;
    tags?: string
}

export function NewsCard({id,title,image,description,category,tags}: NewsProps) {
  return (
    <Card className="shadow-sm border-0 rounded-4 overflow-hidden" style={{height:'300px'}}>
      <Card.Img variant="top" src={image} className="p-2" />
      <Card.Body className="p-3">
        <Card.Title className="fs-6 fw-bold">{title}</Card.Title>
        <Card.Text className="text-muted small">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}