const { db } = require("./db");
const { User, Comment } = require("../models");
const { userData } = require("./usersData");
const { commentData } = require("./commentsData");

const seed = async () => {
  // drop the db
  await db.sync({ force: true });

  // add the data
  await Promise.all(userData.map((user) => User.create(user)));
  await Promise.all(commentData.map((comment) => Comment.create(comment)));

  console.log("seed data was populated!");
};

seed();
//export my seed function
module.exports = seed;
