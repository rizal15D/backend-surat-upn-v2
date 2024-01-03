const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { Users, Role_user, Prodi, Fakultas } = require("../../models");
const config = require("../../../config/config.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const environment = "development";
const secretKey = config[environment].secret_key;

// const register = async (req, res) => {
//   try {
//     const { name, email, password, role_id, prodi_id } = req.body;

//     const existingUser = await Users.findOne({ where: { email } });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ error: "User with this email already exists" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const role_user = await Role_user.findOne({
//       where: { id: role_id },
//     });
//     const prodi_user = await Prodi.findOne({
//       where: { id: prodi_id },
//     });
//     if (role_user.name === "Prodi" && prodi_user.name === "-") {
//       res.send("Please, Input the prodi Id");
//     }
//     // else {
//     //   res.send(`prodi Id =  ${prodi_user.name}`);
//     // }

//     if (!role_user) {
//       return res.status(400).json({ error: "No such role_user exists" });
//     }

//     const user = await Users.create({
//       name,
//       email,
//       password: hashedPassword,
//       role_id: role_user.id,
//       prodi_id: prodi_user.id,
//       aktif: 0,
//     });
//     const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
//     res
//       .status(StatusCodes.CREATED)
//       .json({ message: "User created successfully", token });
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: "Internal Server Error" });
//   }
// };

const register = async (req, res) => {
  try {
    const { name, email, role_id, prodi_id, fakultas_id } = req.body;

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

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
      .json({ message: "User created successfully", token, password }); // Return the password in the response
  } catch (error) {
    console.error("Error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
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
};

module.exports = { register, login };
