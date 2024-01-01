require('dotenv').config();

module.exports = {
    "development": {
        "url": process.env.POSTGRES_URL,
        "dialect": process.env.DB_DIALECT,
        "secret_key": process.env.SECRET_KEY,
        "dialectOptions": {
            "ssl": {
            "require": true,
            "rejectUnauthorized": false
            }
        }
    },
  "test": {
    "url": process.env.POSTGRES_URL,
    "dialect": process.env.DB_DIALECT,
    "secret_key": process.env.SECRET_KEY,
    "dialectOptions": {
        "ssl": {
        "require": true,
        "rejectUnauthorized": false
        }
    }
  },
  "production": {
    "url": process.env.POSTGRES_URL,
    "dialect": process.env.DB_DIALECT,
    "secret_key": process.env.SECRET_KEY,
    "dialectOptions": {
        "ssl": {
        "require": true,
        "rejectUnauthorized": false
        }
    }
  }
}