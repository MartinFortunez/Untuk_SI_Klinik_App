const Dokter = require("../models/Dokter");

exports.getAllDokter = (req, res) => {
  Dokter.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json(results);
  });
};

exports.getDokterById = (req, res) => {
  const { id } = req.params;
  Dokter.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (!result) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    res.status(200).json(result);
  });
};

exports.addDokter = (req, res) => {
  const { sip, nama_dokter, spesialis } = req.body;
  const foto_dokter = req.file ? req.file.buffer : null;
  const newDokter = { sip, nama_dokter, spesialis, foto_dokter };

  Dokter.create(newDokter, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to add doctor" });
      return;
    }
    // res.redirect("/dashboard/dokter-klinik");
    res.status(200).json({ message: "Doctor add successfully" });
  });
};

exports.editDokter = (req, res) => {
  const { id } = req.params;
  const { sip, nama_dokter, spesialis } = req.body;
  const foto_dokter = req.file ? req.file.buffer : null;
  const updatedDokter = { sip, nama_dokter, spesialis, foto_dokter };

  Dokter.update(id, updatedDokter, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to update doctor" });
      return;
    }
    // res.redirect("/dashboard/dokter-klinik");
    res.status(200).json({ message: "Doctor updated successfully" });
  });
};

exports.deleteDokter = (req, res) => {
  const { id } = req.params;
  Dokter.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete doctor" });
      return;
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
    // res.redirect("/dashboard/dokter-klinik");
  });
};
