// models/Ulasan.js
const connection = require("../config/database");

class Ulasan {
  static getAll(callback) {
    const query = "SELECT ulasan_id, nik, nama_pasien, penilaian, tgl_ulasan, rating, status FROM ulasan";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM ulasan WHERE ulasan_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  
  static create(data, callback) {
    const query = "INSERT INTO ulasan (nik, nama_pasien, penilaian, rating, status) VALUES (?, ?, ?,?,'off')";
    connection.query(query, [data.nik, data.nama_pasien, data.penilaian, data.rating, data.status], callback);
  }

  static update(id, data, callback) {
    let query, queryParams;
      query = "UPDATE ulasan SET status = ? WHERE ulasan_id = ?";
      queryParams = [data.status, id];
      connection.query(query, queryParams, callback);
  }

  static delete(id, callback) {
    const query = "DELETE FROM ulasan WHERE ulasan_id = ?";
    connection.query(query, [id], callback);
  }
}

module.exports = Ulasan;
