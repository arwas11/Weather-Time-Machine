const { db, Model, DataTypes } = require("../db/connection");
// const Comment = require("./Comment");

class User extends Model {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = User;
