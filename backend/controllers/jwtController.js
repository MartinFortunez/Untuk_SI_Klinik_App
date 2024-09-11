const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Jwt = require("../models/Jwt");

exports.register = (req, res) => {
  const { username, password } = req.body;
  const newAdmin = { username, password };

  Jwt.create(newAdmin, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error creating admin", error: err });
    }
    res.status(201).json({ message: "Admin created successfully" });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  Jwt.findByUsername(username, (err, admin) => {
    if (err || !admin) {
      return res.status(401).json({ message: "Authentication failed. Admin not found." });
    }

    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: "Authentication failed. Wrong password." });
      }

      const token = jwt.sign({ admin_id: admin.admin_id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

      res.json({ message: "Authentication successful", token });
    });
  });
};

exports.getProfile = (req, res) => {
  const adminId = req.admin_id;

  Jwt.getById(adminId, (err, admin) => {
    if (err || !admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  });
};
