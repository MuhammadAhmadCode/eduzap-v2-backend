const { body } = require("express-validator");

// Validation middleware for user registration
const registerValidator = [
  body("fullName").notEmpty().withMessage("Full Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
// Validation middleware for user login
const loginValidator = [
  body("email").isEmail().withMessage("Please Provide a valid Email."),
  body("password").notEmpty().withMessage("Password is required!"),
];

const taskValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("deadline").isDate().withMessage("Deadline must be a valid date"),
  body("completed")
    .isBoolean()
    .withMessage("Completed must be a boolean value"),
  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority value"),
];

const notesValidator = [
  body("title").isEmpty().withMessage(""),
  body("description")
    .isLength({ min: 6 })
    .withMessage("Description must be at least 6 chars long."),
];

module.exports = {
  registerValidator,
  loginValidator,
  taskValidator,
  notesValidator,
};
