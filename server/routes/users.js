const { Router } = require("express");
const { User, Comment } = require("../models");
const { check, validationResult } = require("express-validator");

const usersRouter = Router();

// GET /users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users) {
        throw new Error("no users found");
      }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// GET user/:username
usersRouter.get("/:username", async (req, res, next) => {
  username = req.params.username
  try {
    const found = await User.findOne({ where: { username: username } });
    if (!found) {
        throw new Error("no user found");
      }
    res.json(found);
  } catch (err) {
    next(err);
  }
});
//=====
//GET all comments posted by a user (username in req.params)
usersRouter.get("/:username/comments", async (req, res, next) => {
  const username = req.params.username;
  try {
    // const user = await User.findOne({ where: { username: username } }, { include: Comment });
    const user = await User.findOne({ where: { username: username } });
    const userComments = await User.getComments();
    if (!user) {
      throw new Error("no user found");
    } else if (!userComments.length) {
      throw new Error("user did not post a comment");
    }
    res.json(user.comments);
  } catch (err) {
    next(err);
  }
});

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

// POST new user
usersRouter.post(
  "/",
  [
    check("username").not().isEmpty().trim().isString(),
    //validate email?
    check("email").not().isEmpty().trim().isString(),
    check("password").not().isEmpty().isString(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      try {
        const createdUser = await User.create(req.body);
        console.log("this is the added user ", createdUser);
        res.json(createdUser);
      } catch (err) {
        next(err);
      }
    }
  }
);

// PUT update user
usersRouter.put(
  "/:username",
  [
    check("username").not().isEmpty().trim().isString(),
    //validate email?
    check("email").not().isEmpty().trim().isNumeric(),
    check("password").not().isEmpty().isString(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      try {
        await User.update(req.body, {
          where: { username: req.params.username },
        });
        const find = await User.findOne({
          where: { username: req.params.username },
        });
        res.json(find);
      } catch (err) {
        next(err);
      }
    }
  }
);

// DELETE user by ID
usersRouter.delete("/:username", async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.username } });
    const find = await User.findAll();
    res.json(find);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
