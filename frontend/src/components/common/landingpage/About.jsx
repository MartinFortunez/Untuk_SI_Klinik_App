import React from "react";
import imgAbout from "../../../assets/img-about.png";
import { Container, Row, Col, Image } from "react-bootstrap";

const About = () => {
  return (
    <Container fluid className="py-2 bg-secondary pb-5">
      <Row className="g-5 gx-0 m-0 justify-content-center align-items-lg-center">
        <Col md={5} className="d-none d-lg-block">
          <Image src={imgAbout} fluid />
        </Col>
        <Col xs={12} md={11} lg={5} className="gy-3">
          <Row>
            <h1>Tentang Kami</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
          </Row>
          <Row>
            <h1>Lokasi</h1>
            <p>
              Jl. Ambulu No.48, Krajan Kulon, Tj. Rejo, Kec. Wuluhan, Kabupaten
              Jember, Jawa Timur 68162
            </p>
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31580.96659085482!2d113.5221763743164!3d-8.340420099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd684ba6553d04f%3A0x2b551aebb536af00!2sKlinik%20Madinah!5e0!3m2!1sid!2sid!4v1717057667315!5m2!1sid!2sid"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
