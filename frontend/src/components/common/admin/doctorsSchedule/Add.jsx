import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await axios.get(
    "http://localhost:3000/dashboard/dokter-klinik"
  );
  return response.data;
};

const Add = ({ show, handleClose, handleAdd }) => {
  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery("dokterData", fetchData, {
    refetchOnWindowFocus: false, // Tidak merender ulang data saat jendela browser mendapatkan fokus
    refetchOnMount: false, // Tidak merender ulang data saat komponen dipasang
    staleTime: Infinity, // Data tidak dianggap kadaluwarsa
  });
  const [selectedDokter, setSelectedDokter] = useState(null);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Tambah Jadwal Dokter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={handleAdd}
          initialValues={{
            idDokter: "",
            namaDokter: "",
            spesialis: "",
            jam: "",
            hari: "",
          }}
        >
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>Id Dokter</Form.Label>
                <Form.Control
                  name="idDokter"
                  type="text"
                  value={values.idDokter}
                  onChange={handleChange}
                  isInvalid={touched.idDokter && !!errors.idDokter}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {errors.idDokter}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>Nama Dokter</Form.Label>
                <Form.Select
                  name="namaDokter"
                  value={values.namaDokter}
                  onChange={(e) => {
                    handleChange(e);
                    const selected = data.find(
                      (dokter) => dokter.nama_dokter === e.target.value
                    );
                    if (selected) {
                      setSelectedDokter(selected);
                      handleChange({
                        target: { name: "idDokter", value: selected.dokter_id },
                      });
                      handleChange({
                        target: {
                          name: "spesialis",
                          value: selected.spesialis,
                        },
                      });
                    }
                    console.log(selected);
                  }}
                  isInvalid={touched.namaDokter && !!errors.namaDokter}
                >
                  {" "}
                  <option value="">Pilih Dokter</option>
                  {isSuccess &&
                    data &&
                    data.map((item) => (
                      <option key={item.dokter_id} value={item.nama_dokter}>
                        {item.nama_dokter}
                      </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.namaDokter}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationUsername" className="mb-3">
                <Form.Label>Spesialis</Form.Label>
                <Form.Control
                  name="spesialis"
                  type="text"
                  value={values.spesialis}
                  onChange={handleChange}
                  isInvalid={touched.spesialis && !!errors.spesialis}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {errors.spesialis}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="hari" className="mb-3">
                <Form.Label>Hari</Form.Label>
                <Form.Control
                  as="select"
                  name="hari"
                  value={values.hari}
                  onChange={handleChange}
                >
                  <option value="">Pilih Hari</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                  <option value="Minggu">Minggu</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="jam" className="mb-3">
                <Form.Label>Jam</Form.Label>
                <Form.Select
                  name="jam"
                  value={values.jam}
                  onChange={handleChange}
                >
                  {" "}
                  <option value="">Pilih Jam</option>
                  <option value="09:00 - 10:00">09:00 - 10:00</option>
                  <option value="10:00 - 11:00">10:00 - 11:00</option>
                  <option value="11:00 - 12:00">11:00 - 12:00</option>
                </Form.Select>
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
