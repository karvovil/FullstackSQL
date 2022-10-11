require('dotenv').config()
const { Sequelize, Model, QueryTypes, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})
class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
},
  likes: {
    type: DataTypes.INTEGER,
    default: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()

  const blogStrings = blogs.map(b => 
    `${b.id} ${b.author}: '${b.title}', ${b.likes} likes`
  )
  blogStrings.map(bs => console.log(bs))
  res.json(blogStrings)
})

app.use(express.json())

app.post('/api/blogs', async (req, res) => {
  try{
    console.log(req.body)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})
app.delete('/api/blogs/:id', async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } })
  res.status(204).end()
})
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })