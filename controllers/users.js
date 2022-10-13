const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({ 
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] } 
    } 
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})
router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({where:{username: req.params.username}})
      if (user) {
        user.name = req.body.name
        await user.save()
        res.json(user)
      } else {
        throw { name:"ShitUser", message: "No such user" }
      }
  } catch (error) {
    next(error)
  } 
  })

module.exports = router