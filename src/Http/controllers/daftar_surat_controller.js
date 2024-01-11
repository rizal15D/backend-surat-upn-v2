const express = require("express");
const app = express.Router();
const {
  Daftar_surat,
  Users,
  Role_user,
  Prodi,
  Fakultas,
} = require("../../models");
const auth = require("../middleware/authMiddleware");
const cloudinaryController = require("../controllers/daftar_surat_controller/cloudinary_controller");
const { StatusCodes } = require("http-status-codes");
const getStatus = require("./daftar_surat_controller/status_controller");
const { Op } = require("sequelize");

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
    //selain prodi
    if (role.id !== 3) {
      if (role.id === 4) {
        return res.send(
          await Daftar_surat.findAll({
            where: {
              status: {
                [Op.or]: ["disetujui TU", "disetujui Dekan", "ditolak Dekan"],
              },
            },
            include: [
              {
                model: Users,
                as: "user",
                attributes: {
                  exclude: [
                    "id",
                    "password",
                    "role_id",
                    "prodi_id",
                    "fakultas_id",
                    "createdAt",
                    "updatedAt",
                  ],
                },
                include: [
                  {
                    model: Prodi,
                    as: "prodi",
                    attributes: {
                      exclude: [
                        "kode_prodi",
                        "fakultas_id",
                        "createdAt",
                        "updatedAt",
                      ],
                    },
                  },
                  {
                    model: Role_user,
                    as: "role",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                  },
                  {
                    model: Fakultas,
                    as: "fakultas",
                    attributes: {
                      exclude: [
                        "jenjang",
                        "kode_fakultas",
                        "createdAt",
                        "updatedAt",
                      ],
                    },
                  },
                ],
              },
            ],
            order: [["id", "ASC"]],
          })
        );
      }
      res.send(
        await Daftar_surat.findAll({
          include: [
            {
              model: Users,
              as: "user",
              attributes: {
                exclude: [
                  "password",
                  "role_id",
                  "prodi_id",
                  "fakultas_id",
                  "createdAt",
                  "updatedAt",
                ],
              },
              include: [
                {
                  model: Prodi,
                  as: "prodi",
                  attributes: {
                    exclude: [
                      "kode_prodi",
                      "fakultas_id",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                },
                {
                  model: Role_user,
                  as: "role",
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                {
                  model: Fakultas,
                  as: "fakultas",
                  attributes: {
                    exclude: [
                      "jenjang",
                      "kode_fakultas",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                },
              ],
            },
          ],
          order: [["id", "ASC"]],
        })
      );
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
              // attributes: ["*"],
              attributes: {
                exclude: [
                  "password",
                  "role_id",
                  "prodi_id",
                  "fakultas_id",
                  "createdAt",
                  "updatedAt",
                ],
              },
              where: { prodi_id: prodi.id },
              // include: [
              //   {
              //     model: Prodi,
              //     as: "prodi",
              //     attributes: ["name"],
              //   },
              // ],
              include: [
                {
                  model: Prodi,
                  as: "prodi",
                  attributes: {
                    exclude: [
                      "kode_prodi",
                      "fakultas_id",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                },
                {
                  model: Role_user,
                  as: "role",
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                {
                  model: Fakultas,
                  as: "fakultas",
                  attributes: {
                    exclude: [
                      "jenjang",
                      "kode_fakultas",
                      "createdAt",
                      "updatedAt",
                    ],
                  },
                },
              ],
            },
          ],
        })
      );
    }
  })

  .put("/persetujuan", async (req, res) => {
    try {
      const { status, persetujuan } = req.body;
      const { id } = req.query;
      const user = await Users.findOne({
        where: { id: req.user.id },
      });
      const role = await Role_user.findOne({
        where: { id: user.role_id },
      });

      const surat = await Daftar_surat.findOne({
        where: { id: id },
      });

      if (!surat) {
        return res.status(StatusCodes.NOT_FOUND).json({
          error: "Daftar surat not found",
        });
      }

      const surat_per = await Daftar_surat.update(
        {
          persetujuan,
          status,
        },
        {
          where: { id: id },
          returning: true,
        }
      );

      res.status(StatusCodes.OK).json({ surat: surat_per });
    } catch (error) {
      console.error("Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
      });
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

// .get("/detail/persetujuan", async (req, res) => {
//   try {
//     const { daftar_surat_id, persetujuan } = req.body;
//     const user = await Users.findOne({
//       where: { id: req.user.id },
//     });
//     const role = await Role_user.findOne({
//       where: { id: user.role_id },
//     });

//     const isRead = persetujuan !== 'setuju'; // Set isRead to false when persetujuan is 'disetujui'
//     console.log('isRead:', isRead);
//     const statusArray = getStatus(role.id, isRead, persetujuan); // Pass isRead and persetujuan to getStatus
//     console.log('statusArray:', statusArray);
//     // isRead && statusArray.push('dibaca'); // Push 'dibaca' to statusArray when isRead is true
//     const status = statusArray.join(', ');

//     const surat = await Daftar_surat.findOne({
//       where: { id: daftar_surat_id },
//     });

//     if (!surat) {
//       return res.status(StatusCodes.NOT_FOUND).json({
//         error: "Daftar surat not found",
//       });
//     }

//     if (surat.persetujuan !== persetujuan) {
//       const [affectedRowsCount, affectedRows] = await Daftar_surat.update(
//         // console.log('isRead:', isRead),
//         {
//           dibaca: persetujuan === 'setuju' ? isRead : true,
//           persetujuan,
//           status,
//         },
//         {
//           where: { id: daftar_surat_id },
//           returning: true,
//         }
//       );

//       surat = affectedRows[0];
//     }

//     res.status(StatusCodes.OK).json({ surat: surat });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: "Internal Server Error",
//     });
//   }
// })

module.exports = app;
