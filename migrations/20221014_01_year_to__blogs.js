const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
			validate:  {
				validYear(y) {
					if ( y < 1991 || y > new Date().getFullYear() ) {
						throw new Error('Shit year');
					}
				}
			}
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}