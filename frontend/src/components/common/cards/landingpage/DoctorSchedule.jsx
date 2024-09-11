import React from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchData = async (jadwalId) => {
  const response = await axios.get(
    `http://localhost:3000/dashboard/jadwal-dokter/${jadwalId}`
  );
  return response.data;
};

const DoctorSchedule = ({ id }) => {
  const { data } = useQuery(["jadwalData", id], () => fetchData(id));
  return (
    <>
      {data ? (
        data.map((item) => (
          <Card.Text key={item.jadwal_id}>{item.sesi}</Card.Text>
        ))
      ) : (
        <p>loading bolo</p>
      )}
    </>
  );
};

export default DoctorSchedule;
