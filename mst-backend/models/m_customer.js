'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_customer.init({
    kode: DataTypes.STRING,
    nama: DataTypes.STRING,
    telp: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName:true,
    timestamps:false,
    modelName: 'm_customer',
  });
  return m_customer;
};