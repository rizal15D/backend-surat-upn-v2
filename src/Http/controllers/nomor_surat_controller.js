const express = require("express");
const {
  Nomor_surat,
  Users,
  Prodi,
  Fakultas,
  Periode,
} = require("../../models");
const { StatusCodes } = require("http-status-codes");
const app = express.Router();

app.post("/", async (req, res) => {
  const { user_id } = req.query;

  let nomor;
  let nomorSurat;
  nomor = await Nomor_surat.findAll({
    limit: 1,
    order: [["id", "DESC"]],
  });

  if (nomor) {
    nomorSurat = String(nomor[0].nomor_surat, 10);
    nomor = string.split("/")[0];
    nomor = parseInt(nomor) + 1;
  } else {
    nomor = 1;
  }

  const user = await Users.findOne({
    where: { id: user_id },
  });
  const prodi = await Prodi.findOne({
    where: { id: user.prodi_id },
  });
  const fakultas = await Fakultas.findOne({
    where: { id: user.fakultas_id },
  });

  const periode = await Periode.findAll({
    where: { status: 1 },
  });
  if (periode >= 1) {
    res.send("Periode aktif harus 1");
  }

  const kode_prodi = prodi.name;
  const kode_fakultas = fakultas.name;

  nomorSurat = `${nomor}/${kode_fakultas}/TU_${kode_prodi}/${periode[0].tahun}`;

  res.send(nomorSurat);
});
