'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class t_sales_det extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  t_sales_det.init({
    kode_transaksi: DataTypes.STRING,
    kode_barang: DataTypes.STRING,
    harga_bandrol: DataTypes.DECIMAL,
    qty: DataTypes.INTEGER,
    diskon_pct: DataTypes.DECIMAL,
    diskon_nilai: DataTypes.DECIMAL,
    harga_diskon: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    freezeTableName: true,
    timestamps:false,
    modelName: 't_sales_det',
  });
  return t_sales_det;
};