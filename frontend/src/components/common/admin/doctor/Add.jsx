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
  namaDokter: yup.string().required("nama wajib diisi"),
  sip: yup.string().required("id dokter wajib diisi"),
  spesialis: yup.string().required("spesialis wajib diisi"),
});

const Add = ({ show, handleClose, handleAdd }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tambah Data Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={handleAdd}
          initialValues={{
            imageFile: null,
            namaDokter: "",
            sip: "",
            spesialis: "",
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            setFieldValue,
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

              <Form.Group controlId="validationNama" className="mb-3">
                <Form.Label>Nama Dokter</Form.Label>
                <Form.Control
                  name="namaDokter"
                  type="text"
                  placeholder="Masukkan nama dokter"
                  value={values.namaDokter}
                  onChange={handleChange}
                  isValid={touched.namaDokter && !!errors.namaDokter}
                  isInvalid={touched.namaDokter && !!errors.namaDokter}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.namaDokter}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationIddokter" className="mb-3">
                <Form.Label>Sip</Form.Label>
                <Form.Control
                  name="sip"
                  type="text"
                  placeholder="Masukkan sip dokter"
                  value={values.sip}
                  onChange={handleChange}
                  isValid={touched.sip && !!errors.sip}
                  isInvalid={touched.sip && !!errors.sip}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.sip}
                </Form.Control.Feedback>
                <Form.Group controlId="validationSpesialis" className="mb-3">
                  <Form.Label>Spesialis</Form.Label>
                  <Form.Select
                    name="spesialis"
                    value={values.spesialis}
                    aria-label="Default select example"
                    onChange={handleChange}
                    isValid={touched.spesialis && !!errors.spesialis}
                    isInvalid={touched.spesialis && !!errors.spesialis}
                  >
                    <option>Pilih Spesialis</option>
                    <option value="1">Spesialis 1</option>
                    <option value="2">Spesialis 2</option>
                    <option value="3">Spesialis 3</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.spesialis}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Group>
              <Form.Group as={Row}>
                <Col>
                  <Button
                    variant="secondary"
                    type="button"
                    className="w-100 bg-transparent border-0"
                    onClick={handleClose}
                  >
                    Batal
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 text-light"
                    // onClick={handleAdd}
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
