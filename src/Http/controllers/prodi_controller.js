const express = require("express");
const { Prodi, Fakultas } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const app = express.Router();
const isAdmin = require("../middleware/adminMiddleware");
const { Op } = require("sequelize");

app
  .get("/", async function (req, res) {
    res.send(
      await Prodi.findAll({
        where: {
          id: {
            [Op.ne]: 1, // Menghindari data dengan id 1
          },
        },
      })
    );
  })

  .post("/", isAdmin, async function (req, res) {
    const { name, kode_prodi, fakultas_id } = req.body;
    try {
      const fakultas_name = await Fakultas.findOne({
        where: { id: fakultas_id },
      });

      if (!fakultas_name) {
        res.send("fakultas_id not found");
      }

      const prodi = await Prodi.create({
        id: latestProdiId + 1,
        name,
        kode_prodi,
        fakultas_id,
      });

      res.status(StatusCodes.CREATED).json({
        message: `${prodi.name}, ${prodi.kode_prodi}, ${prodi.fakultas_id} created successfully`,
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
      const { name, kode_prodi, fakultas_id } = req.body;
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Invalid params" });
      }

      const prodi = await Prodi.findOne({ where: { id: id } });

      if (!prodi) {
        return res.status(404).json({ error: "Prodi not found" });
      }

      prodi.name = name;
      prodi.kode_prodi = kode_prodi;
      prodi.fakultas_id = fakultas_id;

      await prodi.save();

      res.json({
        updated: prodi.name,
        kode_prodi,
        fakultas_id,
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

      const deletedProdi = await Prodi.destroy({
        where: { id: id },
      });

      if (deletedProdi) {
        res.status(200).json({ message: "Prodi deleted successfully" });
      } else {
        res.status(404).json({ error: "Prodi not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = app;
