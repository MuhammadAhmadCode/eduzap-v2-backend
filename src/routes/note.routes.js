const express = require("express");
const noteController = require("../controllers/note.controlller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

router.post("/create-note", authMiddleware, noteController.createNote);
router.get("/allnotes", authMiddleware, noteController.getAllNotes);
router.delete("/deletenote/:id", authMiddleware, noteController.deleteNote);
router.patch("/updatenote/:id", authMiddleware, noteController.updateNote);

module.exports = router;
