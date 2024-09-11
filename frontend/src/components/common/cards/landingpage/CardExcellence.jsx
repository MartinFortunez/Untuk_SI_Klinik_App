import React from "react";
import { Card } from "react-bootstrap";

const CardExcellence = ({ title, desc, icons, className }) => {
  return (
    <Card
      className={`d-flex flex-column align-items-center border-0 rounded-0 p-4 text-center ${className}`}
    >
      {icons}
      <Card.Body>
        <Card.Title className="fw-bold mb-3">{title}</Card.Title>
        <Card.Text>{desc}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardExcellence;
