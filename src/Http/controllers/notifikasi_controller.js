const express = require("express");
const { sequelize, Sequelize } = require("../../models/index");
const Notifikasi = require("../../models/notifikasi")(
  sequelize,
  Sequelize.DataTypes
);
const app = express.Router();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app
  .post("/", async function (req, res) {
    try {
      await sequelize.sync({ alter: true });

      const notifikasi = await Notifikasi.create({
        surat_id: req.body.surat_id, // Gunakan req.body, bukan req.surat_id
        departemen_id_dari: req.body.departemen_id_dari, // tetep error cuy
        departemen_id_ke: req.body.departemen_id_ke,
      });

      // Berikan respon setelah notifikasi berhasil dibuat
      res.status(201).json({ message: "Success post notif", notifikasi });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
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
