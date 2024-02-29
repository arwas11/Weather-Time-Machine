const { db, Model, DataTypes } = require("../db/db");
const User = require("./User");

class WeatherData extends Model {}

WeatherData.init(
  {
    text: { type: DataTypes.STRING(50) },
  },
  {
    sequelize: db,
    modelName: "WeatherData",
  }
);

module.exports = WeatherData;
