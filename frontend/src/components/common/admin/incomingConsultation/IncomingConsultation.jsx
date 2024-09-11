import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardIncomingConsultation from "../../cards/admin/CardIncomingConsultation";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../../hooks/useFetch";
const IncomingConsultation = () => {
  const queryClient = useQueryClient();

  const { data, isSuccess } = useFetch(
    "jadwal-konsultasi",
    "konsultasiMasukData"
  );

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Konsultasi Masuk</h2>
        </Col>
      </Row>
      <Row xs={1} lg={2} className="gx-3 gy-4 overflow-y-auto m-0">
        {data && data.schedules.length > 0 ? (
          data.schedules.map((item) => (
            <CardIncomingConsultation key={item.konsul_id} data={item} />
          ))
        ) : data && data.schedules.length === 0 ? (
          <p>No Data</p>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default IncomingConsultation;
