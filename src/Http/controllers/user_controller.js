const express = require("express");
const { Users } = require("../../models");
const isAdmin = require("../middleware/adminMiddleware");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const app = express.Router();

app.get("/", isAdmin, async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: error.message });
  }
});

// app.get("/", async (req, res) => {
//   try {
//     const user = await Users.findByPk(req.query.id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.put("/", async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const [updated] = await Users.update(
      { password: hashedPassword },
      {
        where: { id: req.user.id },
      }
    );

    if (updated) {
      res.json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/", isAdmin, async (req, res) => {
  try {
    const deleted = await Users.destroy({
      where: { id: req.query.id },
    });
    if (deleted) {
      res.status(200).json("User deleted");
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
