const express = require("express");
const cors = require("cors");
const daftarSuratController = require("../Http/controllers/daftar_surat_controller");
const notifikasiController = require("../Http/controllers/notifikasi_controller");
const templateController = require("../Http/controllers/template_surat_controller");
const authMiddleware = require("../Http/middleware/authMiddleware");
const usersController = require("../Http/controllers/user_controller");
const authController = require("../Http/controllers/authentication_controller");
const roleUserController = require("../Http/controllers/role_user_controller");
const prodiController = require("../Http/controllers/prodi_controller");
const komentarController = require("../Http/controllers/komentar_controller");
const fakultasController = require("../Http/controllers/fakultas_controller");
const periodeController = require("../Http/controllers/periode_controller");
const nomorController = require("../Http/controllers/nomor_surat_controller");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.use(cors());

router.use("/auth", authController);
router.use("/periode", authMiddleware, periodeController);
router.use("/user", authMiddleware, usersController);
router.use("/daftar-surat", authMiddleware, daftarSuratController);
router.use("/prodi", authMiddleware, prodiController);
router.use("/role-user", authMiddleware, roleUserController);
router.use("/fakultas", authMiddleware, fakultasController);
router.use("/template-surat", authMiddleware, templateController);
router.use("/notifikasi", authMiddleware, notifikasiController);
router.use("/komentar", authMiddleware, komentarController);
router.use("/nomor-surat", authMiddleware, nomorController);

module.exports = router;
