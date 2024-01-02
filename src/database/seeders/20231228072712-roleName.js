"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Role_users",
      [
        {
          name: "Prodi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dekan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin Dekan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Admin Master",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // add more departments as needed
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Role_users", null, {});
  },
};
