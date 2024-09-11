import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import CardHistory from "../../cards/admin/CardHistory";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../../hooks/useFetch";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const queryClient = useQueryClient();
  const { data, isSuccess } = useFetch("riwayat", "riwayatData");

  // Filter data berdasarkan kata kunci pencarian
  const filteredData = data
    ? data.schedules.filter((item) =>
        item.nik.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Container fluid className="p-5 h-100 d-flex flex-column overflow-hidden">
      <Row className="align-items-center">
        <Col>
          <h2>Riwayat</h2>
        </Col>
        <Col xs={4}>
          {/* Input field untuk pencarian */}
          <Form.Control
            type="text"
            placeholder="Masukkan NIK pasien"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>
      <Row xs={1} className="gx-3 gy-4 overflow-y-scroll m-0">
        {isSuccess ? (
          filteredData.length > 0 ? (
            filteredData.map((item) => (
              <CardHistory key={item.konsul_id} data={item} />
            ))
          ) : (
            <p>No Data</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default History;
