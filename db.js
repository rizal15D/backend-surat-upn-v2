// const { Sequelize } = require('sequelize');
// require("dotenv").config();

// const sequelize = new Sequelize(process.env.POSTGRES_URL, {
//     dialect: 'postgres',
//     dialectModule: require('pg'),
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   });
//   // console.log(process.env.POSTGRES_URL);
//   sequelize.authenticate()
//     .then(() => {
//       console.log("Connected to postgres database!");
//     });

// module.exports = sequelize;

const pg = require('pg');

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

module.exports = pool;
