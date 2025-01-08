const express = require("express");
const router = express.Router();
const {
  createTask,
  assignTask,
  getTasks,
  updateTask,
  deleteTask,
  uploadTaskFile,
  getTasksById,
} = require("../controllers/taskController");
const {
  adminDashboard,
  userDashboard,
  viewTaskFile,
} = require("../controllers/dashboardController");

// Admin Dashboard Routes
router.get("/admin/dashboard", adminDashboard);

// User Dashboard Routes
router.get("/user/dashboard", userDashboard);
router.get("/user/task/:taskId/files", viewTaskFile);

// Task Management Routes
router.post("/tasks", createTask);
router.post("/tasks/assign", assignTask);
// router.get("/tasks", getTasks);
// router.get("/tasks/:id", getTasksById);

// router.put("/tasks", updateTask);
// router.delete("/tasks/:id", deleteTask);

// Upload Task File
router.post("/tasks/file/upload", uploadTaskFile);

module.exports = router;
