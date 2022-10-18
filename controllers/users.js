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
  const membershipQueryParameters = 
    typeof req.query.read == 'undefined'
    ? {userId: req.params.id}
    : {userId: req.params.id, read: req.query.read}

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
        attributes: ['read','id'],
        where: membershipQueryParameters
      }
    }
  })
  if (!user) { res.status(404).end() }
    res.json(user)
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
