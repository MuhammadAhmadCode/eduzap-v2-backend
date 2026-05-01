const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

router.post("/create-task", authMiddleware, taskController.CreateTask);
router.get("/alltasks", authMiddleware, taskController.getTasks);
router.get("/latest", authMiddleware, taskController.getlatestTasks);
router.delete("/deltetask/:id", authMiddleware, taskController.deleteTask);
router.patch("/updatetask/:id", authMiddleware, taskController.updateTask);
router.patch(
  "/updateTaskCompleted/:id",
  authMiddleware,
  taskController.handleCompleteTask,
);
router.get("/stats", authMiddleware, taskController.getStats);

module.exports = router;
