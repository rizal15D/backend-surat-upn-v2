const router = require("express");
const daftarSuratController = require("../Http/controllers/daftar_surat_controller");
const notifikasiController = require("../Http/controllers/notifikasi_controller");
const templateController = require("../Http/controllers/template_surat_controller");

const app = router();

app.use("/daftarsurat", daftarSuratController);
app.use("/notifikasi", notifikasiController);
app.use("/template", templateController);

module.exports = app;
