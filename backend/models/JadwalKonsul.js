const connection = require("../config/database");

class JadwalKonsul {
  static getAll(callback) {
    const query = `
    SELECT * FROM jadwal_konsul JOIN dokter USING (dokter_id) JOIN jadwal_dokter USING (jadwal_id) WHERE jadwal_konsul.status = 'pending';
    `;
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static getById(id, callback) {
    const query = `
    SELECT jadwal_konsul.nik, jadwal_konsul.nama_pasien, dokter.spesialis, jadwal_konsul.alamat, jadwal_konsul.tgl_konsul, jadwal_konsul.tgl_tenggat, jadwal_konsul.no_wa, dokter.nama_dokter, jadwal_dokter.sesi, jadwal_konsul.tgl_lahir, jadwal_konsul.gol_darah, jadwal_konsul.jenis_kelamin FROM jadwal_konsul JOIN dokter USING (dokter_id) JOIN jadwal_dokter USING (jadwal_id)
    WHERE konsul_id = ?;
    `;
    connection.query(query, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }

  static getAllReminderUser(callback) {
    const query = `
    SELECT * FROM jadwal_konsul JOIN dokter USING (dokter_id) JOIN jadwal_dokter USING (jadwal_id) WHERE jadwal_konsul.status ='approve';
    `;
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static getAllRiwayat(callback) {
    const query = `
    SELECT jadwal_konsul.*, dokter.nama_dokter, dokter.spesialis, jadwal_dokter.sesi FROM jadwal_konsul JOIN dokter USING (dokter_id) JOIN jadwal_dokter USING (jadwal_id) WHERE jadwal_konsul.status ='cancel' OR jadwal_konsul.status ='complete';
    `;
    connection.query(query, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }

  static create(data, callback) {
    // Menghitung tgl_tenggat sebagai 3 hari setelah tgl_konsul
    const tglKonsul = new Date(); // Jika `tgl_konsul` diatur secara otomatis ke tanggal saat ini
    const tglTenggat = new Date(tglKonsul);
    tglTenggat.setDate(tglTenggat.getDate() + 3);

    const query = `
      INSERT INTO jadwal_konsul (nik, nama_pasien, alamat, gol_darah, tgl_lahir, no_wa, jenis_kelamin, dokter_id, jadwal_id, status, tgl_konsul, tgl_tenggat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?);
    `;
    connection.query(query, [data.nik, data.nama_pasien, data.alamat, data.gol_darah, data.tgl_lahir, data.no_wa, data.jenis_kelamin, data.dokter_id, data.jadwal_id, tglKonsul, tglTenggat], callback);
  }

  static searchByNik(nik, callback) {
    const query = `
    SELECT jadwal_konsul.*, dokter.nama_dokter, dokter.spesialis, jadwal_dokter.sesi 
    FROM jadwal_konsul
    JOIN dokter USING (dokter_id) 
    JOIN jadwal_dokter USING (jadwal_id) 
    WHERE (jadwal_konsul.status = 'cancel' OR jadwal_konsul.status = 'complete') 
    AND jadwal_konsul.nik = ?;
    `;
    connection.query(query, [nik], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}


  static setujuKonsultasiMasuk(id, callback) {
    const query = `
      UPDATE jadwal_konsul
      SET status = "approve"
      WHERE konsul_id = ?;
    `;
    connection.query(query, [id], callback);
  }

  static cancelKonsultasiMasuk(id, callback) {
    const query = `
      UPDATE jadwal_konsul
      SET status = "cancel"
      WHERE konsul_id = ?;
    `;
    connection.query(query, [id], callback);
  }

  static completeKonsultasiMasuk(id, callback) {
    const query = `
      UPDATE jadwal_konsul
      SET status = "complete"
      WHERE konsul_id = ?;
    `;
    connection.query(query, [id], callback);
  }

  static delete(id, callback) {
    const query = "DELETE FROM jadwal_konsul WHERE konsul_id = ?;";
    connection.query(query, [id], callback);
  }
}

module.exports = JadwalKonsul;
