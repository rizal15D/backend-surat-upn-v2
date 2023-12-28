const express = require("express");
const bcrypt = require("bcrypt");
const { Users, Departemen } = require("../../models");

const app = express.Router();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.post("/", async (req, res) => {
//   try {
//     const { name, email, password, confPassword, departemen_id } = req.body;

//     // Check if password and confPassword match
//     if (password !== confPassword) {
//       return res.status(400).json({ error: "Passwords do not match" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Find the department with the given id
//     const department = await Departemen.findOne({
//       where: { id: departemen_id },
//     });

//     // If no such department exists, return an error
//     if (!department) {
//       return res.status(400).json({ error: "No such department exists" });
//     }

//     const user = await Users.create({
//       name,
//       email,
//       password: hashedPassword,
//       departemen_id: department.id, // Use the id of the found department
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.post("/", async (req, res) => {
  try {
    const { name, email, password, confPassword, departemen_id } = req.body;

    // Check if password and confPassword are provided
    if (!password || !confPassword) {
      return res.status(400).json({ error: "Password and confirmation password are required" });
    }

    // Check if password and confPassword match
    if (password !== confPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the department with the given id
    const department = await Departemen.findOne({
      where: { id: departemen_id },
    });

    // If no such department exists, return an error
    if (!department) {
      return res.status(400).json({ error: "No such department exists" });
    }

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      departemen_id: department.id, // Use the id of the found department
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
