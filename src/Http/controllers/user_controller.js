const express = require("express");
const { Users } = require("../../models");
const isAdmin = require("../middleware/adminMiddleware");
const bcrypt = require("bcryptjs");

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

// app.get("/:id", async (req, res) => {
//   try {
//     const user = await Users.findByPk(req.params.id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.put("/", isAdmin, async (req, res) => {
  console.log(req.query);
  try {
    const { name, email, role_id, prodi_id, aktif } = req.body;
    // let hashedPassword;
    // if (password) {
    //   hashedPassword = await bcrypt.hash(password, 10);
    // }
    const [updated] = await Users.update(
      { name, email, role_id, prodi_id, aktif },
      {
        where: { id: req.query.id },
      }
    );
    if (updated) {
      const updatedUser = await Users.findByPk(req.query.id, {
        attributes: { exclude: ["password"] },
      });
      res.json(updatedUser);
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
