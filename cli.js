require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  })

const main = async () => {
  try {
    await sequelize.authenticate()

    const blogs = await sequelize.query(
      "SELECT * FROM blogs",
      { type: QueryTypes.SELECT }
    )
    const blogStrings = blogs.map(b => 
      `${b.author}: '${b.title}', ${b.likes} likes`
    )
    blogStrings.map(bs => console.log(bs))
    
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()