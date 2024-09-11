import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import '../../sass/StyledFooter.scss';

const Footer = () => {
  return (
    <footer className="StyledFooter bg-dark text-white py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex flex-column gap-3">
              <div className="bg-secondary" style={{ height: '59px', width: '215px' }}></div>
              <p className="text-wrapper">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
              <div>
                <p className="text-wrapper2">Lorem ipsum dolor sit amet</p>
                <div className="d-flex gap-2">
                  <a href="https://www.instagram.com" target="_blank" className="SocialLink bg-red">
                    <FaInstagram color="white" />
                  </a>
                  <a href="https://www.whatsapp.com" target="_blank" className="SocialLink bg-green">
                    <FaWhatsapp color="white" />
                  </a>
                  <a href="mailto:someone@example.com" target="_blank" className="SocialLink bg-blue">
                    <FaEnvelope color="white" />
                  </a>
                </div>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Row>
              <Col md={4} className="d-flex flex-column gap-2">
                <p className="text-wrapper3">Lorem ipsum</p>
                <p className="text-wrapper4">Lorem ipsum</p>
                <p className="text-wrapper4">Lorem ipsum</p>
              </Col>
              <Col md={4} className="d-flex flex-column gap-2">
                <p className="text-wrapper3">Lorem ipsum</p>
                <p className="text-wrapper4">Lorem ipsum</p>
                <p className="text-wrapper4">Lorem ipsum</p>
              </Col>
              <Col md={4} className="d-flex flex-column gap-2">
                <p className="text-wrapper3">Lorem ipsum</p>
                <p className="text-wrapper4">Lorem ipsum</p>
                <p className="text-wrapper4">Lorem ipsum</p>
              </Col>
            </Row>
            <div className="mt-4 text-right">
              <p className="text-wrapper5">Created by Klinik App | © 2024 All Rights Reserved by Law</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
