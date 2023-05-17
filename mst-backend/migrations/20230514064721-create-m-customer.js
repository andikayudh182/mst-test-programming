'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_customer', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode: {
        type: Sequelize.STRING(10),
        unique:true,
        allowNull:false
      },
      nama: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      telp: {
        type: Sequelize.STRING(20),
        allowNull:false,
        unique:true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('m_customer');
  }
};