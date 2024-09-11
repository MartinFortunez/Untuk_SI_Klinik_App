import { Formik } from "formik";
import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup.string().required("username wajib diisi"),
  password: yup.string().required("password wajib diisi"),
});

const Login = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk menentukan apakah pengguna sudah login
  const navigate = useNavigate(); // Menggunakan useHistory dari React Router untuk navigasi
  console.log(isLoggedIn);

  const handleLogin = () => {
    // Logika autentikasi pengguna di sini
    setIsLoggedIn(true);
    // Setelah pengguna berhasil login, arahkan ke halaman dashboard
    navigate("/admin/dashboard");
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Fitur ini hanya untuk admin klinik</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={console.log("submit")}
          initialValues={{
            username: "",
            password: "",
          }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationPassword" className="mb-3">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Text className="text-end d-block mb-3">
                <a
                  href="/"
                  onClick={() =>
                    alert("Silakan hubungi admin untuk reset password.")
                  }
                >
                  Lupa Password?
                </a>
              </Form.Text>
              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={props.onHide}
                  >
                    Batal
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 text-light"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
