const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../Middlewares/auth.middleware");
const validator = require("../Middlewares/validator");
const router = express.Router();
const handlevalidation = require("../Middlewares/handleValidation");
// auth routes
router.post(
  "/user/register",
  validator.registerValidator,
  handlevalidation,
  authController.registerUser,
);
router.post(
  "/user/login",
  validator.loginValidator,
  handlevalidation,
  authController.loginUser,
);
router.post("/user/logout", authController.logOut);
router.get("/user/me", authMiddleware, authController.me);

module.exports = router;
