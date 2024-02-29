require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User, Comment, Like } = require("../models");
const basicAuth = require("../middleware/basicAuth");
const userAuth = require("../middleware/userAuth");

const weatherDataRouter = Router();





module.exports = weatherDataRouter;