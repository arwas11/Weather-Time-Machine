const { db, Model, DataTypes } = require("../db/connection");

class Like extends Model {}

Like.init(
  {
    Like: DataTypes.NUMBER,
  },
  {
    sequelize: db,
    modelName: "Like",
  }
);

module.exports = Like;
