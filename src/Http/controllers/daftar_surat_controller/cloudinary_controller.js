const cloudinary = require("../../../../config/cloudinaryConfig");
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const {
  Daftar_surat,
  Template_surat,
  Role_user,
  Users,
} = require("../../../models");
const getStatus = require("./status_controller");
// const status = getStatus();

const fs = require("fs");
const fetch = require("node-fetch");

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
  .get("/download/cloudinary", async function (req, res) {
    const { id } = req.query;
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid params" });
    }

    const daftar_surat = await Daftar_surat.findOne({ where: { id: id } });

    if (!daftar_surat) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Daftar Surat not found" });
    }

    // const fileName = "newFileName.pdf"; // Ganti dengan nama file yang diinginkan/
    const fileName = daftar_surat.judul;
    const downloadUrl = `${
      daftar_surat.lokasi_surat
    }?attachment=${encodeURIComponent(fileName)}`;

    // Download file dari Cloudinary
    const response = await fetch(downloadUrl);
    const fileBuffer = await response.buffer();

    const tempDir = "/tmp/daftar_surat";
    // Periksa apakah direktori sudah ada
    if (!fs.existsSync(tempDir)) {
      // Jika tidak, buat direktori
      fs.mkdirSync(tempDir);
    }

    // Simpan file di server Anda//
    const filePath = "/tmp/daftar_surat/temp";
    fs.writeFileSync(filePath, fileBuffer);

    // Kembalikan file kepada klien dengan nama yang diinginkan
    res.download(filePath, fileName);
  })

  .get("/detail", async (req, res) => {
    try {
      const { daftar_surat_id } = req.body;
      const user = await Users.findOne({
        where: { id: req.user.id },
      });
      const role = await Role_user.findOne({
        where: { id: user.role_id },
      });

      const statusArray = getStatus(role.id, true);
      const status = statusArray.join(", ");

      const surat = await Daftar_surat.findOne({
        where: { id: daftar_surat_id },
      });

      if (!surat) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: "Daftar surat not found",
        });
      }

      if (!surat.dibaca) {
        const [affectedRowsCount, affectedRows] = await Daftar_surat.update(
          {
            dibaca: true,
            status,
          },
          {
            where: { id: daftar_surat_id },
            returning: true,
          }
        );

        surat = affectedRows[0];
      }

      res.status(StatusCodes.OK).json({ surat: surat });
    } catch (error) {
      console.error("Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
      });
    }
  })

  .post(
    "/upload/cloudinary/v2",
    upload.fields([
      { name: "surat", maxCount: 1 },
      { name: "thumbnail", maxCount: 1 },
    ]),
    async function (req, res, next) {
      try {
        const { judul, jenis } = req.body;
        const judulExt =
          judul + path.extname(req.files["surat"][0].originalname);
        // const judulCheck = await Daftar_surat.findOne({
        //   where: { judul: judulExt },
        // });
        // const jenisExists = await Template_surat.findOne({ where: { jenis } });

        // if (!jenisExists) {
        //   return res.status(400).json({ error: "Jenis tidak ditemukan" });
        // }
        const user = await Users.findOne({
          where: { id: req.user.id },
        });
        const role = await Role_user.findOne({
          where: { id: user.role_id },
        });

        // if (judulCheck) {
        //   return res.json("judul/file sudah ada");
        // }

        let suratUrl;
        let thumbnailUrl;

        if (req.files["surat"]) {
          await new Promise((resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type: getResourceType(
                    req.files.surat[0].originalname
                  ),
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
        }

        // Upload thumbnail to Cloudinary
        if (req.files["thumbnail"]) {
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
        }

        const status = getStatus(role.id, false, null);
        const statusString = status.join(", "); // Convert array to string
        const daftar_surat = await Daftar_surat.create({
          pin: 0,
          dibaca: 0,
          judul: judulExt,
          thumbnail: thumbnailUrl || "",
          jenis: jenis || "",
          user_id: req.user.id,
          tanggal: Date(),
          status: statusString,
          lokasi_surat: suratUrl,
          persetujuan: "",
          komentar_id: null,
        });

        res
          .status(StatusCodes.CREATED)
          .json({ message: "File successfully uploaded", daftar_surat });
      } catch (error) {
        console.error("Error:", error);
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  )
  .put("/", async function (req, res) {});

module.exports = app;
