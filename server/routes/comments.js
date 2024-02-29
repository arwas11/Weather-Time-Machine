const { Router } = require("express");
const { Comment, User, Like } = require("../models");
const { check, validationResult } = require("express-validator");
const userAuth = require("../middleware/userAuth");
// const { lengthChecker } = require("../middleware/lengthChecker");

const commentsRouter = Router();

//GET all comments
commentsRouter.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"], // Only fetch relevant User data
        },
        {
          model: Like, // Include associated Likes
          attributes: ["id"], // Only fetch Like count efficiently (optional)
        },
      ],
    });

    if (!comments || comments.length === 0) {
      // make status 204 which is for no content??
      res.status(201).send(`No Comments Were Posted Yet`); // No Content (204) for no comments
    }
    //The ?. operator is called the optional chaining operator. It allows you to access a property of an object without having to check if the object is null or undefined first. If the object is null or undefined, the ?. operator will return undefined instead of throwing an error.
    const mappedComments = comments.map((comment) => ({
      username: comment.User.username,
      id: comment.id,
      text: comment.text,
      postedAt: comment.updatedAt,
      likesCount: comment.Likes?.length ?? 0, // Ensure a value
    }));

    res.status(200).send(mappedComments);
  } catch (error) {
    next(error);
  }
});

//GET all user's comments
commentsRouter.get("/my-comments", userAuth, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    const foundUser = await User.findOne(
      { where: { username: username } },
      {
        include: [
          {
            model: Comment,
            attributes: ["text"], // Only fetch relevant User data
          },
          {
            model: Like, // Include associated Likes
            attributes: ["id"], // Only fetch Like count efficiently (optional)
          },
        ],
      }
    );

    if (!foundUser) {
      res.status(404).send("You have not posted any comments.");
    }
    const comments = await foundUser.getComments({
      include: [
        {
          model: User,
          attributes: ["username"], // Only fetch relevant User data
        },
        {
          model: Like, // Include associated Likes
          attributes: ["id"], // Only fetch Like count efficiently (optional)
        },
      ],
    });
    if (!comments || comments.length === 0) {
      return res.status(201).send(`You have not posted comments.`);
    }
    // console.log(foundUser);
    const mappedComments = comments.map((comment) => ({
      id: comment.id,
      text: comment.text,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      likesCount: comment.Likes?.length ?? 0, // Ensure a value
    }));

    res.status(200).send(mappedComments);
  } catch (error) {
    next(error);
  }
});

// POST new comment
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
        console.log("=== POST comment user info", foundUser);

        // create & associate comment
        // const newComment = await foundUser.addComment({ text: newText });

        const newComment0 = await Comment.create({ text: newText });

        const addedCommentToUser = await foundUser.addComment(newComment0);

        const userAllComments = await foundUser.getComments();

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

//PUT a comment
commentsRouter.put("/:id", userAuth, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    const foundUser = await User.findOne(
      { where: { username: username } },
      { include: Comment }
    );

    //Revisit if this code needed
    // if (!req.params.id) {
    //   return res.status(400).send(`Error: Missing comment ID to delete`);
    // }

    // if (typeof req.params.id !== "number") {
    //   return res.status(400).send(`Error: Invalid comment ID`);
    // }

    const findComment = await foundUser.getComments({
      where: { id: req.params.id },
    });

    if (findComment.length === 0 || findComment.length > 1) {
      return res.status(404).send(`Error: enter valid comment id`);
    }
    // console.log("this is found comment", findComment[0].dataValues.text);

    const commentToEdit = await Comment.findOne({
      where: { text: findComment[0].dataValues.text },
    });

    if (!commentToEdit) {
      return res.status(404).send(`Error: cannot edit comment`);
    }

    await commentToEdit.update({ text: req.body.text });

    res.status(200).send(`You successfully edited a comment
      "${commentToEdit.text}"!`);
  } catch (err) {
    next(err);
  }
});

//DELETE a comment & its likes
// user adds a comment id OR UI will have a btn with endpoint w/ correct comment id to delete
//??? Do we need error handling when no req.params.id.length
commentsRouter.delete("/:id", userAuth, async (req, res, next) => {
  try {
    const { id, username } = req.user;
    const commentIdParam = req.params.id;

    // Revisit if this code needed
    if (!commentIdParam) {
      return res.status(400).send(`Error: Missing comment ID to delete`);
    }

    //find and verify the comment that matches the req.param
    const comment = await Comment.findOne(
      { where: { id: commentIdParam } },
      {
        include: [
          {
            model: User,
            attributes: ["username"], // Only fetch relevant User data
          },
          {
            model: Like, // Include associated Likes
            attributes: ["id"], // Only fetch Like count efficiently (optional)
          },
        ],
      }
    );

    if (!comment) {
      return res.status(404).send(`Error: enter valid comment id`);
    }

    //find and verify that the user authored the comment
    const foundUser = await User.findOne(
      { where: { id: comment.UserId } },
      {
        include: {
          model: Comment,
          attributes: ["id"], // Only fetch relevant User data
        },
      }
    );

    if (!foundUser) {
      return res.status(404).send(`Error: enter valid comment id`);
    }
    // console.log('this is foundUser',foundUser);

    // find and verify the comment has a like or not
    const findLike = await Like.findAll({ Where: { CommentId: comment.id } });
    // console.log("this getLikes results", findLike);

    if (findLike.CommentId === comment.id) {
      await findLike.destroy();
    }

    const commentToDelete = await comment.destroy();

    res.status(200).send(`You successfully deleted this comment
    "${commentToDelete.text}"!`);
  } catch (err) {
    next(err);
  }
});

///////////////// LIKES //////////////

// GET comments w/ user's likes
// commentsRouter.get("/my-liked-comments", userAuth, async (req, res, next) => {
//   try {
//     const { id: userId } = req.user; // Get user ID from authorized data

//     const userComments = await Comment.findAll({
//       where: { userId }, // Filter comments by logged-in user's ID
//       include: [
//         {
//           model: Like,
//           attributes: ["userId"], // Include only the userId from Like
//         },
//       ],
//     });

//     res.status(200).json(userComments);
//   } catch (error) {
//     next(error);
//   }
// });

//POST add like
commentsRouter.post(
  "/:CommentId/like",
  userAuth, // Middleware for user authentication
  async (req, res, next) => {
    try {
      const { CommentId } = req.params;
      const { id: UserId } = req.user; // Get user ID from authorized data

      // Find the comment by ID
      const foundComment = await Comment.findByPk(CommentId);
      if (!foundComment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      // console.log('++++++this is found comment to like', foundComment);

      // Check if the user already liked this comment
      const existingLike = await Like.findOne({
        where: { CommentId, UserId },
      });
      console.log("++++++this comment already liked", existingLike);

      if (existingLike) {
        return res.status(400).send("You already liked this comment");
      }

      // Create a new Like associated with the user and comment
      const newLike = await Like.create({ CommentId, UserId });
      console.log("++++++this comment getting liked", newLike);

      // Respond with success message
      res.status(201)
        .send(`You successfully add a like to "${foundComment.text}"!
      `);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE remove a like
commentsRouter.delete("/:id/unlike", userAuth, async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const { id: userId } = req.user;

    // Find the comment by ID
    const foundComment = await Comment.findByPk(commentId);
    if (!foundComment) {
      return res.status(404).json({ error: "Enter valid comment id" });
    }

    // Find the like of the logged-in user for this comment
    const userLike = await Like.findOne({
      where: { CommentId: commentId, UserId: userId },
    });

    if (!userLike) {
      return res
        .status(400)
        .json({ error: "You haven't liked this comment yet" });
    }

    // Destroy the like record
    await userLike.destroy();

    // Respond with success message
    res.status(200).send(`You successfully unliked "${foundComment.text}".`);
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
