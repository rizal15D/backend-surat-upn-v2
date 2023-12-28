"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Departemen, { foreignKey: "departemen_id" });
    }
  }
  Users.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      departemen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Departemen",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      remember_token: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
