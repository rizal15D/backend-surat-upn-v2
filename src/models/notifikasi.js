"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    static associate(models) {
      Notifikasi.belongsTo(models.Daftar_surat, { foreignKey: "surat_id" });
      Notifikasi.belongsTo(models.Role_user, {
        foreignKey: "role_id_dari",
      });
      Notifikasi.belongsTo(models.Role_user, {
        foreignKey: "role_id_ke",
      });
    }
  }
  Notifikasi.init(
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
      role_id_dari: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Role_user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      role_id_ke: {
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
      modelName: "Notifikasi",
      // tableName: "Notifikasis",
    }
  );
  return Notifikasi;
};
