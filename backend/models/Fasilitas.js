const connection = require("../config/database");

class Fasilitas {
  static getAll(callback) {
    const query = "SELECT fasilitas_id, judul, deskripsi, foto_fasilitas FROM fasilitas";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      results.forEach((result) => {
        if (result.foto_fasilitas) {
          result.foto_fasilitas = Buffer.from(result.foto_fasilitas, "binary").toString("base64");
        }
      });
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = "SELECT fasilitas_id, judul, deskripsi, foto_fasilitas FROM fasilitas WHERE fasilitas_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      if (results.length > 0 && results[0].foto_fasilitas) {
        results[0].foto_fasilitas = Buffer.from(results[0].foto_fasilitas, "binary").toString("base64");
      }
      callback(null, results[0]);
    });
  }

  static create(data, callback) {
    const query = "INSERT INTO fasilitas (foto_fasilitas, judul, deskripsi) VALUES (?, ?, ?)";
    connection.query(query, [data.foto_fasilitas, data.judul, data.deskripsi], callback);
  }

  static update(id, data, callback) {
    let query, queryParams;
    if (data.foto_fasilitas) {
      query = "UPDATE fasilitas SET foto_fasilitas = ?, judul = ?, deskripsi = ? WHERE fasilitas_id = ?";
      queryParams = [data.foto_fasilitas, data.judul, data.deskripsi, id];
    } else {
      query = "UPDATE fasilitas SET judul = ?, deskripsi = ? WHERE fasilitas_id = ?";
      queryParams = [data.judul, data.deskripsi, id];
    }
    connection.query(query, queryParams, callback);
  }

  static delete(id, callback) {
    const query = "DELETE FROM fasilitas WHERE fasilitas_id = ?";
    connection.query(query, [id], callback);
  }
}

module.exports = Fasilitas;
