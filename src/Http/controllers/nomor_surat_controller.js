const express = require("express");
const {
  Nomor_surat,
  Daftar_surat,
  Users,
  Prodi,
  Fakultas,
  Periode,
} = require("../../models");
const { StatusCodes } = require("http-status-codes");
const app = express.Router();

app.post("/", async (req, res) => {
  try {
    const { surat_id } = req.body;

    let nomor;
    let nomor_surat;

    nomor = await Nomor_surat.findOne({
      order: [["id", "DESC"]],
    });

    if (nomor && nomor.length > 0) {
      // Menggunakan padStart untuk memastikan panjang nomor_surat selalu 10 karakter
      nomor_surat = String(parseInt(nomor[0].nomor_surat, 10) + 1);
    } else {
      nomor_surat = "1"; // Jika tidak ada nomor sebelumnya, dimulai dari 1
    }

    const user_dekan = Users.findOne({
      where: { id: req.user.id },
    });

    const user_surat = Daftar_surat.findOne({
      where: { id: surat_id },
    });

    const user = await Users.findOne({
      where: { id: user_surat.user_id },
    });

    if (!user || !user_dekan) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    const prodi = await Prodi.findOne({
      where: { id: user_surat.prodi_id },
    });

    const fakultas = await Fakultas.findOne({
      where: { id: user.fakultas_id },
    });

    const active_periodes = await Periode.findAll({
      where: { status: true },
    });

    if (active_periodes.length() !== 1) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Active period should be exactly 1" });
    }

    const kode_prodi = prodi.name;
    const kode_fakultas = fakultas.name;
    const tahun_periode = active_periodes[0].tahun;

    nomor_surat = `${nomor_surat}/${kode_fakultas}/TU_${kode_prodi}/${tahun_periode}`;

    const saveNomorSurat = await Nomor_surat.create({
      nomor_surat,
      surat_id,
    });

    if (saveNomorSurat) {
      return res.status(StatusCodes.OK).json({ message: "Success" });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to save nomor surat" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
});

module.exports = app;
