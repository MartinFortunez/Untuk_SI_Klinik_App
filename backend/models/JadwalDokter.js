const connection = require("../config/database");

class JadwalDokter {
  static getAll(callback) {
    const query = "SELECT * FROM jadwal_dokter JOIN dokter USING (dokter_id)";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM jadwal_dokter JOIN dokter USING (dokter_id) WHERE jadwal_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  static getByIdTableJadwal(id, callback) {
    const query = "SELECT * FROM jadwal_dokter WHERE dokter_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results); // Mengembalikan semua hasil, bukan hanya yang pertama
    });
  }
  


  static getAllDoctors(callback) {
    const query = "SELECT * FROM dokter";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static getAllJadwalDokter(callback) {
    const query = "SELECT * FROM jadwal_dokter";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static create(data, callback) {
    const query = "INSERT INTO jadwal_dokter (dokter_id, sesi, status) VALUES (?, ?, 'on')";
    connection.query(query, [data.dokter_id, data.sesi, data.status], callback);
  }

  static update(id, data, callback) {
    const query = "UPDATE jadwal_dokter SET dokter_id = ?, sesi = ?, status = ? WHERE jadwal_id = ?";
    connection.query(query, [data.dokter_id, data.sesi, data.status, id], callback);
  }

  static delete(id, callback) {
    const query = "DELETE FROM jadwal_dokter WHERE jadwal_id = ?";
    connection.query(query, [id], callback);
  }
}

module.exports = JadwalDokter;
