import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Reject from "../../admin/incomingConsultation/Reject";
import Accept from "../../admin/incomingConsultation/Accept";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const CardIncomingConsultation = ({ data }) => {
  const {
    nik,
    nama_pasien,
    alamat,
    gol_darah,
    tgl_lahir,
    no_wa,
    nama_dokter,
    spesialis,
    sesi,
    jenis_kelamin,
    tgl_konsul,
    konsul_id,
    tgl_tenggat,
  } = data;
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const handleRejectClose = () => setShowRejectModal(false);
  const handleRejectShow = () => setShowRejectModal(true);

  const handleAcceptClose = () => setShowAcceptModal(false);
  const handleAcceptShow = () => setShowAcceptModal(true);

  return (
    <Col>
      <Card>
        <Card.Body className="d-flex flex-column gap-3">
          <Row>
            <Col className="d-flex flex-column">
              <Card.Text className="fw-bold mb-0">User</Card.Text>
              <span className="custom-underline"></span>
            </Col>
            <Col className="d-flex justify-content-end">
              <span>{tgl_konsul}</span>
            </Col>
          </Row>
          <Row>
            <Card.Subtitle className="opacity-50">NIK</Card.Subtitle>
            <Card.Text>{nik}</Card.Text>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Nama</Card.Subtitle>
              <Card.Text>{nama_pasien}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Jenis Kelamin
              </Card.Subtitle>
              <Card.Text>{jenis_kelamin}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                Golongan Darah
              </Card.Subtitle>
              <Card.Text>{gol_darah}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Alamat</Card.Subtitle>
              <Card.Text>{alamat}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">
                Tanggal Lahir
              </Card.Subtitle>
              <Card.Text>{tgl_lahir}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                No. HP/WhatsApp
              </Card.Subtitle>
              <Card.Text>{no_wa}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column">
              <Card.Text className="fw-bold mb-0">Dokter</Card.Text>
              <span className="custom-underline"></span>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle className="opacity-50">Dokter</Card.Subtitle>
              <Card.Text>{nama_dokter}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Spesialis</Card.Subtitle>
              <Card.Text>{spesialis}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">Sesi</Card.Subtitle>
              <Card.Text>{sesi}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleRejectShow}>
            Tolak
          </Button>
          <Button
            variant="primary"
            onClick={handleAcceptShow}
            className="text-light"
          >
            Terima
          </Button>

          <Reject
            show={showRejectModal}
            handleClose={handleRejectClose}
            data={konsul_id}
          />

          <Accept
            show={showAcceptModal}
            handleClose={handleAcceptClose}
            data={konsul_id}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardIncomingConsultation;
