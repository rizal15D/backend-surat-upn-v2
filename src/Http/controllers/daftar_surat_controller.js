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
      res.send(await Daftar_surat.findAll({order: [["id", "ASC"]]}));
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

  .get("/detail/persetujuan", async (req, res) => {
    try {
      const { daftar_surat_id } = req.body;
      const user = await Users.findOne({
        where: { id: req.user.id },
      });
      const role = await Role_user.findOne({
        where: { id: user.role_id },
      });

      const statusArray = getStatus(role.id, true);
      const status = statusArray.join(', ');

      const surat = await Daftar_surat.findOne({
        where: { id: daftar_surat_id },
      });

      if (!surat) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: "Daftar surat not found",
        });
      }

      if (surat.persetujuan !== persetujuan) {
        const [affectedRowsCount, affectedRows] = await Daftar_surat.update(
          {
            persetujuan,
            status,
          },
          {
            where: { id: daftar_surat_id },
            returning: true,
          }
        );

        surat = affectedRows[0];
      }

      res.status(StatusCodes.OK).json({ surat: surat, order: [["id", "ASC"]] });
    } catch (error) {
      console.error("Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
      });
    }
  })

  .use(cloudinaryController);

module.exports = app;
