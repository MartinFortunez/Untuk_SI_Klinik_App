import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { api } from "../../../../api/api";

const Send = ({ data, show, handleClose, handleSend }) => {
  const { konsul_id } = data;

  const onSubmit = () => {
    api("get", `reminder/send-whatsapp/${konsul_id}`, "");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Kirim Reminder Pasien</Modal.Title>
      </Modal.Header>
      <Modal.Body>Apakah Anda yakin untuk mengirim reminder pasien?</Modal.Body>
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
            onClick={onSubmit}
          >
            Kirim
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Send;
