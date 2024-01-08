require("dotenv").config();

let stringPassword = String(process.env.POSTGRES_PASSWORD);
let stringUser = String(process.env.POSTGRES_USER);

module.exports = {
  development: {
<<<<<<< HEAD
    // url: `postgres://${stringUser}:${stringPassword}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`,
    // host: process.env.POSTGRES_HOST,
    // username: stringUser,
    // password: stringPassword,
    // database: process.env.POSTGRES_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
=======
    url: `postgres://${stringUser}:${stringPassword}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`,
    host: process.env.POSTGRES_HOST,
    username: stringUser,
    password: stringPassword,
    database: process.env.POSTGRES_DATABASE,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
>>>>>>> deploy
    dialect: process.env.DB_DIALECT,
    secret_key: process.env.SECRET_KEY,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  test: {
<<<<<<< HEAD
    // url: `postgres://${stringUser}:${stringPassword}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`,
    // host: process.env.POSTGRES_HOST,
    // username: stringUser,
    // password: stringPassword,
    // database: process.env.POSTGRES_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
=======
    url: `postgres://${stringUser}:${stringPassword}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`,
    host: process.env.POSTGRES_HOST,
    username: stringUser,
    password: stringPassword,
    database: process.env.POSTGRES_DATABASE,
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOST,
>>>>>>> deploy
    dialect: process.env.DB_DIALECT,
    secret_key: process.env.SECRET_KEY,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
  production: {
<<<<<<< HEAD
    // url: `postgres://${stringUser}:${stringPassword}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`,
    // host: process.env.POSTGRES_HOST,
    // username: stringUser,
    // password: stringPassword,
    // database: process.env.POSTGRES_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
=======
    url: `postgres://${stringUser}:${stringPassword}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}`,
    host: process.env.POSTGRES_HOST,
    username: stringUser,
    password: stringPassword,
    database: process.env.POSTGRES_DATABASE,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
>>>>>>> deploy
    dialect: process.env.DB_DIALECT,
    secret_key: process.env.SECRET_KEY,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  },
};
