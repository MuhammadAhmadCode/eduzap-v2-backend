const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

// auth routes
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post("/user/logout", authController.logOut);
router.get("/user/me", authMiddleware, authController.me);

module.exports = router;
