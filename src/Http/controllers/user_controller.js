const express = require("express");
const { Users } = require("../../models");
const isAdmin = require("../middleware/adminMiddleware");
const bcrypt = require("bcrypt");

const app = express.Router();

app.get("/", isAdmin, async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/:id", isAdmin, async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const [updated] = await Users.update(
      { name, email, password: hashedPassword, role_id },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedUser = await Users.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deleted = await Users.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send("User deleted");
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
