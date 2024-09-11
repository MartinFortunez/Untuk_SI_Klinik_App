import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Delete from "../../admin/doctorsSchedule/Delete";
import Edit from "../../admin/doctorsSchedule/Edit";
import axios from "axios";

import { useQueryClient } from "react-query";
import { handleDelete } from "../../../../utils/handleFunction";

const CardDoctorsSchedule = ({ data, dataDoctor }) => {
  const { dokter_id, jadwal_id, sesi, nama_dokter, spesialis } = data;
  const queryClient = useQueryClient();
  console.log(jadwal_id);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  const onDelete = () => {
    handleDelete(
      "delete",
      `jadwal-dokter-spesialis/delete/${jadwal_id}`,
      queryClient,
      "jadwalDokterData"
    );
  };

  return (
    <Col>
      <Card>
        <Card.Body className="d-flex flex-column gap-3">
          <Row>
            <Col className="d-flex flex-column">
              <Card.Subtitle className="opacity-50">Id Dokter</Card.Subtitle>
              <Card.Text>{dokter_id}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Nama Dokter</Card.Subtitle>
              <Card.Text>{nama_dokter}</Card.Text>
            </Col>
            <Col className="text-center">
              <Card.Subtitle className="opacity-50">Spesialisasi</Card.Subtitle>
              <Card.Text>{spesialis}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Subtitle className="opacity-50">
                Jadwal Dokter
              </Card.Subtitle>
              <Card.Text>{sesi}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
          <Button variant="outline-danger" onClick={handleDeleteShow}>
            Hapus
          </Button>
          <Button
            variant="primary"
            onClick={handleEditShow}
            className="text-light"
          >
            Edit
          </Button>
          <Delete
            show={showDeleteModal}
            handleClose={handleDeleteClose}
            handleDelete={onDelete}
            data={data}
          />

          <Edit
            show={showEditModal}
            handleClose={handleEditClose}
            data={data}
            dataDoctor={dataDoctor}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardDoctorsSchedule;
