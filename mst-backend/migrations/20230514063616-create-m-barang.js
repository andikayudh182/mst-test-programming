'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_barang', {
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
        allowNull:false,
      },
      harga: {
        type: Sequelize.DECIMAL(10,2),
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('m_barang');
  }
};