import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideBar from "../components/common/admin/SideBar";
import Topbar from "../components/common/admin/Topbar";


const DashboardAdmin = () => {
  const handleLogout = () => {
    // Logika logout, misalnya membersihkan token, state pengguna, dll.
    console.log("User logged out");
    // Arahkan ke halaman login atau home setelah logout
    window.location.href = "/"; // Atau gunakan history.push('/login') jika menggunakan useHistory
  };
  return (
    <>
      <Container fluid className="p-0 m-0 vh-100 g-0">
        <Row className="p-0 m-0">
          <Col xs="auto" lg={2} id="sidebar-wrapper" className="p-0 m-0">
            <SideBar onLogout={handleLogout} />
          </Col>
          <Col
            xs
            lg={10}
            id="page-content-wrapper"
            className="d-flex flex-column vh-100 p-0 m-0"
          >
            <Topbar />
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardAdmin;
