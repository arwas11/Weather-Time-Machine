const { db, Model, DataTypes } = require("../db/connection");
const User = require("./User");

class Comment extends Model {}

Comment.init(
  {
    text: { type: DataTypes.STRING(50), allowNull: false },
  },
  {
    sequelize: db,
    modelName: "Comment",
  }
);

module.exports = Comment;
