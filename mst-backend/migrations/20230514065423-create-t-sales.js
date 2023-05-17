'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kode: {
        type: Sequelize.STRING(15),
        allowNull:false,
        unique:true
      },
      tgl: {
        type: Sequelize.DATE,
        allowNull:false
      },
      jumlah_barang: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      cust_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'m_customer',
          key:'id'
        },
        onDelete:'cascade',
        onUpdate:'cascade',
        allowNull:false
      },
      subtotal: {
        type: Sequelize.DECIMAL(15,2)
      },
      diskon: {
        type: Sequelize.DECIMAL(15,2)
      },
      ongkir: {
        type: Sequelize.DECIMAL(15,2)
      },
      total_bayar: {
        type: Sequelize.DECIMAL(15,2)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('t_sales');
  }
};