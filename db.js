const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
        max: 10, // Increase this number
        idle: 30000, // Increase this number
        acquire: 60000, // Increase this number
      },
  });
  // console.log(process.env.POSTGRES_URL);
  sequelize.authenticate()
    .then(() => {
      console.log("Connected to postgres database!");
    });

module.exports = sequelize;
