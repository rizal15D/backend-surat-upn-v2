const express = require("express");
const app = express();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "daftar_surat/");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.judul + ".pdf");
  },
});

const upload = multer({ storage: storage });

app.post("/", upload.single("surat"), async function (req, res) {
  try {
    const { judul } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    const status = await Status.findOne({
      where: { id: 5 },
    });

    const persetujuan = await Persetujuan.findOne({
      where: { keputusan: "Null" },
    });

    const decoded = jwt.verify(token, secretKey);
    const user_id = decoded.id;
    const surat = await Daftar_surat.create({
      pin: 0,
      dibaca: 0,
      judul,
      user_id: user_id,
      tanggal: Date(),
      status_id: status.id,
      lokasi_surat: path.join(__dirname, "../../../daftar_surat"),
      persetujuan_id: persetujuan.id,
      komentar_id: null,
    });

    res.json("sukses");
  } catch (error) {
    console.error("Error:", error);
  }
});
