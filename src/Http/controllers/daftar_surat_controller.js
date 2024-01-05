const express = require("express");
const app = express.Router();
const {
  Daftar_surat,
  Template_surat,
  Status,
  Persetujuan,
} = require("../../models");

const auth = require("../middleware/authMiddleware");
const cloudinaryController = require("../controllers/daftar_surat_controller/cloudinary_controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .get("/", async function (req, res) {
    const user = await Users.findOne({
      where: { id: req.user.id },
    });
    const role = await Role_user.findOne({
      where: { id: user.role_id },
    });
    if (role.id !== 3) {
      //selain prodi
      res.send(await Daftar_surat.findAll());
    } else {
      res.send(
        await Daftar_surat.findOne(
          {
            include: {
              model: Prodi,
              attributes: ["id as prodi_id"],
            },
          },
          { where: { user_id: user.id } }
        )
      );
    }
  })

  .use(cloudinaryController)

  .put("/:id", (req, res) => {
    const id = req.params.id;
    res.send("put hello world2");
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send("delete hello world2");
  });

module.exports = app;
