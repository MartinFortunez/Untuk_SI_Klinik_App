import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const Accept = ({ show, handleClose, handleAccept }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tampilkan Ulasan Pasien</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk menampilkan ulasan pasien?
      </Modal.Body>
      <Modal.Footer as={Row} className="border-0">
        <Col>
          <Button
            variant="secondary"
            className="w-100 bg-transparent border-0"
            onClick={handleClose}
          >
            Batal
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            className="w-100 text-light"
            onClick={handleAccept}
          >
            Tampilkan
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Accept;
