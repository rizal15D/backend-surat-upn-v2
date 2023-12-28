const express = require("express");
const daftarSuratController = require("../Http/controllers/daftar_surat_controller");
<<<<<<< HEAD
const notifikasiController = require("../Http/controllers/notifikasi_controller");
const templateController = require("../Http/controllers/template_surat_controller");
=======
const authMiddleware = require("../Http/middleware/authMiddleware");
const loginController = require("../Http/controllers/loginController");
const registerController = require("../Http/controllers/registerController");
>>>>>>> create/controller

const router = express.Router();

<<<<<<< HEAD
app.use("/daftarsurat", daftarSuratController);
app.use("/notifikasi", notifikasiController);
app.use("/template", templateController);
=======
router.use("/daftarsurat", authMiddleware, daftarSuratController);
router.use("/login", loginController);
router.use("/register", registerController);
>>>>>>> create/controller

module.exports = router;