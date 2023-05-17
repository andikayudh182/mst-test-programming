'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  m_user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'm_user',
    freezeTableName:true,
    timestamps:false
  });
  return m_user;
};