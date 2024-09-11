import React from "react";
import { Row, Col } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

const Topbar = () => {
  return (
    <Row xs={12} className="bg-light p-2 justify-content-end m-0">
      <Col className="d-flex justify-content-end align-items-center gap-3">
        <div className="d-flex flex-column align-items-end">
          <span className="fw-semibold text-primary">Nama</span>
          <span>Alamat Lengkap</span>
        </div>
        <PersonCircle size={40} />
      </Col>
    </Row>
  );
};

export default Topbar;
