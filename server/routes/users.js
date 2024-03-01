require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Router } = require("express");
const { User, Comment } = require("../models");
const { check, validationResult } = require("express-validator");
const basicAuth = require("../middleware/basicAuth");
const userAuth = require("../middleware/userAuth");
const JWT_SECRET = process.env.JWT_SECRET;

const usersRouter = Router();

// GET ALL USERS
// Admin
usersRouter.get("/", userAuth, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    const foundUAdmin = await User.findOne({ where: { username: username } });

    if (foundUAdmin.role === "Admin") {
      const users = await User.findAll({ include: Comment });
      if (!users || users.length === 0) {
        return res.status(200).send(`No registered users`);
      }
      res.status(202).send(users);
    }
    res.status(401).send("Error: Unauthorized");
  } catch (error) {
    next(error);
  }
});

// GET login user
// User
usersRouter.get(
  "/login",
  [
    // check("username").notEmpty().trim().isString(),
    // check("password").not().isEmpty().isString(),
    basicAuth,
  ],
  async (req, res, next) => {
    const { username, password } = req.user;
    try {
      //get user info from db
      const foundUser = await User.findOne({ where: { username: username } });

      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // compare the provided password with the hashed password from the db
      const comparePassword = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!comparePassword) {
        return res.status(401).json({ error: "Incorrect password" });
      } else {
        // USER STORY: The user provides their username and password to authenticate and receives a token in exchange
        //make a payload
        const payload = { id: foundUser.id, username: foundUser.username };

        // sign and encode the payload to create the token
        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

        // don't send back the hashed password
        // res.json({ id: foundUser.id, email: foundUser.email });

        // res.json({accessToken})
        res.status(202).send(`welcome back, ${foundUser.username}!
      TOKEN: ${accessToken}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

// GET login admin
// Admin
usersRouter.get("/admin/login", basicAuth, async (req, res, next) => {
  try {
    const { username, password } = req.user;

    //get admin info from db
    const foundAdmin = await User.findOne({
      where: { username: username },
    });

    if (!foundAdmin) {
      return res.status(404).json({ error: "admin not found" });
    }

    if (foundAdmin.role !== "Admin") {
      res.status(401).send("Error: Unauthorized");
    }

    // compare the provided password with the hashed password from the db
    const comparePassword = await bcrypt.compare(password, foundAdmin.password);

    if (!comparePassword) {
      return res.status(401).json({ error: "Incorrect password" });
    } else {
      // USER STORY: The user provides their username and password to authenticate and receives a token in exchange
      //make a payload
      const payload = { id: foundAdmin.id, username: foundAdmin.username };

      // sign and encode the payload to create the token
      const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      // don't send back the hashed password
      // res.json({ id: foundUser.id, email: foundUser.email });

      // res.json({accessToken})
      res.status(202).send(`welcome back, ${foundAdmin.username}!
      TOKEN: ${accessToken}`);
    }
  } catch (err) {
    next(err);
  }
});

// POST create new user account
// User
usersRouter.post("/register", basicAuth, async (req, res, next) => {
  try {
    // get the user data from basicAuth middleware
    const { username, password } = req.user;
    // hash the password
    const saltRounds = 13;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    res
      .status(201)
      .send(
        `Successfully created new account with username: ${newUser.username}!`
      );
  } catch (err) {
    next(err);
  }
});

// POST create new admin account
// Admin
usersRouter.post(
  "/admin/register",
  [check("role").notEmpty().trim().isString().isLength({ max: 5 }), basicAuth],
  async (req, res, next) => {
    try {
      // get the user data from basicAuth middleware
      const { username, password } = req.user;

      const role = req.body.role;

      if (!role || role !== "Admin") {
        res.status(401).send("Error: Unauthorized");
      }

      // hash the password
      const saltRounds = 13;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const findAdmin = await User.findOne({ where: { username: username } });

      if (findAdmin) {
        res
          .status(401)
          .send("Unauthorized: account with admin username already exists");
      }

      const newAdmin = await User.create({
        username,
        password: hashedPassword,
        role,
      });

      res
        .status(201)
        .send(
          `Successfully created new admin account with username: ${newAdmin.username}!`
        );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = usersRouter;
