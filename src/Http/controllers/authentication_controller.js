const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { Users, Role_user, Prodi, Fakultas } = require("../../models");
const config = require("../../../config/config.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const isAdmin = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware.js");
const express = require("express");
const app = express.Router();

const environment = "development";
const secretKey = config[environment].secret_key;

app
  .post("/register", authMiddleware, isAdmin, async (req, res) => {
    try {
      const { name, email, role_id, prodi_id, fakultas_id } = req.body;

      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      const latestUser = await Users.findAll({
        limit: 1,
        order: [["id", "DESC"]],
      });
      const latestUserId = parseInt(latestUser[0].id, 10);

      // Generate a random password
      const password = crypto.randomBytes(10).toString("hex");
      const hashedPassword = await bcrypt.hash(password, 10);
      const role_user = await Role_user.findOne({
        where: { id: role_id },
      });
      const prodi_user = await Prodi.findOne({
        where: { id: prodi_id },
        attributes: [
          "id",
          "name",
          "kode_prodi",
          "fakultas_id",
          "createdAt",
          "updatedAt",
        ],
      });
      if (role_user.name === "Prodi" && prodi_user.name === "-") {
        res.send("Please, Input the prodi Id");
      }

      if (!role_user) {
        return res.status(400).json({ error: "No such role_user exists" });
      }

      const user = await Users.create({
        id: latestUserId + 1,
        name,
        email,
        password: hashedPassword,
        role_id: role_user.id,
        prodi_id: prodi_user.id,
        fakultas_id,
        aktif: true,
      });
      const token = jwt.sign({ id: user.id, aktif: user.aktif }, secretKey, {
        expiresIn: "2h",
      });
      res
        .status(StatusCodes.CREATED)
        .json({ message: "User created successfully", token, password });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  })

  .post("/login", async (req, res) => {
    try {
      const user = await Users.findOne({ where: { email: req.body.email } });
      if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = jwt.sign({ id: user.id, aktif: user.aktif }, secretKey, {
          expiresIn: "1h",
        });
        res.json({
          message: "Login Berhasil",
          token,
          user: {
            id: user.id,
            name: user.name,
            role_id: user.role_id,
            prodi_id: user.prodi_id,
          },
        });
      } else {
        res.status(401).json({ error: "Invalid login credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .put("/reset-password", authMiddleware, isAdmin, async (req, res) => {
    try {
      const { id } = req.query;
      if (id == 1) {
        res.json("Error : The User is Admin");
      }
      const password = crypto.randomBytes(10).toString("hex");
      const hashedPassword = await bcrypt.hash(password, 10);
      const [updated] = await Users.update(
        { password: hashedPassword },
        {
          where: { id: id },
        }
      );

      if (updated) {
        res.json({ message: "Password reset successfully", password });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .put("/aktivasi", authMiddleware, isAdmin, async (req, res) => {
    try {
      const { id, aktif } = req.body;
      if (id == 1) {
        return res.json("Error : The User is Admin");
      }
      const [updated] = await Users.update(
        { aktif },
        {
          where: { id: id },
        }
      );

      if (updated) {
        const message = aktif
          ? "User activated successfully"
          : "User deactivated successfully";
        res.json({ message });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = app;
