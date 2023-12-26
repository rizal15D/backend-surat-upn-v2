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
      template_surat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Template_surats",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Status",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      lokasi_surat: {
        type: Sequelize.STRING,
      },
      persetujuan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Persetujuans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      komentar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
