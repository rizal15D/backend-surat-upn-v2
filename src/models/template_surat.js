"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Template_surat extends Model {
    static associate(models) {}
  }
  Template_surat.init(
    {
      judul: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      jenis: DataTypes.STRING,
      thumnail: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Template_surat",
    }
  );
  return Template_surat;
};
