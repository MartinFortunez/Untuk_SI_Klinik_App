import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import * as yup from "yup";

const FILE_SIZE = 100 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = yup.object().shape({
  imageFile: yup
    .mixed()
    .required()
    .test(
      "fileSize",
      "Ukuran file terlalu besar",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Format file tidak didukung",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  title: yup.string().required("judul wajib diisi"),
  description: yup.string().required("deskripsi wajib diisi"),
});

const Add = ({ show, handleClose, handleAdd }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tambah Fasilitas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleAdd}
          initialValues={{
            imageFile: null,
            title: "",
            description: "",
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            setFieldValue,
            handleReset,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {values.imageFile && (
                <div className="mb-3">
                  <Image
                    src={URL.createObjectURL(values.imageFile)}
                    thumbnail
                  />
                </div>
              )}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control
                  type="file"
                  name="imageFile"
                  onChange={(e) =>
                    setFieldValue("imageFile", e.target.files[0])
                  }
                  isInvalid={!!errors.imageFile}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imageFile}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Masukkan judul fasilitas"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationPassword" className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Masukkan deskripsi fasilitas"
                  value={values.description}
                  onChange={handleChange}
                  isInvalid={touched.description && !!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={() => {
                      handleReset();
                      handleClose();
                    }}
                  >
                    Batal
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 text-light"
                  >
                    Tambahkan
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

export default Add;
