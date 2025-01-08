const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  uploadTaskFile,
  getTasksById,
} = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTasksById);

router.put("/update", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    {
      name: "taskFile",
      maxCount: 1,
    },
  ]),
  uploadTaskFile
);

module.exports = router;
