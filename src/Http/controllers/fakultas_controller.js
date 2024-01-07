const express = require("express");
const { Fakultas } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const isAdmin = require("../middleware/adminMiddleware");
const app = express.Router();

app
  .get("/", async function (req, res) {
    res.send(await Fakultas.findAll());
  })
  .post("/", isAdmin, async function (req, res) {
    const { name, jenjang, kode_fakultas } = req.body;

    try {
      const fakultas = await Fakultas.create({
        name,
        jenjang,
        kode_fakultas,
      });
      res.status(StatusCodes.CREATED).json({
        message: `${
          (fakultas.name, fakultas.jenjang, fakultas.kode_fakultas)
        } created successfully`,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        message: error.message,
      });
    }
  })
  .put("/", isAdmin, async (req, res) => {
    try {
      const { nama, jenjang, kode_fakultas } = req.body;
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Invalid params" });
      }

      const fakultas = await Fakultas.findOne({ where: { id: id } });

      if (!fakultas) {
        return res.status(404).json({ error: "Fakultas not found" });
      }

      fakultas.name = nama;
      fakultas.jenjang = jenjang;
      fakultas.kode_fakultas = kode_fakultas;

      await fakultas.save();

      res.json({
        updated: fakultas.name,
        jenjang,
        kode_fakultas,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  .delete("/", isAdmin, async (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Parameter id is required" });
      }

      const deletedFakultas = await Fakultas.destroy({
        where: { id: id },
      });

      if (deletedFakultas) {
        res.status(200).json({ message: "Fakultas deleted successfully" });
      } else {
        res.status(404).json({ error: "Fakultas not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = app;
