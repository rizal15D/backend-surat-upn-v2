const express = require("express");
const { Komentar, Role_user } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const app = express.Router();

app
  .get("/", async function (req, res) {
    res.send(await Komentar.findAll());
  })

  .get("/", async function (req, res) {
    try {
      const komen = await Komentar.findOne({
        where: { id: req.query.id },
      });
    } catch (error) {}
  })

  .post("/", async function (req, res) {
    try {
      const { role_id, komentar } = req.body;

      const role_user = await Role_user.findOne({ where: { id: role_id } });

      const komen = await Komentar.create({
        role_id: role_user.id,
        komentar,
      });
      res.json("Berhasil");
    } catch (error) {
      console.log("error:", error);
    }
  });

module.exports = app;
