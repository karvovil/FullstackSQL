const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_lists', {
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
    })
    await queryInterface.createTable('memberships', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
      },
      reading_list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'reading_lists', key: 'id' },
      },
    })
  },
  down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('memberships')
    await queryInterface.dropTable('reading_lists')
  },
}