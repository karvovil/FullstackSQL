const router = require('express').Router()
const { Blog, User } = require('../models')

const { Op } = require('sequelize')
const {tokenExtractor} = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: User,
        attributes: ['name']
      },
    ],
    where: {
      title: { [Op.substring]: req.query.serch ? req.query.serch : ''},
      author: { [Op.substring]: req.query.serch ? req.query.serch : ''}
    },  
    order:[['likes', 'DESC']]
  })
  res.json(blogs)
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
router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)
  console.log('userid: ', user.id, 'bloguserid :',blog.userId)
  if (user.id === blog.userId){
    await Blog.destroy({ where: { id: req.params.id } })
    res.status(204).end()
  }else{
    res.status(403).end()
  }
  
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