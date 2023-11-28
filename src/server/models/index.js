const User = require('./User')
const Comment = require('./Comment')

User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = {
  User,
  Comment
}
