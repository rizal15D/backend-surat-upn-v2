"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Departemen, { foreignKey: "role_id" });
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
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Role_user",
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
