"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {}
  }
  Status.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Status",
      tableName: "Status",
      freezeTableName: true,
    }
  );
  return Status;
};
