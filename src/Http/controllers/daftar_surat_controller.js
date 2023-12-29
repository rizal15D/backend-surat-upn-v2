const express = require("express");
const app = express.Router();
const { Daftar_surat, Template_surat } = require("../../models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .get("/", function (req, res) {
    res.send("get hello world2");
  })
  .post("/", async function (req, res) {
    const { template_surat_id, user_id, status_id } = req.body;
    const auth = async (req, res, next) => {
      const authHeader = req.header.authorization;
      if (!authHeader || !authHeader.startWith("Bearer")) {
        throw new UnauthenticatedError("Auth invalid");
      }
      const token = authHeader.split(" ")[1];

      try {
        const payload = jwt.verify(token, process.env);
        req.user;
      } catch (error) {}
    };

    const template_surat = await Template_surat.findOne({
      where: { id: template_surat_id },
    });

    const surat = await Daftar_surat.create({
      template_surat_id: template_surat.id,
      user_id: user_id,
      tanggal: Date(),
      status_id,
      lokasi_surat,
      persetujuan_id,
    });
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
