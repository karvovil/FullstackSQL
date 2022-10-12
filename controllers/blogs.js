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
  
router.post('/', async (req, res, next) => {
  try{
    console.log(req.body)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch(error) {
    next(error)
  }
})
router.delete('/:id', async (req, res) => {
  await Blog.destroy({ where: { id: req.params.id } })
  res.status(204).end()
})
router.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      blog.likes = req.body.likes
      await blog.save()
      res.json(blog)
    } else {
      throw { name:"ShitId", message: "try better id" }
    } 
  } catch (error) {
    next(error)        
  }
})

module.exports = router