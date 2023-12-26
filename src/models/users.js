"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Departemens, { foreignKey: "department_id" });
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
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Departemens",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
