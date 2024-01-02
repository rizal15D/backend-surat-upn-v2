"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Prodis",
      [
        {
          name: "-",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
          name: "IF",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "SD",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MTI",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Prodis", null, {});
  },
};
