const express = require("express");
const bcrypt = require("bcrypt");
const { Users, Role_user } = require("../../models");

const app = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    const { name, email, password, confPassword, role_id } = req.body;

    if (!password || !confPassword) {
      return res
        .status(400)
        .json({ error: "Password and confirmation password are required" });
    }

    if (password !== confPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role_user = await Role_user.findOne({
      where: { id: role_id },
    });

    if (!role_user) {
      return res.status(400).json({ error: "No such role_user exists" });
    }

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      role_id: role_user.id,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
