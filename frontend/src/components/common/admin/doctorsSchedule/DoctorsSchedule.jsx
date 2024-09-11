import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CardDoctorsSchedule from "../../cards/admin/CardDoctorsSchedule";
import Add from "./Add";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { formDataAddSchedule } from "../../../../utils/body";
import { handleSubmit } from "../../../../utils/handleFunction";
import useFetch from "../../../../hooks/useFetch";

const DoctorsSchedule = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useFetch(
    "jadwal-dokter-spesialis",
    "jadwalDokterData"
  );

  // Function to sort the schedule data in ascending order by jadwal_id
  const sortedSchedules = data
    ? [...data.schedules].sort((a, b) => a.dokter_id - b.dokter_id)
    : [];

  isSuccess && console.log(data);

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  const onSubmit = (values, actions) => {
    handleSubmit(
      "post",
      "jadwal-dokter-spesialis/add",
      formDataAddSchedule(values),
      actions,
      handleAddClose,
      queryClient,
      "jadwalDokterData"
    );
  };

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Jadwal Dokter</h2>
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
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        {sortedSchedules.length > 0 ? (
          sortedSchedules.map((item) => (
            <CardDoctorsSchedule
              key={item.jadwal_id}
              data={item}
              dataDoctor={data.doctors}
            />
          ))
        ) : (
          <p>loading bolo</p>
        )}
      </Row>
    </Container>
  );
};

export default DoctorsSchedule;
