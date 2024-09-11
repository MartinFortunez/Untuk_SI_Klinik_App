const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Ensure file is stored in memory buffer
// const upload = require('../config/upload');  // Adjust the path if needed
const adminController = require("../controllers/adminController");
const dokterController = require("../controllers/dokterController");
const jadwalDokterController = require("../controllers/jadwalDokterController");
const fasilitasKlinikController = require("../controllers/fasilitasKlinikController.js");
const jadwalKonsulController = require("../controllers/jadwalKonsulController.js");
const reminderController = require("../controllers/reminderController.js");
const riwayatController = require("../controllers/riwayatController.js");
const ulasanController = require("../controllers/ulasanController.js");
const jwtController = require("../controllers/jwtController");
const verifyToken = require("../middleware/auth");

// Admin Routes
// READ
router.get("/dashboard/admin", adminController.getAllAdmins);

// CREATE
router.post(
  "/dashboard/admin/add",
  upload.single("foto_admin"),
  adminController.addAdmin
);

// UPDATE
router.get("/dashboard/admin/edit/:id", adminController.getAdminById);
router.put(
  "/dashboard/admin/edit/:id",
  upload.single("foto_admin"),
  adminController.editAdmin
);

// DELETE
router.delete("/dashboard/admin/delete/:id", adminController.deleteAdmin);

// Jwt Auth
router.post("/register", jwtController.register);
router.post("/login", jwtController.login);
router.get("/profile", verifyToken, jwtController.getProfile);
// End Admin Routes

// Start Dokter Routes
// READ hanya menampilkan 1 tabel dokter
router.get("/dashboard/dokter-klinik", dokterController.getAllDokter);
// CREATE
router.post(
  "/dashboard/dokter-klinik/add",
  upload.single("foto_dokter"),
  dokterController.addDokter
);

// UPDATE
router.get("/dashboard/dokter-klinik/edit/:id", dokterController.getDokterById);
router.put(
  "/dashboard/dokter-klinik/edit/:id",
  upload.single("foto_dokter"),
  dokterController.editDokter
);

// DELETE
router.delete(
  "/dashboard/dokter-klinik/delete/:id",
  dokterController.deleteDokter
);
// End Dokter Routes

// Start Jadwal Dokter Routes
// READ
router.get(
  "/dashboard/jadwal-dokter-spesialis",
  jadwalDokterController.getAllJadwalDokter
);

// Menampilkan hanya tabel jadwal dokter
router.get(
  "/dashboard/jadwal-dokter",
  jadwalDokterController.getAllJadwalDokterTable
);
router.get(
  "/dashboard/jadwal-dokter/:id",
  jadwalDokterController.getJadwalDokterTableById
);

// CREATE
router.post(
  "/dashboard/jadwal-dokter-spesialis/add",
  jadwalDokterController.addJadwalDokter
);

// UPDATE
router.get(
  "/dashboard/jadwal-dokter-spesialis/edit/:id",
  jadwalDokterController.getJadwalDokterById
);
router.put(
  "/dashboard/jadwal-dokter-spesialis/edit/:id",
  jadwalDokterController.editJadwalDokter
);

// DELETE
router.delete(
  "/dashboard/jadwal-dokter-spesialis/delete/:id",
  jadwalDokterController.deleteJadwalDokter
);
// End Jadwal Dokter Routes

// Start Fasilitas Routes
// READ
router.get("/dashboard/fasilitas", fasilitasKlinikController.getAllFasilitas);
// CREATE
router.post(
  "/dashboard/fasilitas/add",
  upload.single("foto_fasilitas"),
  fasilitasKlinikController.addFasilitas
);

// UPDATE
router.get(
  "/dashboard/fasilitas/edit/:id",
  fasilitasKlinikController.getFasilitasById
);
router.put(
  "/dashboard/fasilitas/edit/:id",
  upload.single("foto_fasilitas"),
  fasilitasKlinikController.editFasilitas
);

// DELETE
router.delete(
  "/dashboard/fasilitas/delete/:id",
  fasilitasKlinikController.deleteFasilitas
);
// End Fasilitas Routes

// Start Feedback Routes
// READ
router.get("/dashboard/feedback", ulasanController.getAllUlasan);
// CREATE
router.post("/dashboard/feedback/add", ulasanController.addUlasan);
// UPDATE
router.get("/dashboard/feedback/edit/:id", ulasanController.getUlasanById);
router.put("/dashboard/feedback/edit/:id", ulasanController.editUlasan);
// DELETE
router.delete("/dashboard/feedback/delete/:id", ulasanController.deleteUlasan);
// End Feedback Routes

// Start Jadwal Konsul Routes
// READ
router.get("/dashboard/jadwal-konsultasi", jadwalKonsulController.getAllKonsul);
// CREATE
router.post(
  "/dashboard/jadwal-konsultasi/add",
  jadwalKonsulController.addJadwalKonsul
);

// UPDATE NEW CANCEL, APPROVE, COMPELETE
router.get('/dashboard/jadwal-konsultasi/edit/:id', jadwalKonsulController.getJadwalKonsulById);
router.put('/dashboard/jadwal-konsultasi/:id/setuju', jadwalKonsulController.setujuKonsultasi);
router.put('/dashboard/jadwal-konsultasi/:id/cancel', jadwalKonsulController.cancelKonsultasi);
router.put('/dashboard/jadwal-konsultasi/:id/complete', jadwalKonsulController.completeKonsultasi);
// UPDATE END NEW CANCEL, APPROVE, COMPELETE

// DELETE REJECT DARI JADWAL KONSULTASI
router.delete("/dashboard/jadwal-konsultasi/reject/:id", jadwalKonsulController.deleteJadwalKonsul);
// End Jadwal Konsul Routes

// start reminder routes
router.get("/dashboard/reminder", reminderController.getAllReminder);
router.post('/dashboard/reminder/send-whatsapp/:id', reminderController.sendWhatsAppMessageReminder);
// end reminder routes

// start riwayat routes
router.get("/dashboard/riwayat/search", riwayatController.getAllRiwayatCancel);
router.get("/dashboard/riwayat", riwayatController.getAllRiwayatCancel);
router.post('/dashboard/riwayat/send-whatsapp/:id', riwayatController.sendWhatsAppMessageRiwayat);
// end riwayat routes

module.exports = router;
