import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardFacilities from "../../cards/admin/CardFacilities";
import Add from "./Add";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../../hooks/useFetch";
import { formDataFacilities } from "../../../../utils/body";
import { handleSubmit } from "../../../../utils/handleFunction";

const Facilities = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useFetch("fasilitas", "fasilitasData");

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const onSubmit = (values, actions) => {
    handleSubmit(
      "post",
      "fasilitas/add",
      formDataFacilities(values),
      actions,
      handleAddClose,
      queryClient,
      "fasilitasData"
    );
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Fasilitas Tersedia</h2>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={handleAddShow}
            className="text-light fw-semibold"
          >
            Tambah
          </Button>
          <Add
            show={showAddModal}
            handleClose={handleAddClose}
            handleAdd={onSubmit}
          />
        </Col>
      </Row>
      <Row xs={1} lg={2} className="gx-3 gy-4 overflow-y-auto m-0">
        {data ? (
          data.map((item) => (
            <CardFacilities key={item.fasilitas_id} data={item} />
          ))
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default Facilities;
