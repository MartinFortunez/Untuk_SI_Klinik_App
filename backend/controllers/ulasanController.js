// controllers/UlasanController.js

const Ulasan = require("../models/Ulasan");

exports.getAllUlasan = (req, res) => {
  Ulasan.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results);
  });
};

exports.getUlasanById = (req, res) => {
  const { id } = req.params;
  Ulasan.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (!result) {
      res.status(404).json({ error: "Review not found" });
      return;
    }
    res.status(200).json(result);
  });
};

exports.addUlasan = (req, res) => {
  const { nik, nama_pasien, penilaian, rating } = req.body;
  const newUlasan = { nik, nama_pasien, penilaian, rating, status: "off" };

  Ulasan.create(newUlasan, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add review' });
      return;
    }
    res.status(201).json({ message: 'Review added successfully' });
  });
};

exports.editUlasan = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Pastikan status tidak kosong
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  const updatedUlasan = { status };

  Ulasan.update(id, updatedUlasan, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update review' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  });
};


exports.deleteUlasan = (req, res) => {
  const { id } = req.params;
  Ulasan.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete review' });
      return;
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  });
};
