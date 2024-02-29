const { db, Model, DataTypes } = require("../db/connection");

class User extends Model {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = User;
