const express = require("express");
const { Role_user } = require("../../models");
const { StatusCodes } = require("http-status-codes");
const isAdmin = require("../middleware/adminMiddleware");
const app = express.Router();

app
  .get("/", async function (req, res) {
    res.send(await Role_user.findAll(
      {order: [["id", "ASC"]]}
    ));
  })
  .post("/", isAdmin, async function (req, res) {
    const { name } = req.body;
    try {
      const latestRole = await Role_user.findAll({
        limit: 1,
        order: [["id", "DESC"]],
      });

      const latestRoleId = parseInt(latestRole[0].id, 10);

      const role_user = await Role_user.create({
        id: latestRoleId + 1,
        name,
      });
      res
        .status(StatusCodes.CREATED)
        .json({ message: `${role_user.name} created successfully` });
    } catch (error) {
      console.error("Error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        message: error.message,
      });
    }
  })
  .put("/", isAdmin, async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Invalid params" });
      }

      const role = await Role_user.findOne({ where: { id: id } });

      if (!role) {
        return res.status(404).json({ error: "Role not found" });
      }

      role.name = name;
      await role.save();

      res.json({ updatedName: role.name + "success update" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  .delete("/", isAdmin, async (req, res) => {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Parameter 'id' is required" });
      }

      const deletedRole = await Role_user.destroy({
        where: { id: id },
      });

      if (deletedRole) {
        res.status(200).json({ message: "Role deleted successfully" });
      } else {
        res.status(404).json({ error: "Role not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = app;
