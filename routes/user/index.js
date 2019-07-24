const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/verifyToken");
const checkToken = require("../../auth/checkToken");
require("dotenv").config();

// User registration page
router.route("/register-user").post(
  // Array object that contains the express-validator checks
  [
    check("username", "Username must be at least 5 characters").isLength({
      min: 5
    }),
    check(
      "username",
      "Username must be made up of letters and numbers"
    ).isAlphanumeric(),
    check("username").custom((value, { req }) => {
      const checkUsername = req.body.username;
      // Check if username is already in use.
      return User.findOne({ username: checkUsername }).then((res, err) => {
        if (!res) {
          return value;
        } else {
          throw new Error("Username is already in use");
        }
      });
    }),
    check("password", "Password must be at least 5 characters").isLength({
      min: 5
    }),
    check("password").custom((value, { req }) => {
      // Helpful code on StackOverflow for custom check in express-validator!
      if (value !== req.body.password2) {
        // Throw error if passwords do not match
        throw new Error("Passwords must match");
      } else {
        return value;
      }
    }),
    check("email", "Enter a valid email address").isEmail(),
    check("email").custom((value, { req }) => {
      const checkEmail = req.body.email;
      // Check if email is already in use.
      return User.findOne({ email: checkEmail }).then((res, err) => {
        if (!res) {
          return value;
        } else {
          throw new Error("Email is already in use");
        }
      });
    }),
    check("photoURL", "PhotoURL must be a valid URL").isURL()
  ],
  (req, res) => {
    // Custom method that checks the validator errors.
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({ error: errors });
    } else {
      // Object destructuring for DB vars
      const { username, email, password, photoURL } = req.body;
      // BCrypt password hashing
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
          throw err;
        }
        // Create User at DB
        User.create({ username, email, password: hash, photoURL })
          .then(newUser => res.json({ newUser, message: "User created!" }))
          .catch(err => res.status(420).json(err));
      });
    }
  }
);

// User login page
router.route("/login-user").post((req, res) => {
  // Pull username and password out of request using object destructuring.
  const { username, password } = req.body;
  // Initially find user based on username alone.
  User.findOne({ username })
    .then(foundUser => {
      // If no user found, return error.
      if (!foundUser) {
        res.status(422).json({ errorMessage: "No user found" });
      } else {
        // BCrypt compare function compares saved hash to input password.
        bcrypt
          .compare(password, foundUser.password)
          .then(result => {
            if (result === true) {
              // Issue a JWT
              jwt.sign(
                { foundUser },
                process.env.SECRET_KEY,
                { expiresIn: process.env.JWT_LENGTH },
                (err, token) => {
                  res.json({ token, foundUser, redirectURL: "/" });
                }
              );
            } else {
              res.status(422).json({ errorMessage: "Incorrect password" });
            }
          })
          .catch(err => res.json({ err }));
      }
    })
    .catch(err => res.status(422).json(err));
});

// User login page for after registration
router.route("/login-new-user").post((req, res) => {
  // Pull username and password out of request using object destructuring.
  const { username, password } = req.body;
  // Initially find user based on username alone.
  User.findOne({ username, password })
    .then(foundUser => {
      // If no user found, return error.
      if (!foundUser) {
        res.status(422).json({
          errorMessage: "No user found, something went wrong at Registration"
        });
      } else {
        jwt.sign(
          { foundUser },
          process.env.SECRET_KEY,
          { expiresIn: "200s" },
          (err, token) => {
            res.json({ token, foundUser, redirectURL: "/" });
          }
        );
      }
    })
    .catch(err => res.status(422).json(err));
});

// API route for getting username from ID.
router.get("/get-user/:userID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    User.findById(req.params.userID)
      .then(user => {
        console.log(user);
        const { username, photoURL, email } = user;
        res.status(200).send({ username, photoURL, email });
      })
      .catch(err => res.status(422).json(err))
  );
});

module.exports = router;
