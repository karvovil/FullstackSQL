const { DataTypes } = require('sequelize')

module.exports = {

  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
			token: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
		})
    await queryInterface.addColumn('sessions', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions')
  },
}