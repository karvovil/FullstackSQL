const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
  
    const blogStrings = blogs.map(b => 
      `${b.id} ${b.author}: '${b.title}', ${b.likes} likes`
    )
    blogStrings.map(bs => console.log(bs))
    res.json(blogStrings)
  })
  
  //router.use(express.json())
  
  router.post('/', async (req, res) => {
    try{
      console.log(req.body)
      const blog = await Blog.create(req.body)
      return res.json(blog)
    } catch(error) {
      return res.status(400).json({ error })
    }
  })
  router.delete('/:id', async (req, res) => {
    await Blog.destroy({ where: { id: req.params.id } })
    res.status(204).end()
  })
  module.exports = router