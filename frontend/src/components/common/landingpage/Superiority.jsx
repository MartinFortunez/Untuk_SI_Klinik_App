import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardExcellence from "../cards/landingpage/CardExcellence";
import data from "../../../data/excellence";
import "../../../sass/custom.scss";

const Superiority = () => {
  return (
    <Container fluid className="position-relative p-0">
      <div className="position-absolute h-50 bg-secondary w-100 bottom-0 z-negative"></div>
      <Row className="justify-content-center align-items-center g-0">
        <Col lg={10} className="p-5">
          <Row xs={1} md={2} xl={4} className="m-0 w-100 shadow">
            {data.map((data, index) => (
              <Col key={index} className="gx-0">
                <CardExcellence
                  title={data.title}
                  desc={data.desc}
                  icons={data.icon}
                  className={
                    index % 2 === 0
                      ? "bg-primary text-light"
                      : "bg-light text-primary"
                  }
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Superiority;
