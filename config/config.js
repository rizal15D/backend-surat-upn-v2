require("dotenv").config();

let stringPassword = String(process.env.POSTGRES_PASSWORD);

module.exports = {
  development: {
    url: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    // 'user': process.env.POSTGRES_USER,
    password: stringPassword,
    // 'database': process.env.POSTGRES_DATABASE,
    // "username": process.env.DB_USERNAME,
    // "password": process.env.DB_PASSWORD,
    // "database": process.env.DB_NAME,
    // "host": process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    secret_key: process.env.SECRET_KEY,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    url: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    // 'user': process.env.POSTGRES_USER,
    password: stringPassword,
    // 'database': process.env.POSTGRES_DATABASE,
    // "username": process.env.DB_USERNAME,
    // "password": process.env.DB_PASSWORD,
    // "database": process.env.DB_NAME,
    // "host": process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    secret_key: process.env.SECRET_KEY,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    url: process.env.POSTGRES_URL,
    host: process.env.POSTGRES_HOST,
    // 'user': process.env.POSTGRES_USER,
    password: stringPassword,
    // 'database': process.env.POSTGRES_DATABASE,
    // "username": process.env.DB_USERNAME,
    // "password": process.env.DB_PASSWORD,
    // "database": process.env.DB_NAME,
    // "host": process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    secret_key: process.env.SECRET_KEY,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
