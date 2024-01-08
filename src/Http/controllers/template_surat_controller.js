const uploadByMulter = require("../controllers/template_surat_controller/multer_controller");
const cloudinaryController = require("../controllers/template_surat_controller/cloudinary_controller.js");
const express = require("express");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { Template_surat } = require("../../models");
// const isAdmin = require("../middleware/adminMiddleware");
const app = express.Router();

app
  // .get("/download", async function (req, res) {
  //   const { id } = req.query;
  //   if (!id) {
  //     return res.status(400).json({ error: "Invalid params" });
  //   }

  //   const template_surat = await Template_surat.findOne({ where: { id: id } });

  //   if (!template_surat) {
  //     return res.status(404).json({ error: "Template Surat not found" });
  //   }
  //   res.download(path.join(template_surat.lokasi, template_surat.judul));
  // })

  .get("/", async function (req, res) {
    res.send(
      await Template_surat.findAll({
        order: [["id", "ASC"]],
      })
    );
  })

  // .use("/uploads/", uploadByMulter)
  .use(cloudinaryController)

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
