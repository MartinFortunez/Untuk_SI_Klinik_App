import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

const Delete = ({ data, show, handleClose, handleDelete }) => {
  const { sesi, nama_dokter } = data;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Hapus Jadwal Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk menghapus jadwal dokter <b>{nama_dokter}</b>{" "}
        sesi <b>{sesi}</b> secara permanen?
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
