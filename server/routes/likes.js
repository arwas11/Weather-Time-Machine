// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const { Router } = require("express");
// const { User, Comment, Like } = require("../models");
// const basicAuth = require("../middleware/basicAuth");
// const userAuth = require("../middleware/userAuth");

// const likesRouter = Router();

// // GET all comments w/ likes
// likesRouter.get("/", userAuth, async (req, res, next) => {
//   try {
//     const comments = await Comment.findAll({ include: Like });
//     if (!comments || comments.length === 0) {
//       return res.status(404).send(`No registered users`);
//     }
//     const mappedComments = comments.map(
//       (comment) => `
//     ${comment.text}
//     posted by: ${comment.user.username}
//     Likes: ${comment.like.likes}
//     `
//     );
//     res.status(200).send(mappedComments);
//   } catch (error) {
//     next(error);
//   }
// });

// // GET all comments w/ user's likes
// likesRouter.get("/", userAuth, async (req, res, next) => {
//   try {
//     const comments = await Comment.findAll({ include: Like });
//     if (!comments || comments.length === 0) {
//       return res.status(404).send(`No registered users`);
//     }
//     res.status(202).send(users);
//   } catch (error) {
//     next(error);
//   }
// });

// // POST new like
// // Only User
// commentsRouter.post(
//   "/:commentId",
//   userAuth,
//   async (req, res, next) => {
//     try{
//     const { id, username } = req.user;

//         //find user to make sure like linked to a user
//         const foundUser = await User.findOne({ where: { username: username } });
//         if (!foundUser.username) {
//           return res
//             .status(404)
//             .json({ error: "Please log in to add a new comment" });
//         }
//         console.log("=== POST like user info", foundUser);

//         const foundComment = await Comment.findOne({where: {id : req.params.commentId}})
//         console.log('=== found this comment', foundComment);

//         const addedLikeToComment = await foundComment.addLike();
//         console.log('=== like added to comment', addedLikeToComment);

//         const commentsAllLikes = await foundUser.getComments();
//         console.log('=== all of the comment likes', foundComment);

//         // console.log("+++this is the created comment ", newComment0);

//         res.status(201).send(`You successfully added a new like to
//         "${newComment0.text}"
//         `);
//       } catch (error) {
//         next(error);
//       }
//     }
// );

// //DELETE a like
// // user adds a comment id OR UI will have a btn with endpoint w/ correct comment id to delete
// //??? Do we need error handling when no req.params.id.length
// commentsRouter.delete("/:id", userAuth, async (req, res, next) => {
//   try {
//     const { id, username } = req.user;
//     const foundUser = await User.findOne(
//       { where: { username: username } },
//       { include: Comment }
//     );
//     // console.log('this is foundUser', foundUser);

//     //Revisit if this code needed
//     // if (!req.params.id) {
//     //   return res.status(400).send(`Error: Missing comment ID to delete`);
//     // }

//     // if (typeof req.params.id !== "number") {
//     //   return res.status(400).send(`Error: Invalid comment ID`);
//     // }

//     const findComment = await foundUser.getComments({
//       where: { id: req.params.id },
//     });
//     console.log("this getComments results", findComment[0].dataValues.text);
//     if (findComment.length === 0 || findComment.length > 1) {
//       return res.status(404).send(`Error: enter valid comment id`);
//     }
//     // console.log("this is user's comments", foundComment);
//     // res.send(foundComment)
//     const commentToDelete = await Comment.findOne({
//       where: { text: findComment[0].dataValues.text },
//     });
//     // console.log("this comment to delete", commentToDelete.text);
//     if (!commentToDelete) {
//       return res.status(404).send(`Error: cannot delete comment`);
//     }
//     await commentToDelete.destroy();
//     res.status(200).send(`You successfully deleted this comment
//       "${commentToDelete.text}"!`);
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = likesRouter;
