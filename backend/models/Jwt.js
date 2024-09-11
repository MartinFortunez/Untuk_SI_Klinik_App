const connection = require("../config/database");
const bcrypt = require("bcryptjs");

class Jwt {
  static create(admin, callback) {
    const query = "INSERT INTO admin (username, password) VALUES (?, ?)";
    bcrypt.hash(admin.password, 10, (err, hashedPassword) => {
      if (err) return callback(err);
      connection.query(query, [admin.username, hashedPassword], callback);
    });
  }

  static findByUsername(username, callback) {
    const query = "SELECT * FROM admin WHERE username = ?";
    connection.query(query, [username], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM admin WHERE admin_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}

module.exports = Jwt;
