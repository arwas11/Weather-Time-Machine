const { db, Model, DataTypes } = require("../db/db");

class User extends Model {}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user", // Default role is user
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = User;
