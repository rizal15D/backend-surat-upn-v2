const express = require("express");
const { Periode, Prodi } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const isAdmin = require("./../middleware/adminMiddleware");
const app = express.Router();

app
  .get("/", async function (req, res) {
    res.send(await Periode.findAll());
  })
  .post("/", isAdmin, async function (req, res) {
    const { tahun, semester } = req.body;
    try {
      const prodi_id = Prodi.findOne({ where: { id: prodi_id } });
      if (prodi_id) {
        res.send("Prodi not found");
      }
      const periode = await Periode.create({
        tahun,
        semester,
        prodi_id,
        status: true,
      });
      res.status(StatusCodes.CREATED).json({
        message: `${
          (periode.tahun, periode.semester, periode.prodi_id, periode.status)
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
      const { tahun, status, semester } = req.body;
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Invalid params" });
      }

      const periode = await Periode.findOne({ where: { id: id } });

      if (!periode) {
        return res.status(404).json({ error: "Prodi not found" });
      }

      periode.tahun = tahun;
      periode.semester = semester;
      periode.prodi_id = prodi_id;
      periode.status = status;

      await periode.save();

      res.json({
        updated: periode.tahun,
        semester,
        prodi_id,
        status,
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

      const deletedPeriode = await Periode.destroy({
        where: { id: id },
      });

      if (deletedPeriode) {
        res.status(200).json({ message: "Periode deleted successfully" });
      } else {
        res.status(404).json({ error: "Periode not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = app;
