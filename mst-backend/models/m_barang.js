'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_barang.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    kode:DataTypes.STRING,
    nama: DataTypes.STRING,
    harga: DataTypes.DECIMAL(10,2)
  }, {
    sequelize,
    freezeTableName:true,
    timestamps:false,
    modelName: 'm_barang',
  });
  return m_barang;
};