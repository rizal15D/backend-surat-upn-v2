"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Template_surat extends Model {
    static associate(models) {
      Template_surat.hasMany(models.Daftar_surat, {
        foreignKey: "template_surat_id",
      });
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
