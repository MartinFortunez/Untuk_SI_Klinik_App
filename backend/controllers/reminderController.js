const JadwalKonsul = require("../models/JadwalKonsul");

exports.getAllReminder = (req, res) => {
  JadwalKonsul.getAllReminderUser((err, schedules) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.status(200).json({ schedules });
  });
};

// Fungsi untuk memastikan nomor dalam format E.164
const formatPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("0")) {
    return "+62" + phoneNumber.slice(1);
  }
  return phoneNumber;
};

// Fungsi untuk memformat tanggal
const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

exports.sendWhatsAppMessageReminder = (req, res) => {
  const { id } = req.params;
  console.log(`Fetching schedule with ID: ${id}`);

  JadwalKonsul.getById(id, (err, schedule) => {
    if (err) {
      console.error("Error retrieving schedule data:", err);
      return res.status(500).send("Error retrieving schedule data");
    }

    if (!schedule) {
      console.log("Schedule not found");
      return res.status(404).send("Schedule not found");
    }

    console.log("Schedule retrieved:", schedule);

    const formattedPhoneNumber = formatPhoneNumber(schedule.no_wa);
    const formattedTenggat = formatDate(new Date(schedule.tgl_tenggat));

    const message = `Halo, ini adalah Klinik App.\n\nKami memiliki catatan atas nama:\n\nNama: ${schedule.nama_pasien}\nNIK: ${schedule.nik}\nNomor Kontak/WhatsApp: ${formattedPhoneNumber}\nTenggat: ${formattedTenggat}\n\nMohon konfirmasikannya, apakah Anda tetap ingin konsultasi. Terima kasih.`;

    console.log("Sending message:", message);

    // Konstruksi URL WhatsApp
    const waLink = "https://web.whatsapp.com/send";
    const phone = formattedPhoneNumber;
    const text = encodeURIComponent(message);
    const checkoutWhatsApp = `${waLink}?phone=${phone}&text=${text}`;

    // Mengirim URL WhatsApp ke klien
    res.json({ url: checkoutWhatsApp });
  });
};
