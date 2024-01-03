"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Periode extends Model {
    static associate(models) {
      Periode.belongsTo(models.Prodi, { foreignKey: "prodi_id" });
    }
  }
  Periode.init(
    {
      tahun: DataTypes.DATE,
      semester: DataTypes.STRING,
      prodi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Prodis",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Periode",
    }
  );
  return Periode;
};
