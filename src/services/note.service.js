const noteModel = require("../models/note.model");

const createNote = async (NoteData, userId) => {
  return await noteModel.create({ ...NoteData, user: userId });
};

const getnotes = async (userId) => {
  return await noteModel.find({ user: userId });
};

const deleteNote = async (NoteId, userId) => {
  return await noteModel.findOneAndDelete({ _id: NoteId, user: userId });
};

const updateNote = async (NoteId, userId, updateNote) => {
  return await noteModel.findOneAndUpdate(
    { _id: NoteId, user: userId },
    updateNote,
  );
};

module.exports = { createNote, getnotes, deleteNote, updateNote };
