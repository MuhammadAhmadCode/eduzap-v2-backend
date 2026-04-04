const taskModel = require("../models/task.model");

async function CreateTask(req, res) {
  const { title, completed } = req.body;

  await taskModel.create({
    title,
    completed,
    user: req.user._id,
  });
  res.status(201).json({
    message: "task Created",
    task: title,
    completed,
  });
}

async function getTasks(req, res) {
  const tasks = await taskModel.find({ user: req.user._id });
  res.status(200).json({ message: "fetched", tasks: tasks });
}

async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await taskModel.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    res.status(200).json({
      message: "Task Deleted successfully!",
      task: task,
    });
  } catch (err) {
    res.json({ message: "error", err });
  }
}

async function updateTask(req, res) {
  const title = req.body.edit;
  const id = req.params.id;
  const task = await taskModel.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { title: title },
  );
  res.status(200).json({ message: "updated successfully!", task: title });
}

async function handleCompleteTak(req, res) {
  const id = req.params.id;
  const completed = req.body.completed;
  await taskModel.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { completed: completed },
  );
  res.status(200).json({ message: "updated successfully!" });
}

module.exports = {
  CreateTask,
  getTasks,
  deleteTask,
  updateTask,
  handleCompleteTak,
};
