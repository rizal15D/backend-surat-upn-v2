"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Notifikasi extends Model {
    static associate(models) {
      Notifikasi.belongsTo(models.Daftar_surat, { foreignKey: "surat_id" });
      Notifikasi.belongsTo(models.Departemens, {
        foreignKey: "departemen_id_dari",
      });
      Notifikasi.belongsTo(models.Departemens, {
        foreignKey: "departemen_id_ke",
      });
    }
  }
  Notifikasi.init(
    {
      surat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Daftar_surats",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      departemen_id_dari: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Departemens",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      departemen_id_ke: {
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
      modelName: "Notifikasi",
    }
  );
  return Notifikasi;
};
