const {Router} = require('express')
const { Comment, User } = require('../models')
const { check, validationResult } = require("express-validator")
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
      const comment = await Comment.findOne({ where: { id: id }});
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
    "/:id/update-text",
    [
      check("text")
        .not()
        .isEmpty()
        .withMessage("please edit the comment")
        .trim(),
    ],
    async (req, res, next) => {
      const id = req.params.id;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({ errors: errors.array() });
        } else {
    // const comment = await Comment.findOne( {where: { id: id }}, { include: User });
    const comment = await Comment.findOne( {where: { id: id }});
          if (!comment) {
            throw new Error(`no comment found`);
          }
        //   if (!Comment.users.length) {
        //     throw new Error(`comment${Comment.id}  has not been posted`);
        //   } else {
        await Comment.update(req.body);
        //   }
          res.json(comment);
        }
      } catch (error) {
        next(error);
      }
    }
  );
  
  // PUT update comment's id
  commentsRouter.put(
    "/:id/update-id",
    [check("id").not().isEmpty().trim()],
    async (req, res, next) => {
      const id = req.params.id;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({ errors: errors.array() });
        } else {
          // const comment = await Comment.findOne({where: { id: id }}, { include: User });
          const comment = await Comment.findOne({where: { id: id }});
          await Comment.update(req.body);
          res.json(comment);
        }
      } catch (error) {
        next(error);
      }
    }
  );
  
  // POST adding new comment
  commentsRouter.post("/", 
  [check("text").not().isEmpty().trim().isString()], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
    try {
      const newComment = await Comment.create(req.body);
      console.log("this is the added comment ", newComment);
      res.json(newComment);
    } catch (error) {
      next(error);
    }
  }
  });
  
  //DELETE a comment
  commentsRouter.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const comment = await Comment.findOne({where: { id: id }});
      if (!comment) {
        throw new Error("comment was deleted");
      }
      await Comment.destroy();
      res.json(comment);
    } catch (err) {
      next(err);
    }
  });

module.exports = commentsRouter;