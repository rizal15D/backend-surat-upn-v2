"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Komentar extends Model {
    static associate(models) {
      Komentar.belongsTo(models.Daftar_surat, { foreignKey: "surat_id" });
      Komentar.belongsTo(models.Departemen, { foreignKey: "departemen_id" });
    }
  }
  Komentar.init(
    {
      surat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Daftar_surat",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
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
      komentar: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Komentar",
    }
  );
  return Komentar;
};
