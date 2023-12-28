const express = require("express");
const sequelize = require("../../models/index");
const Notifikasi = require("../../models/notifikasi");
// const notifikasiModel = Notifikasi;

const app = express.Router();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app
  .post("/", function (req, res) {
    return sequelize
      .async({ alter: true })
      .then(() => {
        return Notifikasi.create({
          surat_id: req.body.surat_id,
          departemen_id_dari: req.body.departemen_id_dari,
          departemen_id_ke: req.body.departemen_id_ke,
        });
        console.log("success post notif");
        res.status(201).json(notifikasi);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          message: "An error occurred while creating the notification.",
        });
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
