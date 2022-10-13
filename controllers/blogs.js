const router = require('express').Router()
const { Blog, User } = require('../models')

const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  console.log(blogs.map(b=>b.user))
  const blogStrings = blogs.map(b => 
    `id: ${b.id} ${b.user ? 'user: '+b.user.name :''} author: ${b.author} titel: '${b.title}', ${b.likes} likes`
  )
  blogStrings.map(bs => console.log(bs))
  res.json(blogStrings)
})
  
router.post('/', tokenExtractor, async (req, res, next) => {
  try{
    console.log(req.body)
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
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