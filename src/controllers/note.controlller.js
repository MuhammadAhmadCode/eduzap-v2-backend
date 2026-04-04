const noteModel = require("../models/note.model");

async function createNote(req, res) {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json({
    message: "note created successfully!",
    note: note,
  });
}

async function getAllNotes(req, res) {
  const notes = await noteModel.find({ user: req.user._id });
  res.status(200).json({ message: "Notes Fetched", notes: notes });
}

async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const note = await noteModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    res.status(200).json({
      message: "Note Deleted successfully!",
      note,
    });
  } catch (err) {
    console.log(err.message);
    res.json({ message: "error", err });
  }
}

async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    await noteModel.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title: title, description: description },
    );
    res.status(200).json({ message: "updated successfully!" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "ERROR Updating note",
      error: err.message,
    });
  }
}

module.exports = { createNote, getAllNotes, deleteNote, updateNote };
