const JadwalDokter = require("../models/JadwalDokter");

exports.getAllJadwalDokter = (req, res) => {
  JadwalDokter.getAll((err, schedules) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    JadwalDokter.getAllDoctors((err, doctors) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json({ schedules, doctors });
    });
  });
};

exports.getJadwalDokterById = (req, res) => {
  const { id } = req.params;

  JadwalDokter.getById(id, (err, result) => {
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

exports.getJadwalDokterTableById = (req, res) => {
  const { id } = req.params;

  JadwalDokter. getByIdTableJadwal(id, (err, result) => {
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

exports.getAllJadwalDokterTable = (req, res) => {
    JadwalDokter.getAllDoctors((err, schedules) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json({ schedules});
    });
};



exports.addJadwalDokter = (req, res) => {
  const { dokter_id, sesi, status } = req.body;
  const newJadwalDokter = { dokter_id, sesi, status: "off" };

  JadwalDokter.create(newJadwalDokter, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add schedule' });
      return;
    }
    res.status(200).json({ message: 'Schedule added successfully' });
  });
};

exports.editJadwalDokter = (req, res) => {
  const { id } = req.params;
  const { dokter_id, sesi, status } = req.body;
  const updatedJadwalDokter = { dokter_id, sesi, status };

  JadwalDokter.update(id, updatedJadwalDokter, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update schedule' });
      return;
    }
    res.status(200).json({ message: 'Schedule updated successfully' });
  });
};

exports.deleteJadwalDokter = (req, res) => {
  const { id } = req.params;

  JadwalDokter.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete schedule' });
      return;
    }
    res.status(200).json({ message: 'Schedule deleted successfully' });
  });
};
