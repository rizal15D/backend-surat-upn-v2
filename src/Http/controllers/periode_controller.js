const express = require("express");
const { Periode, Prodi } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const isAdmin = require("./../middleware/adminMiddleware");
const app = express.Router();

app
  .get("/", async function (req, res) {
    res.send(await Periode.findAll({ order: [["id", "ASC"]] }));
  })
  .post("/", isAdmin, async function (req, res) {
    const { tahun, semester, prodi_id } = req.body;
    try {
      const prodi_periode = Prodi.findOne({ where: { id: prodi_id } });
      if (!prodi_periode) {
        res.json("Prodi not found");
      }
      const periode = await Periode.create({
        tahun,
        semester,
        prodi_id,
        status: true,
      });
      res.status(StatusCodes.CREATED).json({
        message: `created successfully`,
        periode,
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
      const { tahun, status, semester, prodi_id } = req.body;
      const { id } = req.query;
      if (!id) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Invalid params" });
      }

      const data_periode = await Periode.findOne({ where: { id: id } });

      if (!data_periode) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Periode not found" });
      }

      // periode.tahun = tahun;
      // periode.semester = semester;
      // periode.prodi_id = prodi_id;
      // periode.status = status;

      // await periode.save();

      const periode = await Periode.update(
        {
          tahun,
          semester,
          prodi_id,
          status,
        },
        {
          where: { id: id }, // Gantilah dengan kriteria yang sesuai
          returning: true, // Menambahkan opsi returning
        }
      );

      res.json({
        updated: periode,
      });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  })

  .delete("/", isAdmin, async (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: "Parameter id is required" });
      }

      const deletedPeriode = await Periode.destroy({
        where: { id: id },
      });

      if (deletedPeriode) {
        res.status(OK).json({ message: "Periode deleted successfully" });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ error: "Periode not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  });

module.exports = app;
