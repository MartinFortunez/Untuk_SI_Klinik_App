import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import Delete from "../../admin/facilities/Delete";
import Edit from "../../admin/facilities/Edit";
import { useQueryClient } from "react-query";
import { handleDelete } from "../../../../utils/handleFunction";

const CardFacilities = ({ data }) => {
  const { fasilitas_id, foto_fasilitas, judul, deskripsi } = data;
  const queryClient = useQueryClient();

  const onDelete = () => {
    handleDelete(
      "delete",
      `fasilitas/delete/${fasilitas_id}`,
      queryClient,
      "fasilitasData"
    );
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleDeleteShow = () => setShowDeleteModal(true);

  const handleEditClose = () => setShowEditModal(false);
  const handleEditShow = () => setShowEditModal(true);

  return (
    <Col>
      <Card className="border-0">
        <Card.Img
          variant="top"
          src={`data:image/jpeg;base64,${foto_fasilitas}`}
          className="custom-card-img"
        />
        <Card.Body>
          <Card.Title className="text-primary">{judul}</Card.Title>
          <Card.Text>{deskripsi}</Card.Text>
        </Card.Body>
        <Card.Footer className="bg-transparent border-0 d-flex justify-content-end gap-2">
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
          />
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardFacilities;
