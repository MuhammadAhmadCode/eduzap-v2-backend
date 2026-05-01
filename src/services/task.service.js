const taskModel = require("../models/task.model");

const createTask = async (taskData, userId) => {
  return await taskModel.create({ ...taskData, user: userId });
};
const getTasks = async (userId) => {
  return await taskModel.find({ user: userId });
};
const getLatestTasks = async (userId) => {
  return taskModel.aggregate([
    { $match: { user: userId } },
    { $sort: { createdAt: -1 } },
    { $limit: 3 },
  ]);
};
const deleteTask = async (taskId, userId) => {
  return await taskModel.findByIdAndDelete({ _id: taskId, user: userId });
};
const updateTask = async (taskId, userId, updateData) => {
  return await taskModel.findByIdAndUpdate(
    { _id: taskId, user: userId },
    { $set: updateData },
  );
};
module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  getLatestTasks,
};
