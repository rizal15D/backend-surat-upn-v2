"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class template_surat extends Model {
    static associate(models) {
      // define association here
    }
  }
  Template_surat.init(
    {
      judul: DataTypes.STRING,
      lokasi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Template_surat",
    }
  );
  return Template_surat;
};
