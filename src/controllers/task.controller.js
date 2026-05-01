const taskModel = require("../models/task.model");
const taskService = require("../services/task.service");

async function CreateTask(req, res) {
  try {
    const { title, completed, deadline, priority } = req.body;

    const newTask = await taskService.createTask(
      {
        title,
        completed,
        deadline,
        priority,
      },
      req.user._id,
    );
    res.status(201).json({
      message: "task Created",
      task: newTask.title,
      completed: newTask.completed,
      priority: newTask.priority,
      deadline: newTask.deadline || "",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error });
  }
}

async function getTasks(req, res) {
  try {
    const tasks = await taskService.getTasks(req.user._id);
    res.status(200).json({ message: "fetched", tasks: tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to get tasks", error: error });
  }
}

async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    const task = await taskService.deleteTask(id, req.user._id);
    res.status(200).json({
      message: "Task Deleted successfully!",
      task: task.title || "Task not found",
    });
  } catch (err) {
    res.json({ message: "failed to delete task", error: err });
  }
}
async function getlatestTasks(req, res) {
  try {
    const tasks = await taskService.getLatestTasks(req.user._id);
    res.json({ latestTasks: tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get latest tasks", error: error });
  }
}

async function updateTask(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const updatedTitle = req.body.edit;
    const updated = await taskService.updateTask(id, userId, {
      title: updatedTitle,
    });

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "updated successfully!", task: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error });
  }
}

async function handleCompleteTask(req, res) {
  try {
    const id = req.params.id;
    const completed = req.body.completed;
    const updatedTask = taskService.handleCompleteTask(id, req.user._id, {
      completed: completed,
    });
    res.status(200).json({ message: "Updated Success", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to Update", error: error });
  }
}
async function getStats(req, res) {
  try {
    const stats = await taskService.getStats(req.user._id);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get stats", error: error });
  }
}

module.exports = {
  CreateTask,
  getTasks,
  getlatestTasks,
  deleteTask,
  updateTask,
  handleCompleteTask,
  getStats,
};
