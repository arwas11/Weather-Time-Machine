const User = require('./User')
const Comment = require('./Comment')

User.hasMany(Comment)
Comment.hasOne(User)

module.exports = {
  User,
  Comment
}
