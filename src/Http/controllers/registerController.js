const express = require("express");
const bcrypt = require("bcrypt");
const { Users, Departemen } = require("../../models");

const app = express.Router();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.post("/", async (req, res) => {
//   try {
//     const { name, email, password, departemen_id } = req.body;
//     res.send({ name, email, password, departemen_id });

//     // Check if all required fields are provided
//     if (!name || !email || !password || !departemen_id) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await Users.create({
//       name,
//       email,
//       password: hashedPassword,
//       departemen_id,
//     });

//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Find the department with the given id
    const department = await Departemen.findOne({
      where: { id: req.body.departemen_id },
    });

    // If no such department exists, return an error
    if (!department) {
      return res.status(400).json({ error: "No such department exists" });
    }

    const user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      departemen_id: department.id, // Use the id of the found department
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
