import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const Cancel = ({ show, handleClose, handleCancel }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Batalkan Konsultasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk membatalkan pengajuan konsultasi secara permanen?
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
          <Button variant="danger" className="w-100" onClick={handleCancel}>
          Batalkan Konsultasi
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Cancel;
