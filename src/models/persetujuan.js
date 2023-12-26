"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Persetujuan extends Model {
    static associate(models) {}
  }
  Persetujuan.init(
    {
      keputusan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Persetujuan",
    }
  );
  return Persetujuan;
};
