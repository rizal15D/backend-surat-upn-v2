"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Role_user, { foreignKey: "role_id" });
      Users.belongsTo(models.Prodi, { foreignKey: "prodi_id" });
      Users.belongsTo(models.Fakultas, { foreignKey: "fakultas_id" });
      Users.hasMany(models.Daftar_surat, { foreignKey: "user_id" });
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
      prodi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Prodi",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      fakultas_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Fakultas",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      aktif: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
