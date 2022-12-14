const jwt = require('jsonwebtoken')
const { Session } = require('../models')
const { SECRET } = require('../util/config')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      const activeToken = await Session.findByPk(authorization.substring(7))
      if (!activeToken){
        return res.status(403).json({ error: 'shit token' })
      }
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}
  module.exports = { tokenExtractor }