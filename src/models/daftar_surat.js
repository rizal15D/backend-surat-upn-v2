"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Daftar_surat extends Model {
    static associate(models) {
      Daftar_surat.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
      });
      Daftar_surat.belongsTo(models.Komentar, { foreignKey: "komentar_id" });
      Daftar_surat.hasMany(models.Notifikasi, { foreignKey: "surat_id" });
      Daftar_surat.hasMany(models.Nomor_surat, { foreignKey: "surat_id" });
    }
  }
  Daftar_surat.init(
    {
      pin: DataTypes.BOOLEAN,
      dibaca: DataTypes.BOOLEAN,
      judul: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      jenis: DataTypes.STRING,
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
      lokasi_surat: DataTypes.STRING,
      status: DataTypes.STRING,
      persetujuan: DataTypes.STRING,
      komentar_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Komentar",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Daftar_surat",
    }
  );
  return Daftar_surat;
};
