const express = require("express");
const noteController = require("../controllers/note.controlller");
const authMiddleware = require("../Middlewares/auth.middleware");
const validator = require("../Middlewares/validator");
const handlevalidation = require("../Middlewares/handleValidation");
const router = express.Router();

router.post(
  "/create-note",
  authMiddleware,
  validator.notesValidator,
  handlevalidation,
  noteController.createNote,
);
router.get("/allnotes", authMiddleware, noteController.getAllNotes);
router.delete("/deletenote/:id", authMiddleware, noteController.deleteNote);
router.patch(
  "/updatenote/:id",
  authMiddleware,
  validator.notesValidator,
  handlevalidation,
  noteController.updateNote,
);

module.exports = router;
