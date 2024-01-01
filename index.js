const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const router = require("./src/routes/index.js");
// const path = require('path');
const { Sequelize } = require('sequelize');
// require('./secret.js');

// const { Umzug, SequelizeStorage } = require('umzug');

app.use(express.json());
app.use(router);

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectModule: require('pg'),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
// console.log(process.env.POSTGRES_URL);
sequelize.authenticate()
  .then(() => {
    console.log("Connected to postgres database!");
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});