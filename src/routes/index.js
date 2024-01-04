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

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.use(cors());

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.use("/user", authMiddleware, usersController);
router.use("/daftarsurat", authMiddleware, daftarSuratController);
// router.use("/prodi", authMiddleware, prodiController);
router.use("/role-user", authMiddleware, roleUserController);
router.use("/template-surat", authMiddleware, templateController);
router.use("/notifikasi", authMiddleware, notifikasiController);
router.use("/komentar", authMiddleware, komentarController);

module.exports = router;
