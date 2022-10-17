const router = require('express').Router()

const { User, Blog, Membership } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({ 
    include: {
      model: Blog,
      as: 'OwnedBlogs',
      attributes: { exclude: ['userId'] },
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
  const user = await User.findOne({
    where: { id: req.params.id },
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId'] },
      through: { attributes: [] },
      include: {
        model: Membership,
        as: 'readinglists',
        attributes: ['read','id']
      }
    }
  })
  const readings = await Membership.findAll({where: {userId: user.id}})
  if (user) {
    const userInfo = {...user, readings: readings}
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
