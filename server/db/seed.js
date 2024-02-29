const { db } = require("./db");
const { User, Comment } = require("../models");
const {userData} = require("./usersData");
const {commentData} = require("./commentsData");

const seed = async () => {
  // drop the db
  await db.sync({ force: true });

  // add the data
  await Promise.all(userData.map(user => User.create(user)))
  await Promise.all(commentData.map(comment => Comment.create(comment)))
  // associate some data
    // await Promise.all([
    //   users[0].addComment(commentData[0]),
    //   users[1].addComment(commentData[1]),
    //   users[2].addComment(commentData[2]),
    // ])

  console.log("seed data was populated!");
};

seed();
//export my seed function
module.exports = seed
