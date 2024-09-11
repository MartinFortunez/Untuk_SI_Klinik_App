const Fasilitas = require('../models/Fasilitas');

exports.getAllFasilitas = (req, res) => {
  Fasilitas.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results);
  });
};

exports.addFasilitas = (req, res) => {
  const { judul, deskripsi } = req.body;
  const foto_fasilitas = req.file ? req.file.buffer : null;
  const newFasilitas = { judul, deskripsi, foto_fasilitas };

  Fasilitas.create(newFasilitas, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add facility' });
      return;
    }
    // res.redirect("/dashboard/fasilitas");
    res.status(200).json({ message: "Facility add successfully" });
  });
};

exports.getFasilitasById = (req, res) => {
  const { id } = req.params;

  Fasilitas.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (!result) {
      res.status(404).json({ error: 'Facility not found' });
      return;
    }
    res.status(200).json(result);
  });
};

exports.editFasilitas = (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi } = req.body;
  const foto_fasilitas = req.file ? req.file.buffer : null;
  const updatedFasilitas = { judul, deskripsi, foto_fasilitas };

  Fasilitas.update(id, updatedFasilitas, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update facility' });
      return;
    }
    // res.redirect("/dashboard/fasilitas");
    res.status(200).json({ message: "facility updated successfully" });
  });
};

exports.deleteFasilitas = (req, res) => {
  const { id } = req.params;

  Fasilitas.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete facility' });
      return;
    }
    // res.redirect("/dashboard/fasilitas");
    res.status(200).json({ message: "Facility deleted successfully" });
  });
};
