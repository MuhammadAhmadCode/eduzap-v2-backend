const noteService = require("../services/note.service");

async function createNote(req, res) {
  try {
    const { title, description } = req.body;

    const note = await noteService.createNote(
      {
        title,
        description,
      },
      req.user._id,
    );

    res.status(201).json({
      message: "note created successfully!",
      note: note,
    });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
}

async function getAllNotes(req, res) {
  try {
    const notes = await noteService.getnotes(req.user._id);
    res.status(200).json({ message: "Notes Fetched", notes: notes });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err });
  }
}

async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const note = await noteService.deleteNote(id, req.user._id);
    res.status(200).json({
      message: "Note Deleted successfully!",
      note,
    });
  } catch (err) {
    res.json({ message: "error", err });
  }
}

async function updateNote(req, res) {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    await noteService.updateNote(id, req.user._id, {
      title: title,
      description: description,
    });
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
