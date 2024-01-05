"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Daftar_surats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pin: {
        type: Sequelize.BOOLEAN,
      },
      dibaca: {
        type: Sequelize.BOOLEAN,
      },
      judul: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      jenis: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      tanggal: {
        type: Sequelize.DATE,
      },
      lokasi_surat: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      persetujuan: {
        type: Sequelize.STRING,
      },
      komentar_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Komentars",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Daftar_surats");
  },
};
