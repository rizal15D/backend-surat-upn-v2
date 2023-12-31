"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Persetujuans",
      [
        {
          keputusan: "Disetujui TU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          keputusan: "Ditolak TU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          keputusan: "Disetujui Dekan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          keputusan: "Ditolak Dekan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          keputusan: "Null",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Persetujuans", null, {});
  },
};
