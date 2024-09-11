import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import "../../sass/StyledFeedBack.scss";
import { Formik } from "formik";
import "../../sass/StyledFeedBack.scss";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const FormAddFeedBack = ({ data, show, handleClose }) => {
  const [ratingPasien, setRatingPasien] = useState(0);
  const queryClient = useQueryClient();
  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    // Panggil endpoint untuk mendapatkan data jadwal konsultasi
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/dashboard/reminder"
        );
        setAppointmentData(response.data);
        console.log(appointmentData);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };

    fetchData();
  }, []);

  const handleStarClick = (selectedRating, setFieldValue) => {
    setRatingPasien(selectedRating);
    setFieldValue("rating", selectedRating);
  };

  const addFeedbackMutation = useMutation(
    (feedbackData) =>
      axios.post("http://localhost:3000/dashboard/feedback/add", feedbackData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("feedbackData");
        handleClose();
      },
    }
  );

  const checkPatientInAppointment = (NIK, namaPasien) => {
    if (!Array.isArray(appointmentData.schedules)) {
      console.error("Appointment schedules data is not an array.");
      return false;
    }

    // Mencari objek dalam appointmentData.schedules yang sesuai dengan NIK dan namaPasien
    const foundAppointment = appointmentData.schedules.find((appointment) => {
      return appointment.nik === NIK && appointment.nama_pasien === namaPasien;
    });

    // Mengembalikan true jika objek ditemukan, false jika tidak
    return !!foundAppointment;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { NIK, namaPasien, penilaian, rating } = values;
    try {
      if (!appointmentData) {
        console.error("Appointment data is not available yet.");
        return;
      }
      // console.log(appointmentData.schedules);

      const isPatientInAppointment = checkPatientInAppointment(NIK, namaPasien);
      // console.log(isPatientInAppointment, NIK, namaPasien);

      if (!isPatientInAppointment) {
        console.log(
          "Patient not found in appointment or status is not approved."
        );
        return;
      }

      const response = {
        nik: NIK,
        nama_pasien: namaPasien,
        penilaian: penilaian,
        rating: rating,
      };

      await addFeedbackMutation.mutateAsync(response);
    } catch (error) {
      console.error("Failed to add feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    console.log(ratingPasien); // Cetak nilai rating setelah perubahan
  }, [ratingPasien]); // Menjalankan efek hanya jika rating berubah

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
          Kirim Feedback
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            NIK: "",
            namaPasien: "",
            penilaian: "",
            rating: 0,
          }}
        >
          {({
            handleSubmit,
            values,
            touched,
            errors,
            handleChange,
            handleReset,
            setFieldValue,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-2"
            >
              <Form.Text>
                Masukkan data sesuai dengan data yang Anda masukkan ketika
                pendaftaran konsultasi
              </Form.Text>
              <Form.Group>
                {[1, 2, 3, 4, 5].map((index) => (
                  <BsStarFill
                    key={index}
                    className={`star ${
                      index <= ratingPasien ? "text-primary" : "text-secondary"
                    }`}
                    onClick={() => handleStarClick(index, setFieldValue)}
                  />
                ))}
              </Form.Group>
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
                    name="namaPasien"
                    type="text"
                    placeholder="Masukkan nama Anda sesuai KTP"
                    value={values.namaPasien}
                    onChange={handleChange}
                    isValid={touched.namaPasien && !errors.namaPasien}
                    isInvalid={touched.namaPasien && !!errors.namaPasien}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.namaPasien}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationNama" className="mb-3">
                  <Form.Label>Penilaian</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="penilaian"
                    type="text"
                    placeholder="Masukkan penilaian Anda"
                    value={values.penilaian}
                    onChange={handleChange}
                    isValid={touched.penilaian && !errors.penilaian}
                    isInvalid={touched.penilaian && !!errors.penilaian}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.penilaian}
                  </Form.Control.Feedback>
                </Form.Group>
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
                    Kirim Feedback
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

export default FormAddFeedBack;
