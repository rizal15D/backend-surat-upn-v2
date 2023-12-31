const express = require("express");
const app = express.Router();
const {
  Daftar_surat,
  Template_surat,
  Status,
  Persetujuan,
} = require("../../models");
const config = require("../../../process.env");
const jwt = require("jsonwebtoken");
const path = require("path");

const environment = "development";
const secretKey = config[environment].secret_key;
const auth = require("../middleware/authMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .get("/", async function (req, res) {
    res.send(await Daftar_surat.findAll());
  })
  .get("/:id", async function (req, res) {
    try {
      const surat = await Daftar_surat.findOne({
        where: { id: req.params.id },
        attributes: [
          "template_surat_id",
          "user_id",
          "tanggal",
          "status_id",
          "lokasi_surat",
          "persetujuan_id",
        ],
      });

      if (!surat) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "No record found" });
      }

      res.status(StatusCodes.OK).json(surat);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  })
  .post("/", async function (req, res) {
    try {
      const { template_surat_id } = req.body;
      const token = req.headers.authorization.split(" ")[1];

      const template_surat = await Template_surat.findOne({
        where: { id: template_surat_id },
      });

      const status = await Status.findOne({
        where: { id: 12 },
      });

      const persetujuan = await Persetujuan.findOne({
        where: { id: 9 },
      });

      const decoded = jwt.verify(token, secretKey);
      const user_id = decoded.id;
      const surat = await Daftar_surat.create({
        template_surat_id: template_surat_id,
        user_id: user_id,
        tanggal: Date(),
        status_id: status.id,
        lokasi_surat: path.join(__dirname, "../../../daftar_surat"),
        persetujuan_id: persetujuan.id,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  })
  .put("/:id", (req, res) => {
    const id = req.params.id;
    res.send("put hello world2");
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send("delete hello world2");
  });

module.exports = app;
