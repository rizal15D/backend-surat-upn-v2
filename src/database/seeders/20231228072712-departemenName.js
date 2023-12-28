"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Departemens",
      [
        {
          name: "SI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kepala TU",
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
        // add more departments as needed
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Departemens", null, {});
  },
};
