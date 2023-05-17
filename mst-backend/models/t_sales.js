'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  t_sales.init({
    kode: DataTypes.STRING,
    tgl: DataTypes.DATE,
    cust_id: DataTypes.INTEGER,
    jumlah_barang: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    diskon: DataTypes.DECIMAL,
    ongkir: DataTypes.DECIMAL,
    total_bayar: DataTypes.DECIMAL
  }, {
    sequelize,
    freezeTableName:true,
    timestamps:false,
    modelName: 't_sales',
  });
  return t_sales;
};