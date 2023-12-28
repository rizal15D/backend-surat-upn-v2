"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Daftar_surat extends Model {
    static associate(models) {
      Daftar_surat.belongsTo(models.Template_surat, { foreignKey: "template_surat_id" });
      Daftar_surat.belongsTo(models.Users, { foreignKey: "user_id" });
      Daftar_surat.belongsTo(models.Status, { foreignKey: "status_id" });
      Daftar_surat.belongsTo(models.Persetujuan, { foreignKey: "persetujuan_id" });
      Daftar_surat.hasMany(models.Komentar, { foreignKey: "surat_id" });
    }
  }
  Daftar_surat.init(
    {
      pin: DataTypes.BOOLEAN,
      dibaca: DataTypes.BOOLEAN,
      template_surat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Template_surat",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      tanggal: DataTypes.DATE,
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Status",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      lokasi_surat: DataTypes.STRING,
      persetujuan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Persetujuan",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      // komentar_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Komentars",
      //     key: "id",
      //   },
      //   onUpdate: "CASCADE",
      //   onDelete: "SET NULL",
      // },
    },
    {
      sequelize,
      modelName: "Daftar_surat",
    }
  );
  return Daftar_surat;
};
