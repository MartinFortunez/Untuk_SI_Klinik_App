const connection = require("../config/database");

class Dokter {
  static getAll(callback) {
    const query = "SELECT dokter_id, sip, nama_dokter, spesialis, foto_dokter FROM dokter";
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      results.forEach(result => {
        if (result.foto_dokter) {
          result.foto_dokter = Buffer.from(result.foto_dokter, 'binary').toString('base64');
        }
      });
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM dokter WHERE dokter_id = ?";
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  static create(data, callback) {
    const query = "INSERT INTO dokter (foto_dokter, sip, nama_dokter, spesialis) VALUES (?, ?, ?, ?)";
    connection.query(query, [data.foto_dokter, data.sip, data.nama_dokter, data.spesialis], callback);
  }

  static update(id, data, callback) {
    let query, queryParams;
    if (data.foto_dokter) {
      query = "UPDATE dokter SET sip = ?, nama_dokter = ?, spesialis = ?, foto_dokter = ? WHERE dokter_id = ?";
      queryParams = [data.sip, data.nama_dokter, data.spesialis, data.foto_dokter, id];
    } else {
      query = "UPDATE dokter SET sip = ?, nama_dokter = ?, spesialis = ? WHERE dokter_id = ?";
      queryParams = [data.sip, data.nama_dokter, data.spesialis, id];
    }
    connection.query(query, queryParams, callback);
  }

  static delete(id, callback) {
    const query = "DELETE FROM dokter WHERE dokter_id = ?";
    connection.query(query, [id], callback);
  }
}

module.exports = Dokter;
