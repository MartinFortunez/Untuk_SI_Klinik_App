import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import useFetch from "../../../hooks/useFetch";

// const validationSchema = yup.object().shape({
//   NIK: yup.string().required("NIK wajib diisi"),
//   nama: yup.string().required("nama wajib diisi"),
//   alamat: yup.string().required("alamat wajib diisi"),
//   nohp: yup.number().required("no hp wajib diisi"),
//   jeniskelamin: yup.string().required("jenis kelamin wajib diisi"),
//   tanggallahir: yup.string().required("tanggal lahir wajib diisi"),
//   golongandarah: yup.string().required("golongan darah wajib diisi"),
//   spesialis: yup.string().required("spesialis wajib diisi"),
//   dokter: yup.string().required("dokter wajib diisi"),
//   sesi: yup.string().required("sesi wajib diisi"),
// });

const FormConsul = ({ dataDoctor, show, handleClose, handleAdd }) => {
  const { dokter_id, nama_dokter, spesialis } = dataDoctor;
  const [sesiData, setSesiData] = useState(null);

  const { data, isSuccess } = useFetch(
    `jadwal-dokter/${dokter_id}`,
    "konsultasiMasukData"
  );

  useEffect(() => {
    if (isSuccess && data) {
      // Memuat data sesi hanya jika data utama sudah dimuat
      setSesiData(data);
    } else {
      console.log("Failed to fetch data");
    }
  }, [isSuccess, data, dokter_id]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-0" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pengajuan Konsultasi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          // validationSchema={validationSchema}
          onSubmit={handleAdd}
          initialValues={{
            NIK: "",
            nama: "",
            alamat: "",
            nohp: "",
            jenisKelamin: "",
            tanggalLahir: "",
            golonganDarah: "",
            spesialis: spesialis,
            namaDokter: nama_dokter,
            sesi: "",
            dokterId: dokter_id,
            jadwalId: "",
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            handleReset,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-2"
            >
              <Form.Group>
                <Form.Group controlId="validationNIK" className="mb-3">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    name="NIK"
                    type="text"
                    placeholder="NIK"
                    value={values.NIK}
                    onChange={handleChange}
                    isValid={touched.NIK && !errors.NIK}
                    isInvalid={touched.NIK && !!errors.NIK}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.NIK}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationNama" className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    name="nama"
                    type="text"
                    placeholder="nama"
                    value={values.nama}
                    onChange={handleChange}
                    isValid={touched.nama && !errors.nama}
                    isInvalid={touched.nama && !!errors.nama}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nama}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationAlamat"
                    className="mb-3"
                  >
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      name="alamat"
                      type="text"
                      placeholder="masukkan alamat"
                      value={values.alamat}
                      onChange={handleChange}
                      isValid={touched.alamat && !errors.alamat}
                      isInvalid={touched.alamat && !!errors.alamat}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.alamat}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationNohp"
                    className="mb-3"
                  >
                    <Form.Label>No Hp / WhatsApp</Form.Label>
                    <Form.Control
                      name="nohp"
                      type="number"
                      placeholder="masukkan no hp"
                      value={values.nohp}
                      onChange={handleChange}
                      isValid={touched.nohp && !errors.nohp}
                      isInvalid={touched.nohp && !!errors.nohp}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nohp}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationJeniskelamin"
                    className="mb-3"
                  >
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Form.Select
                      name="jenisKelamin"
                      // value={values.jeniskelamin}
                      aria-label="Default select example"
                      onChange={handleChange}
                    >
                      <option>Pilih Jenis Kelamin</option>
                      <option value="Laki-Laki">Laki-Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.jeniskelamin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationTanggallahir"
                    className="mb-3"
                  >
                    <Form.Label>Tanggal Lahir</Form.Label>
                    <Form.Control
                      name="tanggalLahir"
                      type="date"
                      value={values.tanggalLahir}
                      onChange={handleChange}
                      // isValid={touched.tanggalLahir && !errors.tanggalLahir}
                      isInvalid={touched.tanggalLahir && !!errors.tanggalLahir}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.tanggalLahir}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationGolongandarah"
                    className="mb-3"
                  >
                    <Form.Label>Golongan Darah</Form.Label>
                    <Form.Control
                      name="golonganDarah"
                      type="text"
                      placeholder="masukkan golongan darah"
                      value={values.golonganDarah}
                      onChange={handleChange}
                      isValid={touched.golonganDarah && !errors.golonganDarah}
                      isInvalid={
                        touched.golonganDarah && !!errors.golonganDarah
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.golonganDarah}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-semibold">Dokter</Form.Label>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationSpesialis"
                    className="mb-3"
                  >
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
                  <Form.Group
                    as={Col}
                    controlId="validationDokter"
                    className="mb-3"
                  >
                    <Form.Label>Dokter</Form.Label>
                    <Form.Control
                      name="namaDokter"
                      type="text"
                      value={values.namaDokter}
                      onChange={handleChange}
                      isInvalid={touched.namaDokter && !!errors.namaDokter}
                      disabled
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.namaDokter}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="validationSesi"
                    className="mb-3"
                  >
                    <Form.Label>Sesi</Form.Label>
                    <Form.Select
                      name="jadwalId"
                      aria-label="Default select example"
                      onChange={handleChange}
                    >
                      <option>Pilih Sesi</option>
                      {sesiData &&
                        sesiData.map((item) => (
                          <option key={item.jadwal_id} value={item.jadwal_id}>
                            {item.sesi}
                          </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.sesi}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
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
                    // onClick={handleLogin}
                  >
                    Kirim Konsultasi
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

export default FormConsul;
