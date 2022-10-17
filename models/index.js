const Blog = require('./blog')
const User = require('./user')
const Membership = require('./membership')

User.hasMany(Blog, {as: 'OwnedBlogs'})
Blog.belongsTo(User)

User.hasMany(Membership)
Membership.belongsTo(User)
Blog.hasMany(Membership, {as: 'readinglists'})
Membership.belongsTo(Blog)

Blog.belongsToMany(User, { through: Membership })
User.belongsToMany(Blog, { through: Membership, as: 'readings' })

module.exports = {
  Blog, User, Membership
}