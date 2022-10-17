const router = require('express').Router()

const { Membership } = require('../models')
const {tokenExtractor} = require('../util/middleware')

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
router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const mmship = await Membership.findByPk(req.params.id)
    if (!mmship){
      throw { name: "Shit Membership Id", message: "try better memebership id" }
    }
    console.log(mmship, req.decodedToken)
    if ( mmship.blogId !== req.decodedToken.id){
      res.status(403).end()
    }
    mmship.read = req.body.read
    await mmship.save()
    res.json(mmship)
  } catch(error) {
    next(error)
  }
})
module.exports = router
