const { PrismaClient } = require("@prisma/client");
const cloudinary = require("../utils/cloudinary");
const uploadOnCloudinary = require("../utils/cloudinary");
const prisma = new PrismaClient();

// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedToId } = req.body;
    const createdById = req.user.id;

    let validDueDate = null;
    if (dueDate) {
      validDueDate = new Date(dueDate);
      if (isNaN(validDueDate)) {
        return res.status(400).json({ error: "Invalid due date" });
      }
    }

    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        priority: priority,
        createdBy: {
          connect: {
            id: createdById,
          },
        },
        assignedTo: assignedToId ? {
          connect: {
            id: assignedToId,  // Connect the assigned user if there's an assignedToId
          }
        } : null,
        dueDate: validDueDate || new Date("2025-01-10T21:05:47.926Z"), // Use validDueDate if available
      }
    });
    

    await prisma.activityLog.create({
      data: {
        action: "Task Created",
        taskId: newTask.id,
        performedBy: createdById,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Assign Task to User (Admin Only)
const assignTask = async (req, res) => {
  try {
    const { taskId, assignedToId } = req.body;
    const adminId = req.user.id;

    // Check if the user is an admin
    const adminMembership = await prisma.membership.findFirst({
      where: {
        userId: adminId,
        role: "ADMIN",
        status: "APPROVED",
      },
    });
    if (!adminMembership) {
      return res
        .status(403)
        .json({ error: "Unauthorized - Only admins can assign tasks" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        assignedToId,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "Task Assigned",
        taskId: updatedTask.id,
        performedBy: adminId,
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { createdBy: true, assignedTo: true, files: true, logs: true },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getTasksById = async (req, res) => {
  console.log(req.params);
  
  try {
    const tasks = await prisma.task.findUnique({
      where: { id: Number(req.params.id) },
      include: { createdBy: true, assignedTo: true, files: true, logs: true },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Update Task
const updateTask = async (req, res) => {
  try {
    const { id, title, description, priority, dueDate, assignedToId } =
      req.body;
    const updatedById = req.user.id;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        priority,
        dueDate: new Date(dueDate),
        assignedToId: assignedToId || null,
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "Task Updated",
        taskId: updatedTask.id,
        performedBy: updatedById,
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedById = req.user.id;

    await prisma.task.delete({ where: { id: Number(id) } });

    await prisma.activityLog.create({
      data: {
        action: "Task Deleted",
        taskId: Number(id),
        performedBy: deletedById,
      },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Upload Task File
const uploadTaskFile = async (req, res) => {
  try {
    const { taskId } = req.body;
    const uploadedById = req.user.id;

    let taskFileLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.taskFile) &&
      req.files.taskFile.length > 0
    ) {
      taskFileLocalPath = req.files.taskFile[0].path;
    }

    if (!taskFileLocalPath) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image on Cloudinary and get the URL
    const taskFile = await uploadOnCloudinary(taskFileLocalPath);
    if (!taskFile) {
      return res.status(500).json({ error: "Error uploading file" });
    }

    const file = await prisma.file.create({
      data: {
        filename: req.files.taskFile[0].originalname,
        fileUrl: taskFile.url,
        taskId: Number(taskId),
      },
    });

    await prisma.activityLog.create({
      data: {
        action: "File Uploaded",
        taskId: Number(taskId),
        performedBy: uploadedById,
      },
    });

    res.status(201).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTask,
  assignTask,
  getTasks,
  updateTask,
  deleteTask,
  uploadTaskFile,
  getTasksById
};
