const router = require("express");
const daftarSuratController = require("../Http/controllers/daftar_surat_controller");

const app = router();

app.use("/daftarsurat", daftarSuratController);

module.exports = app;
