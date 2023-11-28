const {db, Model, DataTypes} = require('../db/connection')
const User = require('./User')


class Comment extends Model {};

Comment.init({
    subject: DataTypes.STRING(10),
    text: DataTypes.STRING,
},{
    sequelize: db,
    modelName: "Comment"
})

// Comment.hasOne(User)

module.exports = Comment
