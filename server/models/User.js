const {db, Model, DataTypes} = require('../db/connection')
const {Comment} = require('./Comment')

class User extends Model {};

User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
},{
    sequelize: db,
    modelName: "User"
})

// User.hasMany(Comment)
// // User.associate = function(models){
// //     User.belongsToMany(models.User, { through: 'posted' })
// // }


module.exports = User
