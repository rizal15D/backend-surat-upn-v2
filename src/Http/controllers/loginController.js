const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const config = require('../../../config/config.json');

const app = express.Router();

app.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user.id }, config.secret_key, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid login credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;