const { Router } = require("express");
const { Comment, User } = require("../models");
const { check, validationResult } = require("express-validator");
// const { lengthChecker } = require("../middleware/lengthChecker");

const commentsRouter = Router();

//GET all comments
commentsRouter.get("/", async (req, res, next) => {
  try {
    // const comments = await Comment.findAll({include: User});
    const comments = await Comment.findAll();
    if (!comments) {
      throw new Error("no comments found");
    }
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

//GET one comment
commentsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    // const comment = await Comment.findOne({ where: { id: id }}, { include: User });
    const comment = await Comment.findOne({ where: { id: id } });
    if (!comment) {
      throw new Error("no comment found");
    }
    res.json(comment);
  } catch (err) {
    next(err);
  }
});

// PUT update comment's text
commentsRouter.put(
  "/:id",
  [check("text").not().isEmpty().withMessage("please edit the comment").trim()],
  async (req, res, next) => {
    const id = req.params.id;
    const editText = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.json({ errors: errors.array() });
      } else {
        // const comment = await Comment.findOne( {where: { id: id }}, { include: User });
        const comment = await Comment.findOne({ where: { id: id } });
        if (editText.length > 50) {
          throw new Error(`Invalid: comment exceeds character limit of 50`);
        }
        // console.log('length: ',editText.text.toString().length)
        if (editText.text.toString().length > 50) {
          res.send("comment must be less than 50 character");
        }
        await comment.update(editText);
        //   }
        res.send(`Comment was edited successfully!
        "${comment.text}"`);
      }
    } catch (error) {
      next(error);
    }
  }
);

// POST adding new comment
commentsRouter.post(
  "/",
  //check express validator
  [check("text").not().isEmpty().trim().isString()],
  async (req, res, next) => {
    const newText = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.isEmpty() });
      // a better error handling??
      // res.send(`comment cannot be empty`);
    } else {
      try {
        if (newText.text.toString().length > 50) {
          res.send("Invalid: comment must be less than 50 character");
        } 
        const newComment = await Comment.create(newText);
        // console.log("this is the added comment ", newComment);
        res.send(`You successfully added a new comment!
      "${newComment.text}"
      `);
      } catch (error) {
        next(error);
      }
    }
  }
);

//DELETE a comment
commentsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findOne({ where: { id: id } });
    if (!comment) {
      throw new Error("Invalid: this comment does not exist");
    } else {
      await comment.destroy();
      res.send(`You successfully deleted a comment!
      "${comment.text}"`);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = commentsRouter;
