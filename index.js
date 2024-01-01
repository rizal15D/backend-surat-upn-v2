const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;
const router = require("./src/routes/index.js");

const { Sequelize } = require('sequelize');

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

sequelize.authenticate()
  .then(() => {
    console.log("Connected to postgres database!");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});