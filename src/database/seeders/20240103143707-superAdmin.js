"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users", // kenek cache posgre, dadi 6 saiki info hapus chace
      [
        //okeeh tak gelek
        {
          id: 1,
          name: "Super Admin",
          email: "admin",
          password: "admin",
          role_id: 1,
          prodi_id: 1,
          fakultas_id: 1,
          aktif: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
