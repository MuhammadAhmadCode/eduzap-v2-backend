const express = require("express")
const taskController = require("../controllers/task.controller")
const authMiddleware = require("../Middlewares/auth.middleware")


const router = express.Router()

router.post("/create-task",authMiddleware,taskController.CreateTask)
router.get("/alltasks",authMiddleware,taskController.getTasks)
router.delete("/deltetask/:id",authMiddleware,taskController.deleteTask)
router.patch("/updatetask/:id",authMiddleware,taskController.updateTask)
router.patch("/updateTaskCompleted/:id",authMiddleware,taskController.handleCompleteTak)

module.exports = router