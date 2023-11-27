const { db } = require("./connection");
const { User, Comment } = require("../models");
const {userData} = require("./usersData");
const {commentData} = require("./commentsData");

const seed = async () => {
  // drop the db
  await db.sync({ force: true });

  // add the data
  //   const users =
  await Promise.all(userData.map(user => User.create(user)))
  //   const comments =
  await Promise.all(commentData.map(comment => Comment.create(comment)))
  // associate some data
  //   await Promise.all([
  //     users[0].addComment(comments[0]),
  //     users[1].addComment(comments[1]),
  //     users[2].addComment(comments[2]),
  //   ])

  console.log("User and Comment database info populated!");
};

//export my seed function
// module.exports = seed
seed();
