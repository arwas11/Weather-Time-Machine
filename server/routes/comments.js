const { Router } = require("express");
const { Comment, User } = require("../models");
const { check, validationResult } = require("express-validator");
const userAuth = require("../middleware/userAuth");
// const { lengthChecker } = require("../middleware/lengthChecker");

const commentsRouter = Router();

//GET all comments
commentsRouter.get("/", async (req, res, next) => {
  try {
    // const comments = await Comment.findAll({include: User});
    const comments = await Comment.findAll({include: User});
    if (!comments || comments.length === 0) {
      return res.status(201).send(`No one posted a comment Yet!
      --
      Register/Login to be the first to post one!`);
    }
    console.log("these comment w/ users:", comments);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});


//GET user comments
commentsRouter.get("/user-comments", userAuth, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    const foundUser = await User.findOne({ where: { username: username } }, {include: Comment});
    console.log('this is foundUser', foundUser);
    const comments = await foundUser.getComments();
    if (!comments || comments.length === 0) {
      return res.status(201).send(`You have not posted a comment Yet!`);
    }
    // console.log("these comment w/ users:", comments);
    res.status(201).send(comments);
  } catch (error) {
    next(error);
  }
});

// need user as author Auth
//GET user's comments
// commentsRouter.get("/", async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     // const comment = await Comment.findOne({ where: { id: id }}, { include: User });
//     const comment = await Comment.findOne({ where: { id: id } });
//     if (!comment) {
//       throw new Error("no comment found");
//     }
//     res.json(comment);
//   } catch (err) {
//     next(err);
//   }
// });

// need user as  author Auth
// PUT update comment's text
// commentsRouter.put(
//   "/:id",
//   [userAuth, check("text").not().isEmpty().withMessage("please edit the comment").trim()],
//   async (req, res, next) => {
//     const id = req.params.id;
//     const editText = req.body;
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         res.json({ errors: errors.array() });
//       } else {
//         // const comment = await Comment.findOne( {where: { id: id }}, { include: User });
//         const comment = await Comment.findOne({ where: { id: id } });
//         if (editText.length > 50) {
//           throw new Error(`Invalid: comment exceeds character limit of 50`);
//         }
//         // console.log('length: ',editText.text.toString().length)
//         if (editText.text.toString().length > 50) {
//           res.send("comment must be less than 50 character");
//         }
//         await comment.update(editText);
//         //   }
//         res.send(`Comment was edited successfully!
//         "${comment.text}"`);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// POST adding new comment
// Only User
commentsRouter.post(
  "/",
  //check express validator
  [userAuth, check("text").not().isEmpty().trim().isString()],
  async (req, res, next) => {
    const newText = req.body.text;
    const { id, username } = req.user;
    if (!newText) {
      res.status(400).send(`comment cannot be empty`);
    } else {
      try {
        if (newText.toString().length > 50) {
          res
            .status(400)
            .send("Invalid: comment must be less than 50 character");
        }


        //find user to make sure comment linked to a user
        const foundUser = await User.findOne({ where: { username: username } });
        if (!foundUser.username) {
          return res
            .status(404)
            .json({ error: "Please log in to add a new comment" });
        }
        console.log("=== Post comment user info", foundUser);
        
        
        // create & associate comment
        // const newComment = await foundUser.addComment({ text: newText });
        
        const newComment0 = await Comment.create({text: newText});

        const addedCommentToUser = await foundUser.addComment(newComment0)

        const userAllComments = await foundUser.getComments()

        // console.log("+++this is the created comment ", newComment0);

        console.log(
          "+++this is the user all comments'+++++",
          await userAllComments
        );

        res.status(201).send(`You successfully added a new comment!
      "${newComment0.text}"
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
