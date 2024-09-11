import React from "react";
import { Button, Col, Nav } from "react-bootstrap";
import { BoxArrowRight, ColumnsGap } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

const SideBar = ({ onLogout }) => {
  const links = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <ColumnsGap />,
    },
    {
      path: "/admin/jadwal-dokter",
      label: "Jadwal Dokter",
      icon: <ColumnsGap />,
    },
    {
      path: "/admin/konsultasi-masuk",
      label: "Konsultasi Masuk",
      icon: <ColumnsGap />,
    },
    {
      path: "/admin/reminder-pasien",
      label: "Reminder Pasien",
      icon: <ColumnsGap />,
    },
    {
      path: "/admin/riwayat",
      label: "Riwayat",
      icon: <ColumnsGap />,
    },
    {
      path: "/admin/dokter",
      label: "Dokter",
      icon: <ColumnsGap />,
    },
    {
      path: "/admin/ulasan-pasien",
      label: "Ulasan Pasien",
      icon: <ColumnsGap />,
    },
    {
      path: "/admin/fasilitas",
      label: "Fasilitas",
      icon: <ColumnsGap />,
    },
  ];
  return (
    <div className="d-flex flex-column bg-light justify-content-between px-2 px-lg-4 vh-100 pb-5">
      <Nav className="flex-column gap-2">
        <div className="logo mb-4 "></div>
        {links.map((link, index) => (
          <Nav.Item key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "d-flex align-items-center nav-link bg-primary text-light rounded fw-semibold justify-content-center justify-content-lg-start"
                  : "d-flex align-items-center nav-link rounded fw-semibold justify-content-center justify-content-lg-start"
              }
            >
              <span className="me-lg-3">{link.icon}</span>
              <span className="d-none d-lg-block">{link.label}</span>
            </NavLink>
          </Nav.Item>
        ))}
      </Nav>
      <Button
        variant=""
        className="d-flex align-items-center text-danger rounded fw-semibold"
        onClick={onLogout}
      >
        <span className="me-lg-2">
          <BoxArrowRight />
        </span>
        <span className="d-none d-lg-block">Logout</span>
      </Button>
    </div>
  );
};

export default SideBar;
