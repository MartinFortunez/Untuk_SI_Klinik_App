const connection = require("../config/database");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

class Admin {
  static getAll(callback) {
    const query = "SELECT admin_id, username, password, foto_admin FROM admin";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      results.forEach(result => {
        if (result.foto_admin) {
          result.foto_admin = Buffer.from(result.foto_admin, 'binary').toString('base64');
        }
      });
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM admin WHERE admin_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      if (results.length > 0 && results[0].foto_admin) {
        results[0].foto_admin = Buffer.from(results[0].foto_admin, 'binary').toString('base64');
      }
      callback(null, results[0]);
    });
  }

  static create(data, callback) {
    bcrypt.hash(data.password, saltRounds, (err, hash) => {
      if (err) return callback(err);
      const query = "INSERT INTO admin (foto_admin, username, password) VALUES (?, ?, ?)";
      connection.query(query, [data.foto_admin, data.username, hash], callback);
    });
  }

  static update(id, data, callback) {
    if (data.password) {
      bcrypt.hash(data.password, saltRounds, (err, hash) => {
        if (err) return callback(err);
        let query = "UPDATE admin SET username = ?, password = ?, foto_admin = ? WHERE admin_id = ?";
        let queryParams = [data.username, hash, data.foto_admin, id];
        connection.query(query, queryParams, callback);
      });
    } else {
      let query = "UPDATE admin SET username = ?, foto_admin = ? WHERE admin_id = ?";
      let queryParams = [data.username, data.foto_admin, id];
      connection.query(query, queryParams, callback);
    }
  }

  static delete(id, callback) {
    const query = "DELETE FROM admin WHERE admin_id = ?";
    connection.query(query, [id], callback);
  }
}

module.exports = Admin;
