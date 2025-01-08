const express = require("express");
const {
  register,
  login,
  getUserProfile,
  getUsers,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/users", authMiddleware, getUsers);

module.exports = router;
