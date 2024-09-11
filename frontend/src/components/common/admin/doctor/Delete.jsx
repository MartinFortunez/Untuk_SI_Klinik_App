import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const Delete = ({ data, show, handleClose, handleDelete }) => {
  const { nama_dokter } = data;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Hapus Data Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk menghapus data dokter <b>{nama_dokter}</b>{" "}
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
          <Button variant="danger" className="w-100" onClick={handleDelete}>
            Hapus
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};
export default Delete;
