const express = require("express");
const app = express.Router();
const {
  Daftar_surat,
  Users,
  Role_user,
  Prodi,
} = require("../../models");
const auth = require("../middleware/authMiddleware");
const cloudinaryController = require("../controllers/daftar_surat_controller/cloudinary_controller");
const getStatus = require("./daftar_surat_controller/status_controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .get("/", async function (req, res) {
    const user = await Users.findOne({
      where: { id: req.user.id },
      order: [["id", "ASC"]]
    });
    const role = await Role_user.findOne({
      where: { id: user.role_id },
    });

    if (role.id !== 3) {
      //selain prodi
      res.send(await Daftar_surat.findAll());
    } else {
      const prodi = await Prodi.findOne({
        where: { id: user.prodi_id },
      });
      res.send(
        await Daftar_surat.findAll({
          include: [
            {
              model: Users,
              as: "user",
              attributes: ["*"],
              where: { prodi_id: prodi.id },
              include: [
                {
                  model: Prodi,
                  as: "prodi",
                  attributes: ["name"],
                },
              ],
            },
          ],
        })
      );
    }
  })

  .put("/status", async (req, res) => {
    const { id } = req.query;
    const { status, persetujuan } = req.body;
    let setStatus;
    const surat = Daftar_surat.findOne({
      where: { id },
    });

    const user = await Users.findOne({
      where: { id: req.user.id },
    });
    const role = await Role_user.findOne({
      where: { id: user.role_id },
    });

    if (persetujuan) {
      setStatus = getStatus(role.id, status, persetujuan);
    } else {
      setStatus = getStatus(role.id, status);
    }

    surat.status = setStatus;

    await surat.save();
  })

  .use(cloudinaryController);

module.exports = app;
