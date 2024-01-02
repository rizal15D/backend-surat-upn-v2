"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Prodi extends Model {
    static associate(models) {
      Prodi.hasMany(models.Users, { foreignKey: "prodi_id" });
    }
  }
  Prodi.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Prodi",
    }
  );
  return Prodi;
};
