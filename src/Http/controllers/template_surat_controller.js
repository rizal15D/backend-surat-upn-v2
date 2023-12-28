const express = require("express");
const app = express.Router();

app
  .get("/", function (req, res) {
    res.send("get hello world2");
  })
  .post("/", function (req, res) {
    res.send("post hello world2");
  })
  .put("/:id", (req, res) => {
    const id = req.params.id;
    res.send("put hello world2");
  })
  .delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send("delete hello world2");
  });

module.exports = app;
