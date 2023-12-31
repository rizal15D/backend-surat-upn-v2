"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Status",
      [
        {
          status: "Disetujui TU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "Ditolak TU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "Disetujui Dekan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "Ditolak Dekan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "Di daftar tunggu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "Dibaca TU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: "Dibaca Dekan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Status", null, {});
  },
};
