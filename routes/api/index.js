const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const verifyToken = require("../../auth/verifyToken");
const checkToken = require("../../auth/checkToken");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Get all posts for home page
router.get("/", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return all posts
    Post.find({})
      .sort({ submitted_at: -1 })
      .then(posts => res.send(posts))
  );
});

// Create new post
router.post("/", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Create post
    Post.create(req.body)
      .then(newPost => res.json(newPost))
      .catch(err => res.json(err))
  );
});

// Route for getting a particular post
router.get("/:postID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Get post info
    Post.findById(req.params.postID)
      .then(foundPost => res.status(200).send(foundPost))
      .catch(err => res.json(err))
  );
});

// Get all todos by a particular author
router.get("/author/:userID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return posts by author
    Post.find({ author: req.params.userID })
      .sort({ submitted_at: -1 })
      .then(authoredPosts => res.send(authoredPosts))
      .catch(err => res.status(422).json(err))
  );
});

// Update/edit a post
router.put("/update/:postID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return updated posts
    Post.findOneAndUpdate(
      { _id: req.params.postID, author: req.body.user },
      { title: req.body.title, description: req.body.description }
    )
      .then(updatedPost => res.send(updatedPost))
      .catch(err => res.status(422).json(err))
  );
});

// Route for deleing a todo
router.delete("/post/delete/", (config, res) => {
  const authHeader = config.body.headers.Authorization;
  if (typeof authHeader !== "undefined") {
    const authBearer = authHeader.split(" ");
    const bearerToken = authBearer[1];
    // JWT.verify must be done here to account for config/data discrepency in router.delete
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.status(403).json({ message: "Invalid token / No token found" });
      } else {
        // Return deleted todos
        const { id, user } = config.body;
        Post.findOneAndDelete({ _id: id, author: user })
          .then(deletedPost => {
            res.status(200).json({ deletedPost });
          })
          .catch(err => res.status(422).send(err));
      }
    });
  } else {
    res.status(403).json({ message: "No user login found" });
  }
});

module.exports = router;
