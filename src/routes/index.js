const express = require("express");
const daftarSuratController = require("../Http/controllers/daftar_surat_controller");
const notifikasiController = require("../Http/controllers/notifikasi_controller");
const templateController = require("../Http/controllers/template_surat_controller");
const authMiddleware = require("../Http/middleware/authMiddleware");
const loginController = require("../Http/controllers/loginController");
const registerController = require("../Http/controllers/registerController");
const usersController = require("../Http/controllers/user_controller");
const authController = require("../Http/controllers/authentication_controller");
const roleUserController = require("../Http/controllers/role_user_controller");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.use("/daftarsurat", daftarSuratController);
// router.use("/notifikasi", notifikasiController);
// router.use("/template", templateController);
// router.use("/daftarsurat", daftarSuratController);

// router.use("/login", loginController);
// router.use("/register", registerController);

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.use("/role-user", roleUserController);
router.use("/user", usersController);
router.use("/template-surat", templateController);

// router.use("api/v1", (authMiddleware) => {
//   router.post("/auth/register", authController.register);
//   router.use("/auth/login", authController.login);
// });

module.exports = router;
