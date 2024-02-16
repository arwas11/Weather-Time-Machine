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
// Admin only
usersRouter.get("/", userAuth, async (req, res, next) => {
  try {
    const users = await User.findAll({include: Comment});
    if (!users || users.length === 0) {
      return res.status(201).send(`No registered users`)
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//LOGIN
// GET user
usersRouter.get("/login", [
  // check("username").notEmpty().trim().isString(),
  // check("password").not().isEmpty().isString(),
  basicAuth,
],async (req, res, next) => {
  const {username, password} = req.user;
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
      const payload = { id: foundUser.id, username: foundUser.username};

      // sign and encode the payload to create the token
      const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});

      // don't send back the hashed password
      // res.json({ id: foundUser.id, email: foundUser.email });

      // res.json({accessToken})
      res.status(202).send(`welcome back, ${foundUser.username}!
      TOKEN: ${accessToken}`);
    }

    res.json(foundUser);
  } catch (err) {
    next(err);
  }
});


// LOGOUT
// delete token to apply
// usersRouter.get("/logout", [
//   // check("username").notEmpty().trim().isString(),
//   // check("password").not().isEmpty().isString(),
//   userAuth,
// ],async (req, res, next) => {
//   const {username, password} = req.user;
//   try {
//         //get user info from db
//     const foundUser = await User.findOne({ where: { username: username } });

//     if (!foundUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // compare the provided password with the hashed password from the db
//     const comparePassword = await bcrypt.compare(
//       password,
//       foundUser.password
//     );

//     if (!comparePassword) {
//       return res.status(401).json({ error: "Incorrect password" });
//     } else {
//        // USER STORY: The user provides their username and password to authenticate and receives a token in exchange
//       //make a payload
//       const payload = { id: foundUser.id, username: foundUser.username};

//       // sign and encode the payload to create the token
//       const accessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});

//       // don't send back the hashed password
//       // res.json({ id: foundUser.id, email: foundUser.email });

//       // res.json({accessToken})
//       res.status(202).send(`welcome back, ${foundUser.username}!
//       TOKEN: ${accessToken}`);
//     }

//     res.json(foundUser);
//   } catch (err) {
//     next(err);
//   }
// });

//=====
//GET all comments posted by a user (username in req.params)
// usersRouter.get("/:username/comments", async (req, res, next) => {
//   const username = req.params.username;
//   try {
//     // const user = await User.findOne({ where: { username: username } }, { include: Comment });
//     const user = await User.findOne({ where: { username: username } });
//     const userComments = await User.getComments();
//     if (!user) {
//       throw new Error("no user found");
//     } else if (!userComments.length) {
//       throw new Error("user did not post a comment");
//     }
//     res.json(user.comments);
//   } catch (err) {
//     next(err);
//   }
// });

// PUT associate a user with a comment they have posted
usersRouter.put("/:username/shows/:commentId", async (req, res, next) => {
  const username = req.params.username;
  const commentId = req.params.commentId;

  try {
    // const comment = await Comment.findOne({ where: { commentId: commentId } }, { include: User });
    // const user = await User.findOne({ where: { username: username } }, { include: Comment });
    const comment = await Comment.findOne({ where: { commentId: commentId } });
    const user = await User.findOne({ where: { username: username } });
    await user.addComment(comment);
    const userComments = await User.getComments();
    res.json(userComments);
  } catch (error) {
    next(error);
  }
});
//=====

// POST create new user account
// OR req.oidc.user
usersRouter.post(
  "/register",
  [
    // check("username").notEmpty().trim().isString(),
    // check("password").not().isEmpty().isString(),
    basicAuth,
  ],
  async (req, res, next) => {
    // const errors = validationResult(req).throw();
    // if (!errors.isEmpty()) {
    //   res.status(401).json({ error: errors.mapped() }); // TRY "Please enter a valid username and password"
    //   next;
    // } else {
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
        console.log("this is the added user ", newUser);
        res.status(201).send(`Successfully created new account with username: ${newUser.username}!`);
      } catch (err) {
        next(err);
      }
    // }
  }
);

// PUT update username
// ADD PASSWORD LATER
usersRouter.put(
  "/:username",
  [
    userAuth,
    // check("username").not().isEmpty().trim().isString(),
    // //validate email?
    // check("email").not().isEmpty().trim().isNumeric(),
    // check("password").not().isEmpty().isString(),
  ],
  async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.json({ error: errors.array() });
    // } else {
    const {username, password} = req.body  
    try {

      //update username
      const foundUser = await User.findOne({ where: { username: username } });
      if (username !== foundUser.username){
        const updatedUser = await User.update(req.body, {
          where: { username: username },
        });
        res.status(201).send(`Succssful username update to ${updatedUser.username} `)
      }

      //update password
      // if (password !== foundUser.password){
      //   await User.update(req.body, {
      //     where: { username: username },
      //   });
      // }

        const find = await User.findOne({
          where: { username: req.params.username },
        });
        res.json(find);
      } catch (err) {
        next(err);
      }
  }
);

// DELETE user by username
//only Admin or User
usersRouter.delete("/:username", basicAuth, async (req, res, next) => {
  try {
    const username = re.params.username;
    const foundUser = await User.findOne({where: {username: username}});
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.destroy({ where: { username: username } });
    res.status(201).send(`Account with username: ${foundUser.username} has been deleted permanently!`)
    } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
