const express = require("express");
const multer = require("multer");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { Template_surat } = require("../../models");
const app = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "template_surat/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

  .post("/uploads", upload.single("surat"), async function (req, res, next) {
    try {
      const judul = req.file.originalname;
      const lokasi = path.join(__dirname, "../../../template_surat");
      const template_surat = await Template_surat.create({
        judul: judul,
        lokasi: lokasi,
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
  })

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
