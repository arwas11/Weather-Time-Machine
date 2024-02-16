const User = require('./User')
const Comment = require('./Comment')
const Like = require('./Like')
const WeatherData = require('./WeatherData')

//in has many: source has one/many (target). foreign key being defined in the (target) model

// every user has/posts many comments
User.hasMany(Comment,{
  foreignKey: 'username'
})

// every user has/posts many likes
User.hasMany(Like,{
  foreignKey: 'username'
})

// user saves many weather data
User.hasMany(WeatherData,{
  foreignKey: 'username'
})

Comment.hasMany(Like)


// in belongs to: source belongs to (target). foreign key defined in the source model
//  {through: "User_Comments"}, {through: "User_Likes"}
// user creates comments
Comment.belongsTo(User)
// user adds likes to comments
Like.belongsTo(User)
// likes added to comments 
Like.belongsToMany(Comment, {through: "Comments_Likes"})

// WeatherData added to users saved list 
WeatherData.belongsTo(User)

// ------


// every comment can have many likes
// Comment.hasMany(Like, {through: "Comments_Likes"})
// Like.belongsToMany(Comment, {through: "Comments_Likes"})
// user can add many likes
// User.hasMany(Like, {through: "User_Likes"})


// Comment.User = Comment.belongsTo(User);
// User.Comment = User.hasMany(Comment);

// Like.User = Like.belongsTo(User)
// Comment.Like = Comment.hasMany(Like)
// User.Like = 


module.exports = {
  User,
  Comment,
  Like
}
