const express = require("express");
const { Users } = require("../../models/users");

const app = express.Router();
// Get all users
app
  .get("/", async (req, res) => {
    try {
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  // Get a single user by ID
  .get("/:id", async (req, res) => {
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
  })

  // Update a user by ID
  .put("/:id", async (req, res) => {
    try {
      const [updated] = await Users.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedUser = await Users.findByPk(req.params.id);
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  // Delete a user by ID
  .delete("/:id", async (req, res) => {
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
