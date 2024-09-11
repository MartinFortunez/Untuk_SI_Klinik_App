const JadwalKonsul = require("../models/JadwalKonsul");

exports.getAllKonsul = (req, res) => {
  JadwalKonsul.getAll((err, schedules) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json({ schedules });
  });
};

exports.getJadwalKonsulById = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (!result) {
      res.status(404).json({ error: "Facility not found" });
      return;
    }
    res.status(200).json(result);
  });
};

exports.addJadwalKonsul = (req, res) => {
  const { nik, nama_pasien, alamat, gol_darah, tgl_lahir, no_wa, jadwal_id, jenis_kelamin, dokter_id } = req.body;
  const newJadwalKonsul = { nik, nama_pasien, alamat, gol_darah, tgl_lahir, no_wa, jadwal_id, jenis_kelamin, dokter_id, status: "pending" };

  // Logging untuk memeriksa newJadwalKonsul
  console.log("newJadwalKonsul:", newJadwalKonsul);

  JadwalKonsul.create(newJadwalKonsul, (err) => {
    if (err) {
      console.error("Error adding consultation schedule:", err);
      res.status(500).json({ error: "Failed to add consultation schedule" });
      return;
    }
    res.status(200).json({ message: "Consultation schedule added successfully" });
  });
};

exports.setujuKonsultasi = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.setujuKonsultasiMasuk(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to approve consultation" });
      return;
    }
    res.status(200).json({ message: "Consultation approved successfully" });
  });
};

exports.cancelKonsultasi = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.cancelKonsultasiMasuk(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to reject consultation" });
      return;
    }
    res.status(200).json({ message: "Consultation rejected successfully" });
  });
};


exports.completeKonsultasi = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.completeKonsultasiMasuk(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to cpmplete consultation" });
      return;
    }
    res.status(200).json({ message: "Consultation completed successfully" });
  });
};

exports.deleteJadwalKonsul = (req, res) => {
  const { id } = req.params;

  JadwalKonsul.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete consultation schedule" });
      return;
    }
    res.status(200).json({ message: "Consultation schedule deleted successfully" });
  });
};
