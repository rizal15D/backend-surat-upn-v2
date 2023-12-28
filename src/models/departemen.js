"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Departemen extends Model {
    static associate(models) {
      Departemen.hasMany(models.Notifikasi, { foreignKey: "surat_id" });
    }
  }
  Departemen.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Departemen",
      tableName: "Departemens",
    }
  );
  return Departemen;
};
