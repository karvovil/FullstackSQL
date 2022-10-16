const router = require('express').Router()

const { Membership } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const membership = await Membership.create({
        blogId: req.body.blog_id,
        userId: req.body.user_id,
        read: false
    })
    res.json(membership)
  } catch(error) {
    next(error)
  }
})
module.exports = router
