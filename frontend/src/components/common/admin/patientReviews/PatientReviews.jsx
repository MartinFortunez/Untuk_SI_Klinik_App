import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardPatientReviews from "../../cards/admin/CardPatientReviews";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../../hooks/useFetch";

const PatientReviews = () => {
  const queryClient = useQueryClient();
  const { data, isSuccess } = useFetch("feedback", "feedbackData");

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Ulasan Pasien</h2>
        </Col>
      </Row>
      <Row xs={1} md={2} className="gx-3 gy-4 overflow-y-scroll m-0">
        {data && data.length > 0 ? (
          data.map((item) => (
            <CardPatientReviews key={item.ulasan_id} data={item} />
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

export default PatientReviews;
