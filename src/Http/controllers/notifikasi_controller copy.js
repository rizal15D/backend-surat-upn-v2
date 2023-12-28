const express = require("express");
const Notifikasi = require("../../models/notifikasi")("sequelize");

const app = express.Router();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app
  // .get("/:id", function (req, res) {
  //   const Notifikasi = sequelize.define("notifikasi", {
  //     // Let's say we wanted to see every username in uppercase, even
  //     // though they are not necessarily uppercase in the database itself
  //     departemen_id_ke: {
  //       type: DataTypes.INTEGER,
  //       get() {
  //         const rawValue = this.getDataValue("departemen_id_ke");
  //         return res.send("testing1");
  //         // return rawValue ? rawValue.toUpperCase() : null;
  //       },
  //     },
  //   });
  // })
  // .get("/:id", async function (req, res) {
  //   try {
  //     const departemen_id_ke = req.params.departemen_id_ke;
  //     const surat_id = await surat_id.findByPk(departemen_id_ke);

  //     if (!surat_id) {
  //       return res.status(404).json({ error: "Task tidak ditemukan" });
  //     }

  //     res.json(surat_id);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Gagal mengambil task" });
  //   }
  // })
  // .get("/", function (req, res) {
  //   const notifications = [
  //     { id: 1, message: "Notifikasi 1" },
  //     { id: 2, message: "Notifikasi 2" },
  //     { id: 3, message: "Notifikasi 3" },
  //   ];
  //   const notificationId = parseInt(req.params.id);
  //   const notification = notifications.find(
  //     (notif) => notif.id === notificationId
  //   );

  //   if (!notification) {
  //     return res.status(404).json({ error: "Notifikasi tidak ditemukan" });
  //   }

  //   res.json(notification);
  // })
  .post("/", function (req, res) {
    Notifikasi.sync({ alter: true })
      .then(() => {
        const notifikasi = Notifikasi.build({
          surat_id: req.surat_id,
          departemen_id_dari: req.departemen_id_dari,
          departemen_id_ke: req.departemen_id_ke,
        });
        return notifikasi.save();
      })
      .then((notifikasi) => {
        console.log("success post notif");
      });

    // Notifikasis.create({
    //   surat_id: req.surat_id,
    //   departemen_id_dari: req.departemen_id_dari,
    //   departemen_id_ke: req.departemen_id_ke,
    // }).then((notifikasi) => {
    //   console.log("User created:", user.toJSON());
    // });

    res.send("post hello world2");
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
