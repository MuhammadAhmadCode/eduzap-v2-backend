const taskModel = require("../models/task.model");
const dayjs = require("dayjs");
const createTask = async (taskData, userId) => {
  return await taskModel.create({ ...taskData, user: userId });
};
const getTasks = async (userId, filter) => {
  if (filter === "today") {
    const startOfDay = dayjs().startOf("day").toDate();
    const todayTasks = await taskModel
      .find({ user: userId, createdAt: { $gte: startOfDay } })
      .sort({ createdAt: -1 });
    return todayTasks;
  } else if (filter === "weekly") {
    const lastWeek = dayjs().subtract(7, "day").toDate();
    return await taskModel
      .find({ user: userId, createdAt: { $gte: lastWeek } })
      .sort({ createdAt: -1 });
  }
  return await taskModel.find({ user: userId }).sort({ createdAt: -1 });
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
const handleCompleteTask = async (taskId, userId, completed) => {
  return await taskModel.findOneAndUpdate(
    { _id: taskId, user: userId },
    {
      $set: {
        completed: completed,
        completedAt: completed ? new Date() : null,
      },
    },
  );
};

const getStats = async (userId) => {
  const tasks = await taskModel.find({ user: userId });

  // calculate tasks
  const totalTasks = tasks.length || 0;
  const completedTasks = tasks.filter((t) => t.completed).length || 0;
  const pendingTasks = totalTasks - completedTasks;

  // overdue tasks
  const overdueTasks =
    tasks.filter(
      (t) =>
        !t.completed &&
        t.deadline &&
        dayjs(t.deadline).isBefore(dayjs(), "day"),
    ) || [];

  const priority = {
    high: tasks
      .filter((t) => t.priority === "high")
      .map((t) => ({
        id: t._id,
        priority: t.priority,
        title: t.title,
        completed: t.completed,
      })),
    medium: tasks.filter((t) => t.priority === "medium"),
    low: tasks.filter((t) => t.priority === "low"),
  };

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const score = completionRate - overdueTasks.length * 10;
  const productivityScore = Math.max(0, Math.min(100, score));
  const tasksCreatedToday = tasks
    .filter((t) => t.createdAt && dayjs(t.createdAt).isSame(dayjs(), "day"))
    .map((task) => ({
      id: task._id,
      priority: task.priority,
      title: task.title,
      deadline: task.deadline,
    }));
  const tasksCompletedToday = tasks
    .filter((t) => t.completed && dayjs(t.completedAt()).isSame(dayjs(), "day"))
    .map((task) => ({
      id: task._id,
      priority: task.priority,
      title: task.title,
      deadline: task.deadline,
    }));
  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks: {
      count: overdueTasks.length || 0,
      tasks: overdueTasks,
    },
    completionRate,
    priority,
    productivityScore,
    tasksCreatedToday: {
      count: rawTasksCreatedToday.length || 0,
      tasks: tasksCreatedToday,
    },
    tasksCompletedToday: {
      count: rawtasksCompletedToday.length || 0,
      tasks: tasksCompletedToday,
    },
  };
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  handleCompleteTask,
  updateTask,
  getLatestTasks,
  getStats,
};
