const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./user");
const tokenRoutes = require("./token");
require("dotenv").config();

// API Routes
router.use("/api/posts", apiRoutes);

// Token Check route
router.use("/check-token", tokenRoutes);

// User Routes
router.use("/users", userRoutes);

// Send React start point if no routes are called.
router.use(function(req, res) {
  if (process.env.ENVIRONMENT === "development") {
    // Dev route
    res.sendFile(path.join(__dirname, "../client/public/index.html"));
  } else if (process.env.ENVIRONMENT === "production") {
    // Build route
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  }
});

module.exports = router;
