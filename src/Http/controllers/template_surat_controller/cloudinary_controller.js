const cloudinary = require("../../../../config/cloudinaryConfig");
const express = require("express");
const app = express.Router();
const { StatusCodes } = require("http-status-codes");
const { Template_surat } = require("../../../models");
const isAdmin = require("../../middleware/adminMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
// require("../../../../template_surat");

function getResourceType(filename) {
  const extension = path.extname(filename).toLowerCase();
  const imageExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".bmp",
    ".tiff",
    ".ico",
  ];
  const videoExtensions = [".mp4", ".avi", ".mov", ".flv", ".wmv", ".mkv"];

  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (videoExtensions.includes(extension)) {
    return "video";
  } else {
    return "raw";
  }
}

app
  .get("/cloudinary", async function (req, res) {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Invalid params" });
    }

    const template_surat = await Template_surat.findOne({ where: { id: id } });

    if (!template_surat) {
      return res.status(404).json({ error: "Template Surat not found" });
    }

    // const fileName = "newFileName.pdf"; // Ganti dengan nama file yang diinginkan
    const fileName = template_surat.judul;
    const downloadUrl = `${
      template_surat.lokasi
    }?attachment=${encodeURIComponent(fileName)}`;

    // Download file dari Cloudinary
    const response = await fetch(downloadUrl);
    const fileBuffer = await response.buffer();

    const tempDir = "/tmp/template_surat";
    // Periksa apakah direktori sudah ada
    if (!fs.existsSync(tempDir)) {
      // Jika tidak, buat direktori
      fs.mkdirSync(tempDir);
    }

    // Simpan file di server Anda
    const filePath = "/tmp/template_surat/temp";
    fs.writeFileSync(filePath, fileBuffer);

    // Kembalikan file kepada klien dengan nama yang diinginkan
    res.download(filePath, fileName);
  })

  .post(
    "/cloudinary",
    upload.fields([
      { name: "surat", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    isAdmin,
    async function (req, res, next) {
      try {
        const { jenis, deskripsi } = req.body;
        const judul = req.files["surat"][0].originalname;
        const judulCheck = await Template_surat.findOne({ where: { judul } });

        if (judulCheck) {
          return res.json("judul/file sudah ada");
        }

        let suratUrl;
        let thumbnailUrl;

        await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: getResourceType(req.files.surat[0].originalname),
                public_id: path.parse(req.files.surat[0].originalname),
              },
              (error, result) => {
                if (error) reject(error);
                else {
                  suratUrl = result.url;
                  resolve(result);
                }
              }
            )
            .end(req.files.surat[0].buffer);
        });

        // Upload thumbnail to Cloudinary
        await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                resource_type: getResourceType(
                  req.files.thumbnail[0].originalname
                ),
                public_id: path.parse(req.files.thumbnail[0].originalname),
              },
              (error, result) => {
                if (error) reject(error);
                else {
                  thumbnailUrl = result.url;
                  resolve(result);
                }
              }
            )
            .end(req.files.thumbnail[0].buffer);
        });

        const template_surat = await Template_surat.create({
          judul,
          lokasi: suratUrl,
          jenis: jenis || "",
          deskripsi: deskripsi || "",
          thumnail: thumbnailUrl,
        });

        res
          .status(StatusCodes.CREATED)
          .json({ message: "File successfully uploaded", template_surat });
      } catch (error) {
        console.error("Error:", error);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  );

module.exports = app;
