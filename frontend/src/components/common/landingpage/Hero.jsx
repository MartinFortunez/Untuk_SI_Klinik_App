import React from "react";
import { Button, Image, Container, Col, Row } from "react-bootstrap";
import imgHero from "../../../assets/img-hero.png";

const Hero = () => {
  return (
    <Container fluid className="pt-5 custom-bg- px-5">
      <Row className="align-items-lg-center justify-content-lg-center">
        <Col xs={12} md={10} lg={5}>
          <h1>Klinik App</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary" className="text-light">
              Konsultasi Sekarang
            </Button>
          </p>
        </Col>
        <Col md={5} className="d-none d-lg-block">
          <Image src={imgHero} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
