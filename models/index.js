const Blog = require('./blog')
const User = require('./user')
const Reading_list = require('./reading_list')
const Membership = require('./membership')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(Reading_list, { through: Membership })
Reading_list.belongsToMany(Blog, { through: Membership })

module.exports = {
  Blog, User, Reading_list, Membership
}