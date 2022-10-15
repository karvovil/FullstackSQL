const Blog = require('./blog')
const User = require('./user')
const Membership = require('./membership')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: Membership })
User.belongsToMany(Blog, { through: Membership })

module.exports = {
  Blog, User, Membership
}