import { Card, Image, Button } from "react-bootstrap";
import React, { useState } from "react";
import FormConsul from "../../landingpage/FormConsul";
import DoctorSchedule from "./DoctorSchedule";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const CardDoctor = ({ data }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { dokter_id, sip, nama_dokter, spesialis, foto_dokter } = data;
  const queryClient = useQueryClient();

  const styleUnderline = {
    position: "absolute",
    bottom: "-5px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "50%",
    borderBottom: "2px solid #58a399",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const {
      NIK,
      nama,
      alamat,
      golonganDarah,
      tanggalLahir,
      nohp,
      jadwalId,
      dokterId,
      jenisKelamin,
    } = values;
    try {
      const response = {
        nik: NIK,
        nama_pasien: nama,
        alamat: alamat,
        gol_darah: golonganDarah,
        tgl_lahir: tanggalLahir,
        no_wa: nohp,
        jadwal_id: jadwalId,
        dokter_id: dokterId,
        jenis_kelamin: jenisKelamin,
      };

      console.log(response);
      await axios.post(
        "http://localhost:3000/dashboard/jadwal-konsultasi/add",
        response
      );
      queryClient.invalidateQueries("konsultasiMasukData");
      handleAddClose();
    } catch (error) {
      console.error("Failed to add consul:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddClose = () => setShowAddModal(false);
  const handleAddShow = () => setShowAddModal(true);

  return (
    <Card className="d-flex flex-column align-items-center p-3 h-100">
      <Image
        src={`data:image/jpeg;base64,${foto_dokter}`}
        width={150}
        height={150}
        className="object-fit-cover"
        roundedCircle
      />
      <Card.Body className="text-center">
        <Card.Title className="fw-bold position-relative">
          {nama_dokter} <span style={styleUnderline}></span>
        </Card.Title>
        <Card.Text className="text-muted">{spesialis}</Card.Text>
        <DoctorSchedule id={dokter_id} />
        <Button
          className="text-light"
          variant="primary"
          onClick={handleAddShow}
        >
          Daftar Konsultasi
        </Button>

        <FormConsul
          show={showAddModal}
          handleClose={handleAddClose}
          handleAdd={handleSubmit}
          dataDoctor={data}
        />
      </Card.Body>
    </Card>
  );
};

export default CardDoctor;
