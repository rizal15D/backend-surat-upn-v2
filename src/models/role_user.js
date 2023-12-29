"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Role_user extends Model {
    static associate(models) {
      Role_user.hasMany(models.Notifikasi, { foreignKey: "surat_id" });
    }
  }
  Role_user.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Role_user",
      tableName: "Role_users",
    }
  );
  return Role_user;
};
