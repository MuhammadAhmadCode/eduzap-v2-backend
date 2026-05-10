const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");
const noteRoutes = require("./routes/note.routes");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "https://eduzap-v2.vercel.app",
    credentials: true,
  }),
);

//auth routes
app.use("/api/auth", authRoutes);

//tasks routes
app.use("/api/tasks", taskRoutes);
//notes routes
app.use("/api/notes", noteRoutes);

module.exports = app;
