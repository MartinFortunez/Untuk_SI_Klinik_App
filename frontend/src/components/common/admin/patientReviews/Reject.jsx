import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const Reject = ({ data, show, handleClose, handleReject }) => {
  const { nama_pasien } = data;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Hapus Ulasan Pasien</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk menghapus ulasan pasien <b>{nama_pasien}</b>{" "}
        secara permanen?
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
          <Button variant="danger" className="w-100" onClick={handleReject}>
            Hapus
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Reject;
