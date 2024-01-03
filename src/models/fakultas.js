"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Fakultas extends Model {
    static associate(models) {
      Fakultas.hasMany(models.Prodi, { foreignKey: "fakultas_id" });
      Fakultas.hasMany(models.Nomor_surat, { foreignKey: "fakultas_id" });
    }
  }
  Fakultas.init(
    {
      name: DataTypes.STRING,
      jenjang: DataTypes.STRING,
      kode_fakultas: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Fakultas",
    }
  );
  return Fakultas;
};
