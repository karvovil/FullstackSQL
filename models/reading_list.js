const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Reading_list extends Model {}

Reading_list.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reading_list'
})

module.exports = Reading_list