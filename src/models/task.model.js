const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true })


const taskModel = mongoose.model("task", taskSchema)

module.exports = taskModel