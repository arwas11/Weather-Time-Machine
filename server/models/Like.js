const { db, Model, DataTypes } = require("../db/connection");
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
