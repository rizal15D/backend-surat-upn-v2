const express = require("express");
const app = express();
// const port = 3000;
require("dotenv").config();
const router = require("./src/routes/index.js");
require('./db.js');

app.use(express.json());
app.use(router);


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});