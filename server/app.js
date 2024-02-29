// load environment variables from .env or elsewhere
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const likesRouter = require("./routes/likes");
const weatherDataRouter = require("./routes/weatherData");

//Allow CORS requests
app.use(cors());
// logging middleware
app.use(morgan("dev"));
// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, "../dist")));

// routers
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);
// app.use("/weatherData", weatherDataRouter);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).send({
//     error: "404 - Not Found",
//     message: "No route found for the requested URL",
//   });
// });

module.exports = app;
