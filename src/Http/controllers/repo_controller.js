const express = require("express");
const { Repo, Daftar_surat } = require("../../models");
const { StatusCodes } = require("http-status-codes");
// const app = express.Router();

const repo = async (req, res) => {
  const { surat_id } = id;

  try {
    const surat = await Daftar_surat.findOne({
      where: { id: surat_id },
    });

    if (!surat) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Surat not found" });
    }

    const repo = await Repo.create({
      judul: surat.judul,
      jenis: surat.jenis,
      user_id: surat.user_id,
      tanggal: surat.tanggal,
      lokasi_surat: surat.lokasi_surat,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Repo created successfully", repo });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }//pindah nak branch master sek
};//okeh

module.exports = { repo };
