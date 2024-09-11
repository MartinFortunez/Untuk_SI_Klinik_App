import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { api } from "../../../../api/api";

const Reject = ({ data, show, handleClose }) => {
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    api("delete", `jadwal-konsultasi/reject/${data}`, "");
    await queryClient.invalidateQueries("konsultasiMasukData");

    // Menunggu hingga refetch selesai
    await queryClient.refetchQueries("konsultasiMasukData");
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tolak Konsultasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Apakah Anda yakin untuk menolak pengajuan konsultasi secara permanen?
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
          <Button variant="danger" className="w-100" onClick={onSubmit}>
            Tolak
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export default Reject;
