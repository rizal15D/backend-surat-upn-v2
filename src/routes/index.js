const express = require("express");
const daftarSuratController = require("../Http/controllers/daftar_surat_controller");
const authMiddleware = require("../Http/middleware/authMiddleware");
const loginController = require("../Http/controllers/loginController");
const registerController = require("../Http/controllers/registerController");

const router = express.Router();

router.use("/daftarsurat", authMiddleware, daftarSuratController);
router.use("/login", loginController);
router.use("/register", registerController);

module.exports = router;