const { db, Model, DataTypes } = require("../db/db");
const User = require("./User");
const Comment = require("./Comment");

class Like extends Model {}

Like.init(
  {
  },
  {
    sequelize: db,
    modelName: "Like",
  }
);

module.exports = Like;
