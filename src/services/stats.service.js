const taskModel = require("../models/task.model");

const getStats = async(userId)=>{
  const tasks = await taskModel.find({user:userId})
  
  const total = await taskModel.findDocumetns(user)
}