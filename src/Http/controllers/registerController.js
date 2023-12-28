const express = require("express");
const bcrypt = require("bcrypt");
const { Users } = require("../../models");

const app = express.Router();

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      departemen_id: req.body.departemen_id
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;