const User = require('./User')
const Comment = require('./Comment')

// User
// // (Comment, { through: 'posted' })
// Comment.belongsToMany(User, { through: 'posted' })

module.exports = {
  User,
  Comment,
}
