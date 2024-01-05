const uploadByMulter = require("../controllers/template_surat_controller/multer_controller");
const cloudinaryController = require("../controllers/template_surat_controller/cloudinary_controller.js");
const express = require("express");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { Template_surat } = require("../../models");
// const isAdmin = require("../middleware/adminMiddleware");
const app = express.Router();
// const { google } = require('googleapis');
// const drive = google.drive('v3');
// const key = require('./path-to-your-service-account-key.json');
// const upload = multer({ storage: multer.memoryStorage() });
// const upload = multer();

app
  .get("/download/", async function (req, res) {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Invalid params" });
    }

    const template_surat = await Template_surat.findOne({ where: { id: id } });

    if (!template_surat) {
      return res.status(404).json({ error: "Template Surat not found" });
    }
    res.download(path.join(template_surat.lokasi, template_surat.judul));
  })

  .get("/", async function (req, res) {
    res.send(await Template_surat.findAll());
  })

  // .use("/uploads/", uploadByMulter)

  .use("/link/", cloudinaryController)

  // .post(
  //   "/uploads/v3",
  //   upload.single("surat"),
  //   isAdmin,
  //   async function (req, res, next) {
  //     try {
  //       const { deskripsi } = req.body;
  //       const judul = req.file.originalname;
  //       const judulCheck = await Template_surat.findOne({ where: { judul } });

  //       if (judulCheck) {
  //         res.json("judul/file sudah ada");
  //       }

  //       const lokasi = path.join(__dirname, "../../../template_surat");
  //       const template_surat = await Template_surat.create({
  //         judul,
  //         lokasi,
  //         jenis,
  //         deskripsi,
  //       });

  //       res
  //         .status(StatusCodes.CREATED)
  //         .json({ message: "File successfully uploaded", template_surat });
  //     } catch (error) {
  //       console.error("Error:", error);
  //       res
  //         .status(StatusCodes.INTERNAL_SERVER_ERROR)
  //         .json({ error: "Internal Server Error" });
  //     }
  //   }
  // )

  .delete("/", async (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Parameter 'id' is required" });
      }

      const deleteSurat = await Template_surat.destroy({
        where: { id: id },
      });

      if (deleteSurat) {
        res
          .status(200)
          .json({ message: "Template Surat deleted successfully" });
      } else {
        res.status(404).json({ error: "Template Surat not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
module.exports = app;
