const Admin = require('../models/Admin');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.getAllAdmins = (req, res) => {
  Admin.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.status(200).json(results);
  });
};

exports.addAdmin = (req, res) => {
  const { username, password } = req.body;
  const foto_admin = req.file ? req.file.buffer : null;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).json({ error: 'Failed to hash password' });
      return;
    }

    const newAdmin = { username, password: hash, foto_admin };

    Admin.create(newAdmin, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to add admin' });
        return;
      }
      res.status(201).json({ message: 'Admin added successfully' });
    });
  });
};

exports.getAdminById = (req, res) => {
  const { id } = req.params;

  Admin.getById(id, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (!user) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }
    res.status(200).json(user);
  });
};

exports.editAdmin = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const foto_admin = req.file ? req.file.buffer : null;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).json({ error: 'Failed to hash password' });
      return;
    }

    const updatedAdmin = { username, password: hash, foto_admin };

    Admin.update(id, updatedAdmin, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to update admin' });
        return;
      }
      res.status(200).json({ message: 'Admin updated successfully' });
    });
  });
};

exports.deleteAdmin = (req, res) => {
  const { id } = req.params;

  Admin.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete admin' });
      return;
    }
    res.status(200).json({ message: 'Admin deleted successfully' });
  });
};
