'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_sales_det', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode_transaksi: {
        type: Sequelize.STRING,
        references:{
          model:'t_sales',
          key:'kode'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
        allowNull:false
      },
      kode_barang: {
        type: Sequelize.STRING,
        references:{
          model:'m_barang',
          key:'kode'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
        allowNull:false
      },
      harga_bandrol: {
        type: Sequelize.DECIMAL
      },
      qty: {
        type: Sequelize.INTEGER
      },
      diskon_pct: {
        type: Sequelize.DECIMAL(15,2)
      },
      diskon_nilai: {
        type: Sequelize.DECIMAL(15,2)
      },
      harga_diskon: {
        type: Sequelize.DECIMAL(15,2)
      },
      total: {
        type: Sequelize.DECIMAL(15,2)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('t_sales_det');
  }
};