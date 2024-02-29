const User = require("./User");
const Comment = require("./Comment");
const Like = require("./Like");
// const WeatherData = require("./WeatherData");

// user creates comments
Comment.belongsTo(User);
// every user has/posts many comments
User.hasMany(Comment);

// user adds likes to comments
Like.belongsTo(Comment);
// every comment/posts has many likes
Comment.hasMany(Like);

// user adds likes to comments
Like.belongsTo(User);
// every user has/posts many likes
User.hasMany(Like);

// // WeatherData added to users saved list
// WeatherData.belongsTo(User)
// // user saves many weather data
// User.hasMany(WeatherData, {
//   foreignKey: 'userId' // Assuming this is the actual foreign key
// })

module.exports = {
  User,
  Comment,
  Like,
};
