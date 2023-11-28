const {Router} = require('express')
const { Comment } = require('../models')
const { check, validationResult } = require("express-validator")
// const { lengthChecker } = require("../middleware/lengthChecker");

const commentsRouter = Router();


//GET all comments
commentsRouter.get("/", async (req, res, next) => {
    try {
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
  commentsRouter.get("/:subject", async (req, res, next) => {
    const subject = req.params.subject;
    try {
      const comment = await Comment.findOne({ where: { subject: subject }});
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
    "/:subject/update-text",
    [
      check("text")
        .not()
        .isEmpty()
        .withMessage("please edit the comment")
        .trim(),
    ],
    async (req, res, next) => {
      const subject = req.params.subject;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({ errors: errors.array() });
        } else {
    const comment = await Comment.findOne( {where: { subject: subject }}, { include: User });
          if (!comment) {
            throw new Error(`no comment found`);
          }
        //   if (!Comment.users.length) {
        //     throw new Error(`comment${Comment.subject}  has not been posted`);
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
  
  // PUT update comment's subject
  commentsRouter.put(
    "/:subject/update-subject",
    [check("subject").not().isEmpty().trim()],
    async (req, res, next) => {
      const subject = req.params.subject;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.json({ errors: errors.array() });
        } else {
          const comment = await Comment.findOne({where: { subject: subject }}, { include: User });
          await Comment.update(req.body);
          res.json(comment);
        }
      } catch (error) {
        next(error);
      }
    }
  );
  
  // POST adding new comment
  commentsRouter.post("/", async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.json(newComment);
    } catch (error) {
      next(error);
    }
  });
  
  //DELETE a comment
  commentsRouter.delete("/:subject", async (req, res, next) => {
    const subject = req.params.subject;
    try {
      const comment = await Comment.findOne({where: { subject: subject }});
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