const router = require('express').Router()

const { User, Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({ 
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('blog')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author' })
  res.json(blogs)
})

module.exports = router
