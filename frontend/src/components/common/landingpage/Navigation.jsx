import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./Login";
import "../../../sass/custom.scss";

const Navigation = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to handle showing the modal
  const handleShowModal = () => setShowModal(true);

  // Function to handle hiding the modal    icon: <HospitalFill />,
  const handleCloseModal = () => setShowModal(false);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="custom-nav sticky-top px-2 px-md-3 px-lg-5  navbar-dark"
    >
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="#deets">Beranda</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Tentang Kami
            </Nav.Link>
            <Nav.Link eventKey={3} href="#memes">
              Fasilitas
            </Nav.Link>
            <Nav.Link eventKey={4} href="#memes">
              Jadwal Dokter
            </Nav.Link>
            <Nav.Link eventKey={5} href="#memes">
              Ulasan
            </Nav.Link>
          </Nav>
          <Nav className="ms-lg-3">
            <Button
              variant="primary"
              onClick={handleShowModal}
              className="bg-light text-primary fw-semibold"
            >
              Login Admin
            </Button>
          </Nav>
          <Login show={showModal} onHide={handleCloseModal} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
