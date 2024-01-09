"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Komentar extends Model {
    static associate(models) {
      Komentar.belongsTo(models.Role_user, { foreignKey: "role_id" });
      Komentar.hasMany(models.Daftar_surat, {
        foreignKey: "komentar_id",
      });
    }
  }
  Komentar.init(
    {
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
      komentar: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Komentar",
    }
  );
  return Komentar;
};
