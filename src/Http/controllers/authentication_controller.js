const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { Users, Role_user } = require("../../models");
const config = require("../../../config/config.json");
const jwt = require("jsonwebtoken");

const environment = "development";
const secretKey = config[environment].secret_key;

const register = async (req, res) => {
  try {
    const { name, email, password, role_id } = req.body;
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
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", token });
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
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
      res.json({
        message: "Login Berhasil",
        token,
        user: {
          id: user.id,
          email: user.email,
          password: user.password,
          role_id: user.role_id,
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
