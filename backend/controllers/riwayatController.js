const JadwalKonsul = require("../models/JadwalKonsul");

// exports.getAllRiwayatCancel = (req, res) => {
//   JadwalKonsul.getAllRiwayat((err, schedules) => {
//     if (err) {
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     res.status(200).json({ schedules });
//   });
// };


exports.getAllRiwayatCancel = (req, res) => {
  const { nik } = req.query; // Ambil nilai 'nik' dari query parameter

  // Jika parameter 'nik' ada, gunakan searchByNik untuk pencarian
  if (nik) {
    JadwalKonsul.searchByNik(nik, (err, schedules) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json({ schedules });
    });
  } else {
    // Jika tidak ada parameter 'nik', ambil semua riwayat cancel
    JadwalKonsul.getAllRiwayat((err, schedules) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json({ schedules });
    });
  }
};

// Fungsi untuk memastikan nomor dalam format E.164
const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith('0')) {
    return '+62' + phoneNumber.slice(1);
  }
  return phoneNumber;
};

// Fungsi untuk memformat tanggal
const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};


exports.sendWhatsAppMessageRiwayat = (req, res) => {
  const { id } = req.params;
  console.log(`Fetching schedule with ID: ${id}`);

  JadwalKonsul.getById(id, (err, schedule) => {
    if (err) {
      console.error('Error retrieving schedule data:', err);
      return res.status(500).send('Error retrieving schedule data');
    }

    if (!schedule) {
      console.log('Schedule not found');
      return res.status(404).send('Schedule not found');
    }

    console.log('Schedule retrieved:', schedule);
    const formattedLahir = formatDate(new Date(schedule.tgl_lahir));
    const formattedPhoneNumber = formatPhoneNumber(schedule.no_wa);
    const message = `Halo, ini adalah Klinik Sultan Farm.\n\nKami memiliki catatan atas nama:\n\nNama: ${schedule.nama_pasien}\nNIK: ${schedule.nik}\nJenis Kelamin: ${schedule.jenis_kelamin}\nGolongan Darah: ${schedule.gol_darah}\nTanggal Lahir: ${formattedLahir}\nAlamat: ${schedule.alamat}\nNomor Kontak/WhatsApp: ${formattedPhoneNumber}\n\nMohon konfirmasikannya, apakah Anda tetap ingin konsultasi. Terima kasih.`;

    console.log('Sending message:', message);

    // Konstruksi URL WhatsApp
    const waLink = 'https://web.whatsapp.com/send';
    const phone = formattedPhoneNumber;
    const text = encodeURIComponent(message);
    const checkoutWhatsApp = `${waLink}?phone=${phone}&text=${text}`;

    // Mengirim URL WhatsApp ke klien
    res.json({ url: checkoutWhatsApp });
  });
};


