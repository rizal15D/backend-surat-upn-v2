const express = require("express");
const daftarSuratController = require("../Http/controllers/daftar_surat_controller");
const notifikasiController = require("../Http/controllers/notifikasi_controller");
const templateController = require("../Http/controllers/template_surat_controller");
const authMiddleware = require("../Http/middleware/authMiddleware");
const loginController = require("../Http/controllers/loginController");
const registerController = require("../Http/controllers/registerController");

const router = express.Router();

router.use("/daftarsurat", daftarSuratController);
router.use("/notifikasi", notifikasiController);
router.use("/template", templateController);
router.use("/daftarsurat", authMiddleware, daftarSuratController);
router.use("/login", loginController);
router.use("/register", registerController);

module.exports = router;
