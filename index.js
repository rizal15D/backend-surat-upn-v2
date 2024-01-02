const express = require("express");
const app = express();
require("dotenv").config();
require("pg");
const router = require("./src/routes/index.js");

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
